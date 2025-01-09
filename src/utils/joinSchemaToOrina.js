import { overlapObjectToOtherObject } from "./overlapObjectToOtherObject";
import { orinaSchema } from "src/model/orina";

export function joinSchemaToOrina(orina) {
  const orinaFisicasOvelap = overlapObjectToOtherObject(
    orina.fisicas,
    orinaSchema.fisicas
  );

  return { ...orina, fisicas: orinaFisicasOvelap };
}
