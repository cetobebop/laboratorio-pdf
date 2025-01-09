export function require({ name }) {
  const msgErr = {
    msg: `Requerido`,
    status: true,
  };
  return function (value) {
    if (!value) return msgErr;
    else if (typeof value === "string") {
      if (!value.trim()) return msgErr;
    }

    return { status: false };
  };
}
