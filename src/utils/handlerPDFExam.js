import { PDFDocument, PageSizes } from "pdf-lib";

export async function createPDFExam() {
  const pdfDoc = await PDFDocument.create();

  return pdfDoc;
}

export function newPage(pdfDoc) {
  return pdfDoc.addPage(PageSizes.Letter);
}
