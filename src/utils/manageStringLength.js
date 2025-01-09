import { cutLimitedWhitespace } from "./cutLimitedWhitespace";
import { cutString } from "./cutString";

export function manageStringLength(string, limit) {
  const strArr = [];
  if (string.length < limit) return string;

  let stringContainer = string;

  while (stringContainer.length > limit) {
    const stringHasWhiteSpace = stringContainer.indexOf(" ");

    const funcHandler =
      stringHasWhiteSpace === -1 ? cutString : cutLimitedWhitespace;

    const chunk = funcHandler(stringContainer, limit);

    strArr.push(chunk);

    stringContainer = stringContainer.slice(chunk.length).trim();
  }
  if (stringContainer) strArr.push(stringContainer);
  return strArr;
}
