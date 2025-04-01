import { jsPDF } from "jspdf";

const generateQCReport = (qcData: Record<string, any> | null | undefined) => {
  if (!qcData) {
    console.error("QC Data is undefined or null");
    return;
  }

  const doc = new jsPDF();

  // Title Styling
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Quality Check Report", 70, 15);
  
  let y = 30;
  doc.setFontSize(12);

  // Draw a border around the content
  doc.setLineWidth(0.5);
  doc.rect(10, 25, 190, 250);

  for (const [key, value] of Object.entries(qcData)) {
    doc.setFont("helvetica", "bold");
    doc.text(`${key}:`, 15, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${value}`, 80, y);
    y += 8;
    
    // Page Break Handling
    if (y > 270) {
      doc.addPage();
      y = 30;
      doc.rect(10, 25, 190, 250);
    }
  }

  doc.save(`QC_Report_${qcData?.serial_no || "Unknown"}.pdf`);
};

export default generateQCReport;