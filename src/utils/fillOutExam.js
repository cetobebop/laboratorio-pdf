import { testUnitsMeasurement } from "src/global/testunitsMeasurement";
import { ajustPropertyToSpecialName } from "./ajustPropertyToSpecialName";

export function fillOutExam(test, rowsNum, fillData) {
  for (let key in test) {
    const value = test[key];
    const keys = Object.keys(value);
    const length = keys.length;
    const arrayGroup = fillData[key];

    if (length < rowsNum) {
      const fillerProperties = arrayGroup.filter((v) => !keys.includes(v));
      for (let i = 0; i < rowsNum - length; i++) {
        const propertyName = ajustPropertyToSpecialName(fillerProperties[i]);
        test[key][propertyName] = {
          value: " ",
          unit: testUnitsMeasurement[fillerProperties[i]] || "%",
        };
      }
    }
  }

  return test;
}
