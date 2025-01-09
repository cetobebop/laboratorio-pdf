const globalSuma = {};
const inputValuesGroup = {};
export function validateAdd(idValidationGroup, idInput) {
  const msgErr = {
    msg: `Suma invalida`,
    status: true,
  };
  return function (value) {
    const numberValue = Number(value);

    if (!inputValuesGroup[idValidationGroup])
      inputValuesGroup[idValidationGroup] = new Map();

    inputValuesGroup[idValidationGroup].set(idInput, numberValue ?? 0);

    if (!globalSuma[idValidationGroup])
      globalSuma[idValidationGroup] =
        inputValuesGroup[idValidationGroup].get(idInput);
    else globalSuma[idValidationGroup] = add(idValidationGroup);

    if (
      globalSuma[idValidationGroup] !== 100 &&
      globalSuma[idValidationGroup] !== 0
    )
      return msgErr;

    return { status: false };
  };
}

function add(idValidationGroup) {
  let suma = 0;
  for (let value of inputValuesGroup[idValidationGroup].values()) {
    suma += value;
  }
  return suma;
}
