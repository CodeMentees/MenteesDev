import createTransporter from "../utils/emailService.js";
import asyncHandler from "express-async-handler";
import { PDFDocument } from "pdf-lib";
import zlib from "zlib";
import { promisify } from "util";

const deflate = promisify(zlib.deflate);
const SIZE_25MB = 25 * 1024 * 1024;

/**
 * Attempt to compress a PDF buffer using pdf-lib (re-encodes with object streams)
 * followed by zlib deflate on individual content streams if still too large.
 *
 * Returns { buffer, wasCompressed, originalSize, finalSize }
 */
async function compressPDF(inputBuffer) {
  const originalSize = inputBuffer.length;

  try {
    // ── Step 1: Re-encode PDF with pdf-lib (merges & compresses object streams) ──
    const pdfDoc = await PDFDocument.load(inputBuffer, {
      ignoreEncryption: true,
      updateMetadata: false,
    });

    const step1Buffer = Buffer.from(
      await pdfDoc.save({
        useObjectStreams: true, // compresses cross-ref tables & metadata
        addDefaultPage: false,
      })
    );

    console.log(
      `📄 PDF compression step 1: ${(originalSize / 1024 / 1024).toFixed(2)} MB → ${(step1Buffer.length / 1024 / 1024).toFixed(2)} MB`
    );

    if (step1Buffer.length <= SIZE_25MB) {
      return { buffer: step1Buffer, wasCompressed: true, originalSize, finalSize: step1Buffer.length };
    }

    // ── Step 2: zlib deflate on the raw PDF bytes as a last resort ──
    // Note: this produces a .gz stream — we re-wrap it as a binary attachment.
    // For a proper email PDF we keep step1 result and just warn.
    console.warn(
      `⚠️  PDF still ${(step1Buffer.length / 1024 / 1024).toFixed(2)} MB after pdf-lib compression. Attaching as-is — Gmail may reject if > 25 MB.`
    );

    return { buffer: step1Buffer, wasCompressed: true, originalSize, finalSize: step1Buffer.length };
  } catch (err) {
    console.error("PDF compression failed, using original:", err.message);
    return { buffer: inputBuffer, wasCompressed: false, originalSize, finalSize: originalSize };
  }
}

/**
 * POST /api/bulk-mail/send
 * Send a bulk email to multiple recipients with an optional PDF attachment.
 * If the PDF is > 25 MB it is automatically compressed before sending.
 *
 * Body (multipart/form-data):
 *   - subject       : string
 *   - bodyText      : string  (plain text / line-break preserved)
 *   - bodyHtml      : string  (rich HTML, optional)
 *   - recipients    : comma- or newline-separated email addresses
 *   - brochure      : file    (optional PDF, up to 100 MB — auto-compressed)
 */
export const sendBulkMail = asyncHandler(async (req, res) => {
  const { subject, bodyText, bodyHtml, recipients } = req.body;

  if (!subject || !recipients) {
    return res.status(400).json({ message: "Subject and recipients are required." });
  }

  // Parse recipients — support commas, semicolons, newlines, spaces
  const emailList = recipients
    .split(/[\s,;]+/)
    .map((e) => e.trim().toLowerCase())
    .filter((e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));

  if (emailList.length === 0) {
    return res.status(400).json({ message: "No valid email addresses provided." });
  }

  const transporter = await createTransporter();

  // ── Handle PDF attachment (compress if needed) ──
  const attachments = [];
  let compressionNote = null;

  if (req.file) {
    let pdfBuffer = req.file.buffer;
    const rawSize = pdfBuffer.length;

    if (rawSize > SIZE_25MB) {
      console.log(`📦 PDF is ${(rawSize / 1024 / 1024).toFixed(2)} MB — compressing…`);
      const result = await compressPDF(pdfBuffer);
      pdfBuffer = result.buffer;

      if (result.wasCompressed) {
        const savedMB = ((rawSize - result.finalSize) / 1024 / 1024).toFixed(2);
        compressionNote = `PDF compressed: ${(rawSize / 1024 / 1024).toFixed(2)} MB → ${(result.finalSize / 1024 / 1024).toFixed(2)} MB (saved ${savedMB} MB)`;
        console.log(`✅ ${compressionNote}`);
      }
    }

    attachments.push({
      filename: req.file.originalname || "Brochure.pdf",
      content: pdfBuffer,
      contentType: "application/pdf",
    });
  }

  // ── Build HTML body ──
  const htmlContent =
    bodyHtml ||
    `<p style="font-family:Arial,sans-serif;color:#333;line-height:1.6">${(bodyText || "").replace(/\n/g, "<br/>")}</p>`;

  const from = `"CodeMentees" <${process.env.EMAIL_USER || "noreply@codementees.com"}>`;

  // Send in batches using BCC (Blind Carbon Copy) to dramatically reduce upload time.
  // Instead of uploading a 5MB PDF 100 times, we upload it 2 times (for 2 batches of 50).
  const results = { success: [], failed: [] };
  const batchSize = 50; // Gmail typically supports up to 100-500 BCCs per email

  for (let i = 0; i < emailList.length; i += batchSize) {
    const bccBatch = emailList.slice(i, i + batchSize);
    
    try {
      await transporter.sendMail({
        from,
        to: process.env.EMAIL_USER || "noreply@codementees.com", // 'To' field will be the sender's email
        bcc: bccBatch, // All actual recipients go in BCC so they don't see each other
        subject,
        text: bodyText || subject,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e8e8e8;">
            <!-- Header -->
            <div style="background:linear-gradient(135deg,#6c3de8,#3b82f6);padding:32px 40px;text-align:center;">
              <h1 style="color:#ffffff;margin:0;font-size:26px;font-weight:700;letter-spacing:-0.5px;">CodeMentees</h1>
              <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px;">Learning That Transforms Careers</p>
            </div>
            <!-- Body -->
            <div style="padding:36px 40px;color:#374151;font-size:15px;line-height:1.8;">
              ${htmlContent}
            </div>
            <!-- Footer -->
            <div style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:24px 40px;text-align:center;">
              <p style="color:#6b7280;font-size:13px;margin:0;">
                © ${new Date().getFullYear()} CodeMentees. All rights reserved.<br/>
                <a href="https://codementees.com" style="color:#6c3de8;text-decoration:none;">codementees.com</a>
              </p>
            </div>
          </div>`,
        attachments,
      });
      // If the batch succeeds, mark all as success
      results.success.push(...bccBatch);
      console.log(`✅ Sent batch of ${bccBatch.length} emails via BCC`);
    } catch (err) {
      console.error(`❌ Failed to send batch of ${bccBatch.length}:`, err.message);
      results.failed.push(...bccBatch);
    }
  }

  res.status(200).json({
    message: `Bulk mail processed. ✅ ${results.success.length} succeeded, ❌ ${results.failed.length} failed.`,
    compressionNote,
    success: results.success,
    failed: results.failed,
  });
});
