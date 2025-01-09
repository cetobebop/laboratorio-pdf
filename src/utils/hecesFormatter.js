import { ajustPositionInPDF } from "./ajustPositionInPDF.js";
import { ajustPositionInPDFComplexNames } from "./ajustPositionInPDFComplexNames.js";

import { joinSchemaToHeces } from "./joinSchemaToHeces.js";

const hecesPosition = {
  aspecto: "left",
  reaccion: "left",
  protozoarios: "left",
  helmintos: "left",
  otros: "left",
  consistencia: "center",
  moco: "center",
  color: "right",
  sangre: "right",
};

export function hecesFormatter(heces) {
  const hecesOverlap = joinSchemaToHeces(heces);
  const macro = ajustPositionInPDF(hecesOverlap.macro, hecesPosition);
  const micro = ajustPositionInPDFComplexNames(
    hecesOverlap.micro,
    hecesPosition
  );

  return { macro, micro };
}
