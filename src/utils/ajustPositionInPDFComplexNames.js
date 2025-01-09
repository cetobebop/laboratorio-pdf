import { removeExtraDataToProperty } from "./removeExtraDataToProperty";

export function ajustPositionInPDFComplexNames(
  test,
  positionObject,
  { autoCenter } = {}
) {
  const testEntries = Object.entries(test);

  const testGroup = {};
  testEntries.forEach(([key, value]) => {
    // if (!positionObject[key]) console.log(key);
    const keyPure = removeExtraDataToProperty(key);

    const pos = positionObject[keyPure];
    testGroup[pos] = testGroup[pos] ?? {};
    testGroup[pos][key] = value;
  });
  if (Object.keys(testGroup).length < 2 && autoCenter) {
    return { center: Object.fromEntries(testEntries) };
  }

  return testGroup;
}
