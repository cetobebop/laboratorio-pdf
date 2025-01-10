export function removeFalsyProperties(obj) {
  return Object.fromEntries(Object.entries(obj).filter((e) => e[1]));
}
