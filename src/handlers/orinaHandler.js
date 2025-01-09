import { orinaFormatter } from "src/utils/orinaFormatter";
import { validateOrinaExist } from "src/validations/validateOrinaExist";
import { addOrinaToPDF } from "src/utils/addOrinaToPDF";

export async function orinaHandler(
  orinaUnformatted,
  pdfDoc,
  page,
  anchors,
  positionY
) {
  const orinaExist = validateOrinaExist(orinaUnformatted);
  if (!orinaExist) return;
  const orinaFormatted = orinaFormatter(orinaUnformatted);
  await addOrinaToPDF(pdfDoc, page, orinaFormatted, anchors, positionY);
}
