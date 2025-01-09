import { removeExtraDataToProperty } from "./removeExtraDataToProperty";

export function joinPropertySameName(object) {
  const copyObject = {};
  const register = {};
  let first = {};
  for (let key in object) {
    const keyPure = removeExtraDataToProperty(key);

    if (!register[keyPure]) {
      register[keyPure] = 1;
      copyObject[keyPure] = object[key];
      first[keyPure] = object[key];
    } else if (register[keyPure] == 1) {
      copyObject[keyPure] = [first[keyPure], object[key]];
      register[keyPure] = register[keyPure] + 1;
    } else copyObject[keyPure].push(object[key]);
  }
  return copyObject;
}
