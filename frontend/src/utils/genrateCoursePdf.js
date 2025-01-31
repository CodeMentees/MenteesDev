import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const generatePdf = (tabs) => {
  const doc = new jsPDF();

  // Set initial Y position
  let yPos = 10;

  // Add a title
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Course Syllabus", 10, yPos);
  yPos += 10;

  // Loop through each tab
  tabs.forEach((tab) => {
    // Add tab label as a heading
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(tab.label, 10, yPos);
    yPos += 10;

    // Prepare data for the table
    const tableData = tab.content.map((item) => [item.title, item.description]);

    // Add a table for the content
    doc.autoTable({
      startY: yPos,
      head: [["Topic", "Description"]],
      body: tableData,
      theme: "striped", // Use a pre-defined theme
      styles: { fontSize: 10 }, // Set font size for table content
      headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255] }, // Custom header styles
      alternateRowStyles: { fillColor: [245, 245, 245] }, // Alternate row colors
    });

    // Update Y position after the table
    yPos = doc.lastAutoTable.finalY + 10;
  });

  // Save the PDF
  doc.save("course_syllabus.pdf");
};

export default generatePdf;