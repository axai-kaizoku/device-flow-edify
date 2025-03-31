import { jsPDF } from "jspdf";

const generateQCReport = (qcData: Record<string, any> | null | undefined) => {
  if (!qcData) {
    console.error("QC Data is undefined or null");
    return;
  }

  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("QC Report", 90, 10);

  let y = 20;
  doc.setFontSize(10);

  for (const [key, value] of Object.entries(qcData)) {
    doc.text(`${key}: ${value}`, 10, y);
    y += 7;
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
  }

  doc.save(`QC_Report_${qcData.serial_no || "Unknown"}.pdf`);
};

export default generateQCReport;
