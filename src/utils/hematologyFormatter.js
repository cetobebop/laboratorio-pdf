import { adjustPropertyOrder } from "./adjustPropertyOrder.js";
import { ajustPositionInPDF } from "./ajustPositionInPDF.js";
import { assingUnits } from "./assingUnitsToTest.js";
import { testUnitsMeasurement } from "src/global/testunitsMeasurement.js";
import { hematologySchema } from "src/model/hematology";
import { fillHematologyData } from "src/data/fillExamData.js";
import { fillObject } from "./fillObject.js";

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
  const hematologyArray = Object.keys(hematology);

  const findIfHematologyHasAtLeastOne = (array) =>
    hematologyArray.some((e) => array.includes(e));

  const countArray = (array) =>
    hematologyArray.filter((e) => array.includes(e)).length;

  if (
    findIfHematologyHasAtLeastOne(fillHematologyData.left) &&
    findIfHematologyHasAtLeastOne(fillHematologyData.right)
  ) {
    const countLeft = countArray(fillHematologyData.left);
    const countRight = countArray(fillHematologyData.right);

    const left = fillObject(
      hematology,
      fillHematologyData.left,
      5 + countRight
    );
    const right = fillObject(
      hematology,
      fillHematologyData.right,
      5 + countLeft
    );

    console.log(right, " right");

    hematology = { ...left, ...right };
    console.log(hematology);
  }

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
