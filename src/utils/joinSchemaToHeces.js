import { overlapObjectToOtherObject } from "./overlapObjectToOtherObject";
import { hecesSchema } from "src/model/heces";

export function joinSchemaToHeces(heces) {
  const hecesMacroOvelap = overlapObjectToOtherObject(
    heces.macro,
    hecesSchema.macro
  );
  const hecesMicroOvelap = overlapObjectToOtherObject(
    heces.micro,
    hecesSchema.micro
  );

  return { macro: hecesMacroOvelap, micro: hecesMicroOvelap };
}
