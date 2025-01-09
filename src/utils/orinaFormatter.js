import { ajustPositionInPDF } from "./ajustPositionInPDF.js";
import { fillOrinaData } from "src/data/fillExamData.js";
import { fillObject } from "./fillObject.js";

import { joinSchemaToOrina } from "./joinSchemaToOrina.js";
import { sortObjectEntriesByKeyLength } from "./sortObjectEntriesByKeyLength.js";
import { distributeObjectPosition } from "./distributeObjectPositions.js";
import { invertObjectOrder } from "./invertObjOrder.js";

const orinaPosition = {
  aspecto: "right",
  color: "left",
  densidad: "right",
  ph: "left",
};
export function orinaFormatter(orina) {
  const orinaOverlap = joinSchemaToOrina(orina);

  const fisicas = ajustPositionInPDF(orinaOverlap.fisicas, orinaPosition);

  const quimicasFill = fillObject(orina.quimicas, fillOrinaData.quimicas, 6);
  const microFill = fillObject(orina.micro, fillOrinaData.micro, 8);

  const quimicasSort = sortObjectEntriesByKeyLength(quimicasFill);
  const microSort = sortObjectEntriesByKeyLength(microFill);
  const quimicasDistributed = distributeObjectPosition(quimicasSort, [
    "right",
    "left",
  ]);

  const microDistributed = distributeObjectPosition(microSort, [
    "right",
    "left",
  ]);

  const invertQuimicasDistributed = invertObjectOrder(quimicasDistributed);

  const invertMicroDistributed = invertObjectOrder(microDistributed);

  return {
    fisicas,
    quimicas: invertQuimicasDistributed,
    micro: invertMicroDistributed,
  };
}
