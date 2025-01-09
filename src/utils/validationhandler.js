export function validationHandler(value, callbackArr) {
  for (let i = 0; i < callbackArr.length; i++) {
    const val = callbackArr[i](value);
    if (val.status) return val;
  }

  return { status: false };
}
