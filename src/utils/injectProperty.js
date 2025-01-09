export function injectProperty(obj, propArr, pos) {
  const entries = Object.entries(obj);

  const result = entries.slice(0, pos).concat([propArr], entries.slice(pos));

  return Object.fromEntries(result);
}
