/**
 * generateCoursePdf — generates a PDF for a course using jsPDF.
 * Only runs on the client side.
 */
export default async function generatePdf(course) {
  if (typeof window === 'undefined') return;
  
  const { default: jsPDF } = await import('jspdf');
  await import('jspdf-autotable');
  
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text(course?.name || 'Course Details', 20, 30);
  
  // Description
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const desc = (course?.description || '').replace(/<[^>]+>/g, '');
  const lines = doc.splitTextToSize(desc, 170);
  doc.text(lines, 20, 50);
  
  doc.save(`${course?.name || 'course'}.pdf`);
}
