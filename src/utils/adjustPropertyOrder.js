export function adjustPropertyOrder(exam, schema) {
  const objectOrdered = {};
  for (let property in schema) {
    if (exam[property]) objectOrdered[property] = exam[property];
  }
  return objectOrdered;
}
