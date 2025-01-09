export function removeExtraDataToProperty(property) {
  const pos = property.indexOf("$");
  if (pos === -1) return property;
  const originalProperty = property.slice(0, pos);
  return originalProperty;
}
