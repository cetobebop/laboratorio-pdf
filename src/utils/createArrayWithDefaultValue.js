export function createArrayWithDefaultValue(length, defaultValue = "") {
  return Array(length).fill(defaultValue);
}
