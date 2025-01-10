import { orinaFormatter } from "src/utils/orinaFormatter";
import { validateOrinaExist } from "src/validations/validateOrinaExist";
import { addOrinaToPDF } from "src/utils/addOrinaToPDF";
import { removeFalsyProperties } from "src/utils/removeFalsyProperties";

export async function orinaHandler(
  orinaUnformatted,
  pdfDoc,
  page,
  anchors,
  positionY
) {
  orinaUnformatted.micro = removeFalsyProperties(orinaUnformatted.micro);
  orinaUnformatted.quimicas = removeFalsyProperties(orinaUnformatted.quimicas);

  const orinaExist = validateOrinaExist(orinaUnformatted);
  if (!orinaExist) return;
  console.log(orinaUnformatted, " orinaUnformatted");
  const orinaFormatted = orinaFormatter(orinaUnformatted);
  await addOrinaToPDF(pdfDoc, page, orinaFormatted, anchors, positionY);
}
