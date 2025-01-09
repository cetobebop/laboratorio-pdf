import { validateExamsExist } from "src/utils/validateExamsExist";

export function validateHecesExist(test) {
  const macroExist = validateExamsExist(test.macro);
  const microExist = validateExamsExist(test.micro);

  return macroExist || microExist;
}
