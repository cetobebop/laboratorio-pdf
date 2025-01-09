import { ajustPositionInPDF } from "./ajustPositionInPDF.js";

const patientPosition = {
  date: "center",
  name: "center",
  nro: "right",
};
export function patientFormatter(patientUnformatted) {
  const ageExist = patientUnformatted?.edad !== undefined;
  const patientConcated = {
    ...patientUnformatted,
    name: `${!patientUnformatted?.name ? "" : patientUnformatted?.name}      ${
      !ageExist ? "" : patientUnformatted?.edad
    } ${!ageExist ? "" : patientUnformatted?.period}`,
  };

  return { patient: patientConcated };
}
