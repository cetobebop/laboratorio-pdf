export function distributeObjectPosition(objectEntries, keys) {
  const length = objectEntries.length;

  const parts = {};
  const latency = keys.length;

  for (let i = 0; i < keys.length; i++) {
    const arr = [];
    for (let j = 0; j < length; j += latency) {
      arr.push(objectEntries[j + i]);
    }
    parts[keys[i]] = Object.fromEntries(arr);
  }

  return parts;
}
// 1 2 1  2  1  2
// 1 2 3  4  5  6  7  8     9     10     11      12
// a a aa aa aa aa aa aaaaa aaaaa aaaaaa aaaaa   aaaaaaaa

// export function distributeObjectPosition(objectEntries, divisor, keys) {
//   const length = objectEntries.length;

//   const itemsForParts = length / divisor;

//   const parts = {};
//   let initial = 0;
//   let actual = itemsForParts;
//   for (let i = 0; i < divisor; i++) {
//     parts[keys[i]] = objectEntries.slice(initial, actual);

//     initial = actual;
//     actual += itemsForParts;
//   }

//   return parts;
// }
