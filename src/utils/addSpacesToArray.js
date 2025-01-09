import { createArrayWithDefaultValue } from "./createArrayWithDefaultValue";

export function addSpacesToArray(arr, spacesNedeed) {
  const spaces = createArrayWithDefaultValue(spacesNedeed - arr.length);

  return arr.concat(spaces);
}
