import React, { useState, useRef } from "react";
import axios from "axios";

// ─── Tag-based multi-email input ─────────────────────────────────────────────
function EmailTagInput({ emails, onChange }) {
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef(null);

  const addEmails = (raw) => {
    const parsed = raw
      .split(/[\s,;]+/)
      .map((e) => e.trim().toLowerCase())
      .filter((e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));
    if (parsed.length) {
      onChange([...new Set([...emails, ...parsed])]);
    }
  };

  const handleKey = (e) => {
    if (["Enter", ",", ";", " ", "Tab"].includes(e.key)) {
      e.preventDefault();
      if (inputVal.trim()) {
        addEmails(inputVal);
        setInputVal("");
      }
    } else if (e.key === "Backspace" && !inputVal && emails.length) {
      onChange(emails.slice(0, -1));
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    addEmails(e.clipboardData.getData("text"));
    setInputVal("");
  };

  const remove = (email) => onChange(emails.filter((e) => e !== email));

  return (
    <div
      className="email-tag-box"
      onClick={() => inputRef.current?.focus()}
    >
      {emails.map((email) => (
        <span key={email} className="email-tag">
          {email}
          <button type="button" onClick={() => remove(email)} className="email-tag-remove">×</button>
        </span>
      ))}
      <input
        ref={inputRef}
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        onKeyDown={handleKey}
        onPaste={handlePaste}
        onBlur={() => { if (inputVal.trim()) { addEmails(inputVal); setInputVal(""); } }}
        placeholder={emails.length === 0 ? "Type email & press Enter, or paste many…" : ""}
        className="email-tag-input"
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BulkMailSender() {
  const [emails, setEmails] = useState([]);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [brochure, setBrochure] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null); // { message, success[], failed[] }
  const [error, setError] = useState(null);
  const fileRef = useRef(null);

  // Bulk-paste textarea helper
  const [bulkPaste, setBulkPaste] = useState("");

  const handleBulkAdd = () => {
    const parsed = bulkPaste
      .split(/[\s,;]+/)
      .map((e) => e.trim().toLowerCase())
      .filter((e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));
    setEmails((prev) => [...new Set([...prev, ...parsed])]);
    setBulkPaste("");
  };

  const handleFileChange = (file) => {
    if (file && file.type === "application/pdf") setBrochure(file);
    else alert("Only PDF files are allowed.");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    setError(null);

    if (emails.length === 0) return setError("Please add at least one recipient email.");
    if (!subject.trim()) return setError("Subject is required.");
    if (!body.trim()) return setError("Email body is required.");

    const formData = new FormData();
    formData.append("recipients", emails.join(","));
    formData.append("subject", subject);
    formData.append("bodyText", body);
    formData.append("bodyHtml", body.replace(/\n/g, "<br/>"));
    if (brochure) formData.append("brochure", brochure);

    try {
      setSending(true);
      const res = await axios.post("/api/bulk-mail/send", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
      // Reset form on full success
      if (res.data.failed?.length === 0) {
        setEmails([]); setSubject(""); setBody(""); setBrochure(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send emails. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <style>{`
        /* ── Page Layout ── */
        .bm-page { min-height:100vh; background:linear-gradient(135deg,#0f0c29,#302b63,#24243e); padding:40px 20px; font-family:'Inter',system-ui,sans-serif; }
        .bm-card { max-width:820px; margin:0 auto; background:rgba(255,255,255,0.05); backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,0.1); border-radius:24px; overflow:hidden; box-shadow:0 25px 60px rgba(0,0,0,0.4); }
        /* ── Header ── */
        .bm-header { background:linear-gradient(135deg,#6c3de8,#3b82f6); padding:32px 40px; }
        .bm-header-title { font-size:26px; font-weight:800; color:#fff; margin:0; letter-spacing:-0.5px; }
        .bm-header-sub { color:rgba(255,255,255,0.8); font-size:14px; margin:6px 0 0; }
        /* ── Body ── */
        .bm-body { padding:36px 40px; }
        /* ── Labels ── */
        .bm-label { display:block; color:#c4b5fd; font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:.8px; margin-bottom:8px; }
        .bm-group { margin-bottom:24px; }
        /* ── Inputs ── */
        .bm-input { width:100%; background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.15); border-radius:12px; padding:12px 16px; color:#f3f4f6; font-size:15px; outline:none; transition:border-color .2s,box-shadow .2s; box-sizing:border-box; }
        .bm-input:focus { border-color:#818cf8; box-shadow:0 0 0 3px rgba(129,140,248,0.2); }
        .bm-input::placeholder { color:#6b7280; }
        textarea.bm-input { resize:vertical; min-height:140px; line-height:1.7; }
        /* ── Email Tag Box ── */
        .email-tag-box { display:flex; flex-wrap:wrap; gap:8px; align-items:center; background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.15); border-radius:12px; padding:10px 14px; cursor:text; min-height:52px; transition:border-color .2s,box-shadow .2s; }
        .email-tag-box:focus-within { border-color:#818cf8; box-shadow:0 0 0 3px rgba(129,140,248,0.2); }
        .email-tag { background:rgba(109,93,236,0.35); border:1px solid rgba(109,93,236,0.5); color:#c4b5fd; font-size:13px; padding:4px 10px; border-radius:999px; display:flex; align-items:center; gap:6px; }
        .email-tag-remove { background:none; border:none; color:#a78bfa; cursor:pointer; font-size:16px; line-height:1; padding:0; }
        .email-tag-remove:hover { color:#f472b6; }
        .email-tag-input { background:none; border:none; outline:none; color:#f3f4f6; font-size:14px; flex:1; min-width:180px; padding:2px 0; }
        .email-tag-input::placeholder { color:#6b7280; }
        /* ── Bulk paste row ── */
        .bm-bulk-row { display:flex; gap:10px; margin-bottom:24px; }
        .bm-bulk-area { flex:1; background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.15); border-radius:12px; padding:10px 14px; color:#f3f4f6; font-size:13px; resize:none; height:72px; outline:none; }
        .bm-bulk-area::placeholder { color:#6b7280; }
        .bm-bulk-btn { background:rgba(109,93,236,0.3); border:1px solid rgba(109,93,236,0.5); color:#c4b5fd; padding:0 18px; border-radius:12px; font-size:13px; font-weight:600; cursor:pointer; transition:background .2s; white-space:nowrap; }
        .bm-bulk-btn:hover { background:rgba(109,93,236,0.55); }
        /* ── PDF Drop Zone ── */
        .bm-dropzone { border:2px dashed rgba(255,255,255,0.15); border-radius:14px; padding:28px 20px; text-align:center; cursor:pointer; transition:border-color .2s,background .2s; }
        .bm-dropzone.drag { border-color:#818cf8; background:rgba(129,140,248,0.1); }
        .bm-dropzone-icon { font-size:36px; margin-bottom:10px; }
        .bm-dropzone-text { color:#9ca3af; font-size:14px; }
        .bm-dropzone-text strong { color:#c4b5fd; }
        .bm-file-name { color:#a78bfa; font-size:14px; margin-top:8px; font-weight:500; }
        .bm-remove-file { background:none; border:none; color:#f87171; font-size:12px; cursor:pointer; margin-left:8px; }
        /* ── Stats row ── */
        .bm-stats { display:flex; gap:12px; margin-bottom:28px; flex-wrap:wrap; }
        .bm-stat { flex:1; min-width:120px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:14px 18px; text-align:center; }
        .bm-stat-num { font-size:28px; font-weight:800; color:#c4b5fd; }
        .bm-stat-label { font-size:12px; color:#9ca3af; margin-top:2px; }
        /* ── Send Button ── */
        .bm-send-btn { width:100%; padding:16px; background:linear-gradient(135deg,#6c3de8,#3b82f6); border:none; border-radius:14px; color:#fff; font-size:16px; font-weight:700; cursor:pointer; letter-spacing:.3px; transition:opacity .2s,transform .2s; display:flex; align-items:center; justify-content:center; gap:10px; }
        .bm-send-btn:hover:not(:disabled) { opacity:.9; transform:translateY(-1px); }
        .bm-send-btn:disabled { opacity:.55; cursor:not-allowed; }
        /* ── Alerts ── */
        .bm-error { background:rgba(239,68,68,0.12); border:1px solid rgba(239,68,68,0.35); color:#fca5a5; border-radius:12px; padding:14px 18px; font-size:14px; margin-bottom:20px; }
        .bm-success { background:rgba(16,185,129,0.12); border:1px solid rgba(16,185,129,0.35); color:#6ee7b7; border-radius:12px; padding:18px 22px; font-size:14px; margin-bottom:20px; }
        .bm-success h4 { margin:0 0 10px; font-size:16px; color:#34d399; }
        .bm-chip-list { display:flex; flex-wrap:wrap; gap:6px; margin-top:8px; }
        .bm-chip { font-size:12px; padding:3px 10px; border-radius:999px; }
        .bm-chip.ok { background:rgba(16,185,129,0.2); color:#6ee7b7; }
        .bm-chip.fail { background:rgba(239,68,68,0.2); color:#fca5a5; }
        /* ── Spinner ── */
        @keyframes spin { to { transform:rotate(360deg); } }
        .spinner { width:20px; height:20px; border:3px solid rgba(255,255,255,.3); border-top-color:#fff; border-radius:50%; animation:spin .7s linear infinite; }
        /* ── Divider ── */
        .bm-divider { border:none; border-top:1px solid rgba(255,255,255,0.08); margin:28px 0; }
      `}</style>

      <div className="bm-page">
        <div className="bm-card">
          {/* Header */}
          <div className="bm-header">
            <h1 className="bm-header-title">✉️ Bulk Email Sender</h1>
            <p className="bm-header-sub">Send personalized emails to multiple recipients from <strong>codementees@gmail.com</strong></p>
          </div>

          <form onSubmit={handleSubmit} className="bm-body">

            {/* ── Result Alert ── */}
            {result && (
              <div className="bm-success">
                <h4>📬 {result.message}</h4>
                {result.success?.length > 0 && (
                  <>
                    <div style={{ color:"#86efac", fontSize:12, marginBottom:4 }}>Delivered to:</div>
                    <div className="bm-chip-list">
                      {result.success.map(e => <span key={e} className="bm-chip ok">{e}</span>)}
                    </div>
                  </>
                )}
                {result.failed?.length > 0 && (
                  <>
                    <div style={{ color:"#fca5a5", fontSize:12, marginTop:10, marginBottom:4 }}>Failed:</div>
                    <div className="bm-chip-list">
                      {result.failed.map(e => <span key={e} className="bm-chip fail">{e}</span>)}
                    </div>
                  </>
                )}
              </div>
            )}

            {error && <div className="bm-error">⚠️ {error}</div>}

            {/* ── Recipient Stats ── */}
            <div className="bm-stats">
              <div className="bm-stat">
                <div className="bm-stat-num">{emails.length}</div>
                <div className="bm-stat-label">Recipients Added</div>
              </div>
              <div className="bm-stat">
                <div className="bm-stat-num">{brochure ? "1" : "0"}</div>
                <div className="bm-stat-label">PDF Attached</div>
              </div>
            </div>

            {/* ── Tag Input ── */}
            <div className="bm-group">
              <label className="bm-label">Recipients</label>
              <EmailTagInput emails={emails} onChange={setEmails} />
              <div style={{ color:"#6b7280", fontSize:12, marginTop:6 }}>
                Press <kbd style={{background:"rgba(255,255,255,0.1)",padding:"1px 5px",borderRadius:4}}>Enter</kbd>, <kbd style={{background:"rgba(255,255,255,0.1)",padding:"1px 5px",borderRadius:4}}>,</kbd> or <kbd style={{background:"rgba(255,255,255,0.1)",padding:"1px 5px",borderRadius:4}}>Space</kbd> after each email · Or paste a list below
              </div>
            </div>

            {/* ── Bulk Paste ── */}
            <div className="bm-bulk-row">
              <textarea
                className="bm-bulk-area"
                placeholder="Paste many emails at once (comma / newline / space separated)…"
                value={bulkPaste}
                onChange={(e) => setBulkPaste(e.target.value)}
              />
              <button type="button" className="bm-bulk-btn" onClick={handleBulkAdd}>
                + Add All
              </button>
            </div>

            <hr className="bm-divider" />

            {/* ── Subject ── */}
            <div className="bm-group">
              <label className="bm-label">Subject</label>
              <input
                id="bm-subject"
                className="bm-input"
                placeholder="e.g. Exciting Summer Internship Opportunity at CodeMentees 🚀"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            {/* ── Body ── */}
            <div className="bm-group">
              <label className="bm-label">Email Body</label>
              <textarea
                id="bm-body"
                className="bm-input"
                placeholder={"Dear Student,\n\nWe are excited to announce our Summer Internship Program…"}
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
              <div style={{ color:"#6b7280", fontSize:12, marginTop:6 }}>
                Line breaks are preserved in the email.
              </div>
            </div>

            {/* ── PDF Attachment ── */}
            <div className="bm-group">
              <label className="bm-label">Attach Brochure (PDF · optional · up to 100 MB, auto-compressed to ≤25 MB)</label>
              <div
                id="bm-dropzone"
                className={`bm-dropzone${dragOver ? " drag" : ""}`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
              >
                <div className="bm-dropzone-icon">📎</div>
                {brochure ? (
                  <>
                    <div className="bm-file-name">📄 {brochure.name} ({(brochure.size / 1024).toFixed(1)} KB)</div>
                    <button
                      type="button"
                      className="bm-remove-file"
                      onClick={(e) => { e.stopPropagation(); setBrochure(null); }}
                    >
                      ✕ Remove
                    </button>
                  </>
                ) : (
                  <p className="bm-dropzone-text">
                    <strong>Drag & drop</strong> a PDF here, or <strong>click to browse</strong>
                    <br /><span style={{ fontSize:12, marginTop:4, display:"block" }}>Max 25 MB</span>
                  </p>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="application/pdf"
                style={{ display:"none" }}
                onChange={(e) => handleFileChange(e.target.files[0])}
              />
            </div>

            {/* ── Send Button ── */}
            <button id="bm-send-btn" className="bm-send-btn" type="submit" disabled={sending}>
              {sending ? (
                <><div className="spinner" /> Sending to {emails.length} recipient{emails.length !== 1 ? "s" : ""}…</>
              ) : (
                <>🚀 Send Bulk Email to {emails.length} Recipient{emails.length !== 1 ? "s" : ""}</>
              )}
            </button>

          </form>
        </div>
      </div>
    </>
  );
}
