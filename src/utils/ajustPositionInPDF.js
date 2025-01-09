export function ajustPositionInPDF(test, positionObject, { autoCenter } = {}) {
  const testEntries = Object.entries(test);

  const testGroup = {};
  testEntries.forEach(([key, value]) => {
    const pos = positionObject[key];
    testGroup[pos] = testGroup[pos] ?? {};
    testGroup[pos][key] = value;
  });

  if (Object.keys(testGroup).length < 2 && autoCenter) {
    return { center: test };
  }

  return testGroup;
}
