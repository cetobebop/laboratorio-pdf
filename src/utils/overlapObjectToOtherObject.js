export function overlapObjectToOtherObject(objectSecundary, objectOverlap) {
  for (let property in objectSecundary) {
    objectOverlap[property] = objectSecundary[property];
  }
  return objectOverlap;
}
