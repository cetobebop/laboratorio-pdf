export function findLimitedWhitespace(str, limit, cache = "") {
  const index = str.indexOf(" ");

  if (index === -1) return str;
  if (index > limit - 1) return cache;

  const currentSlice = str.slice(0, index);
  const updatedCache = cache ? cache + " " + currentSlice : currentSlice;

  return findLimitedWhitespace(
    str.slice(index + 1),
    limit - currentSlice.length,
    updatedCache
  );
}
