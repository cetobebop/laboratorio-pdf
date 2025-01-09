import moment from "moment";

export function requireDate({ name }) {
  const msgErr = {
    msg: `${name} requerido`,
    status: true,
  };
  return function (value) {
    if (!value) return msgErr;
    else if (typeof value === "date") {
      const validationDate = moment(value).isValid();
      console.log(validationDate, " validation date");
      if (validationDate) return msgErr;
    }

    return { status: false };
  };
}
