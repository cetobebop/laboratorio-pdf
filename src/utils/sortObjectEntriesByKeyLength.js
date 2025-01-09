export function sortObjectEntriesByKeyLength(object) {
  const objectEntries = Object.entries(object);

  return objectEntries.toSorted((a, b) => a[0].length - b[0].length);
}
