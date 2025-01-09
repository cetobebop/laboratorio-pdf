import { validateExamsExist } from "src/utils/validateExamsExist";
import { patientFormatter } from "src/utils/patientFormatter";
import { addPatientToPDF } from "src/utils/addPatientToPDF";

export async function patientHandler(
  patientUnformatted,
  pdfDoc,
  page,
  anchors,
  positionY
) {
  const patientExist = validateExamsExist(patientUnformatted);
  if (!patientExist) return;
  const patientFormatted = patientFormatter(patientUnformatted);
  await addPatientToPDF(pdfDoc, page, patientFormatted, anchors, positionY);
}
