import { addHematologyToPDF } from "src/utils/addHematologyToPDF";
import { hematologyFormatter } from "src/utils/hematologyFormatter";
import { removeFalsyProperties } from "src/utils/removeFalsyProperties";
import { validateExamsExist } from "src/utils/validateExamsExist";

export async function hematologyHandler(
  hematologyUnformatted,
  pdfDoc,
  page,
  anchors,
  positionY
) {
  const hematology = removeFalsyProperties(hematologyUnformatted);
  const hematologyExist = validateExamsExist(hematology);
  if (!hematologyExist) return;
  const hematologyFormatted = hematologyFormatter(hematology);
  await addHematologyToPDF(
    pdfDoc,
    page,
    hematologyFormatted,
    anchors,
    positionY
  );
}
