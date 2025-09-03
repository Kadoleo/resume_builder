// Simple wrapper to export a DOM node to PDF using html2pdf.js
// Options tuned for A4 with reasonable margins
export async function exportNodeToPdf(node: HTMLElement, filename = "resume.pdf") {
  const html2pdf = (await import("html2pdf.js")).default;
  const opt = {
    margin: [10, 10, 10, 10],
    filename,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    pagebreak: { mode: ["css", "legacy"] },
  } as const;

  await html2pdf().set(opt).from(node).save();
}


