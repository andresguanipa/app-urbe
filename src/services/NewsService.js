import * as until from "../../utils";
const apiURL = "https://cloud.urbe.edu/campus/api";

export const getLatestNews = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  try {
    let news = [];
    const response = await fetch(
      `${apiURL}/noticias/mostRecent`,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        news = response;
      })
      .catch((error) => {
        //alert(error);
      });
    return news;
  } catch (error) {
    //alert(error);
  }
};

export const getLatestEvents = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  try {
    let events = [];
    const response = await fetch(
      `${apiURL}/eventos/?limit=15&offset=0`,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        response.map((event) => {
          const newEvento = {
            idEvento: event.idEvento,
            titulo: event.titulo,
            fechaFin: until.reverseDate(event.fechaFin),
            horaFin: until.formatHour(event.horaFin),
            horaInicio: until.formatHour(event.horaInicio),
            dia: until.getDayStringByDayNumber(event.dia),
          };
          events = [...events, newEvento];
        });
      })
      .catch((error) => {
        //alert(error);
      });
    return events;
  } catch (error) {
    //alert(error);
  }
};
