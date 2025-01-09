import { hecesFormatter } from "src/utils/hecesFormatter";
import { addHecesToPDF } from "src/utils/addHecesToPDF";
import { validateHecesExist } from "src/validations/validateHecesExist";

export async function hecesHandler(
  hecesUnformatted,
  pdfDoc,
  page,
  anchors,
  positionY
) {
  const hecesExist = validateHecesExist(hecesUnformatted);
  if (!hecesExist) return;
  const hecesFormatted = hecesFormatter(hecesUnformatted);
  await addHecesToPDF(pdfDoc, page, hecesFormatted, anchors, positionY);
}
