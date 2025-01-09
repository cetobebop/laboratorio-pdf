export function invertObjectOrder(obj) {
  return Object.fromEntries(Object.entries(obj).toReversed());
}
