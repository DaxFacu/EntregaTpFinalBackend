import { format, isBefore, sub } from "date-fns";

const date = new Date();

const dateFormat = format(date, "dd/MM/yyyy HH:mm:ss");

const dateAnt = sub(date, { days: 2 });

const dateAntFormat = format(dateAnt, "dd/MM/yyyy HH:mm:ss");

function isAnt(dateUser) {
  const dateAnt = isBefore(dateUser, dateAntFormat);
  return dateAnt;
}

function getDate() {
  const date = new Date();
  const dateFormat = format(date, "dd/MM/yyyy HH:mm:ss");
  return dateFormat;
}

export default { getDate, dateAntFormat, isAnt };
