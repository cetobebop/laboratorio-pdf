import { addHematologyToPDF } from "src/utils/addHematologyToPDF";
import { hematologyFormatter } from "src/utils/hematologyFormatter";
import { validateExamsExist } from "src/utils/validateExamsExist";

export async function hematologyHandler(
  hematologyUnformatted,
  pdfDoc,
  page,
  anchors,
  positionY
) {
  const hematologyExist = validateExamsExist(hematologyUnformatted);
  if (!hematologyExist) return;
  const hematologyFormatted = hematologyFormatter(hematologyUnformatted);
  await addHematologyToPDF(
    pdfDoc,
    page,
    hematologyFormatted,
    anchors,
    positionY
  );
}
