import { validateExamsExist } from "src/utils/validateExamsExist";

export function validateOrinaExist(test) {
  const fisicasExist = validateExamsExist(test.fisicas);
  const quimicasExist = validateExamsExist(test.quimicas);
  const microExist = validateExamsExist(test.micro);

  return fisicasExist || quimicasExist || microExist;
}
