import { adjustPropertyOrder } from "./adjustPropertyOrder.js";
import { ajustPositionInPDF } from "./ajustPositionInPDF.js";
import { assingUnits } from "./assingUnitsToTest.js";
import { testUnitsMeasurement } from "src/global/testunitsMeasurement.js";
import { hematologySchema } from "src/model/hematology";

const hematologyPosition = {
  hemoglobina: "left",
  hematocrito: "left",
  chcm: "left",
  leucocitos: "left",
  plaquetas: "left",
  neutrofilos: "right",
  linfocitos: "right",
  eosinofilos: "right",
  monocitos: "right",
  cayado: "right",
  blastos: "right",
};
export function hematologyFormatter(hematology) {
  const hematologyOrdered = adjustPropertyOrder(hematology, hematologySchema);

  const HematologyUnitsAssigned = assingUnits(
    hematologyOrdered,
    testUnitsMeasurement
  );
  const hematologyFormatted = ajustPositionInPDF(
    HematologyUnitsAssigned,
    hematologyPosition,
    { autoCenter: true }
  );
  return hematologyFormatted;
}
