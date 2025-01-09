export function assingUnits(test, unitList) {
  const testEntries = Object.entries(test);
  const testWithUnits = {};

  for (let [key, value] of testEntries) {
    if (key in unitList) testWithUnits[key] = { value, unit: unitList[key] };
    else testWithUnits[key] = { value, unit: "%" };
  }

  return testWithUnits;
}
