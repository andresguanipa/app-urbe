import { Alert, Linking } from "react-native";
//Static info
const abbreviatedMonthList = [
  "ENE",
  "FEB",
  "MAR",
  "ABR",
  "MAY",
  "JUN",
  "JUL",
  "AGO",
  "SEP",
  "OCT",
  "NOV",
  "DIC",
];

const dayList = [
  "LUNES",
  "MARTES",
  "MIÉRCOLES",
  "JUEVES",
  "VIERNES",
  "SÁBADO",
  "DOMINGO",
];

//Functions

//returns the day name by day number
export const getDayStringByDayNumber = (dayNumber) => {
  if (Number(dayNumber) > 7 || isNaN(Number(dayNumber)))
    throw "Invalid day number";
  const dayIndex = Number(dayNumber) - 1;
  return dayList[dayIndex];
};

//returns th getAbbreviated month by the month number
export const getAbbreviatedMonthByMonthNumber = (month) => {
  const monthNumber = Number(month);
  if (monthNumber > 12 || monthNumber < 1) throw "Invalid month";
  return abbreviatedMonthList[monthNumber - 1];
};

//returns the hour formatted. example: in >> '13:00:00', out >> '1:00 PM'
export const formatHour = (hour) => {
  const hourArray = hour.split(":");
  const hourNumber = Number(hourArray[0]);
  let formattedHour = "";
  hourNumber > 11
    ? (formattedHour = `${hourNumber - 12}:${hourArray[1]} PM`)
    : (formattedHour = `${hourNumber}:${hourArray[1]} AM`);
  hourNumber == 12
    ? (formattedHour = `${hourNumber}:${hourArray[1]} PM`)
    : null;
  return formattedHour;
};

//returns the date reversed
export const reverseDate = (date) => {
  if (!date.includes("-"))
    throw 'Invalid date format. Must be separated by "-"';
  return date.split("-").reverse().join("-");
};

export const getDay = (fullDate) => {
  const dateArray = fullDate.split("-");
  return dateArray[0];
};

export const getAbbreviatedMonth = (fullDate) => {
  const dateArray = fullDate.split("-");
  return getAbbreviatedMonthByMonthNumber(dateArray[1]);
};

//Shows an alert to confirm if you want to exit the application
export const confirmExit = (url) => {
  return Alert.alert("¿Desea salir de la aplicación?", "", [
    { text: "Cancelar" },
    { text: "Aceptar", onPress: () => Linking.openURL(url) },
  ]);
};
