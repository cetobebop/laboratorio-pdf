import { newPage } from "./handlerPDFExam";

export function changePDFPage(positionY, anchorY, pdfDoc, limit, page) {
  if (positionY.value > limit) return;

  positionY.value = anchorY;

  page.value = newPage(pdfDoc);
}
