import { excludeValues } from "./excludeValues";

export function fillObject(object, filldata, max) {
  const objectCopy = JSON.parse(JSON.stringify(object));

  const keys = Object.keys(objectCopy);

  const validFillData = excludeValues(filldata, keys);

  let l = keys.length;

  for (let i = 0; l < max; i++) {
    objectCopy[validFillData[i]] = " ";

    l++;
  }

  return objectCopy;
}
