const wordsInUppercase = ["CHCM"];

function formatString(string) {
  const stringInUpperCase = string.toUpperCase();
  if (!wordsInUppercase[stringInUpperCase]) return capitalizeString(string);
  else stringInUpperCase;
}
