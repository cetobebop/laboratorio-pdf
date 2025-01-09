import { cutString } from "./cutString";

export function cutLimitedWhitespace(str, limit, cache = "") {
  const index = str.indexOf(" ");
  const strLength = str.length;

  if (strLength <= limit && !cache) return str.trim();

  if (index > limit - 1 && cache) return cache.trim();

  if (index > limit - 1 || (index == -1 && strLength >= limit - 1 && !cache))
    return cutString(str, limit);

  if (index === -1 && !cache) return str.trim();

  if (index === -1 && cache) return cache.trim();

  const currentSlice = str.slice(0, index);

  const updatedCache = cache ? cache + " " + currentSlice : currentSlice;
  const sum = !cache ? 0 : 1;

  return cutLimitedWhitespace(
    str.slice(index + 1),
    limit - currentSlice.length - sum,
    updatedCache
  );
}
