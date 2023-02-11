//IMPORTS
//asyncStorage
import { getData, storeData, storePhoto } from "../asyncStorage/AsyncStorage";

//Direcciones de las APIs
const apiURL = "https://cloud.urbe.edu/web/v1/core";
const loginURL = "https://api.urbe.edu/v1/login/web/init";

//CONSULTAS

//Chequeando si el alumno está inscrito
export const hasActiveInscription = async () => {
  const authToken = await getData();
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: ` ${authToken}`,
    },
  };
  try {
    let activeInscription = false;
    const response = await fetch(`${apiURL}/inscription`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        response.map((element) => {
          if (
            element.estadoEstudio == "ACTIVO" &&
            element.idTipoEstudio.idTipoEstudio != 3
          ) {
            activeInscription = true;
          }
        });
      })
      .catch((error) => {
        //console.log(error);
      });
    return activeInscription;
  } catch (error) {
    //console.log(error);
    alert("Ocurrió un problema de conexión con el servidor");
  }
};

//Login
export const loginService = async (username, password) => {
  let authKey;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      usuario: username,
      clave: password,
    }),
  };
  try {
    const response = await fetch(loginURL, requestOptions);
    if (response.status === 200) {
      authKey = response.headers.get("authorization");
      storeData(authKey);
      return 200;
    } else if (response.status === 403) {
      return 403;
    } else {
      return 404;
    }
  } catch (error) {
    //console.log("Error de conexión");
  }
};

export const loginDevelopment = async (username, password) => {
  let authKey = "";
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      usuario: username,
      clave: password,
    }),
  };
  try {
    const response = await fetch(
      "http://10.200.14.5:8082/v1/login/web/init",
      requestOptions
    );
    if (response.status === 200) {
      authKey = response.headers.get("authorization");
    }
  } catch (error) {
    //console.log("Error de conexión");
  }
  return authKey;
};

export const getTokenStatus = async () => {
  const authToken = await getData();
  //const authToken = token;
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: ` ${authToken}`,
    },
  };
  try {
    let status;
    const response = await fetch(`${apiURL}/schedule`, requestOptions).then(
      (response) => {
        status = response.status;
        //console.log(status);
      }
    );
    return status;
  } catch (error) {
    //console.log(error);
    //alert(error);
  }
};

export const getAllDegrees = async () => {
  const authToken = await getData();
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: ` ${authToken}`,
    },
  };
  try {
    let degree = [{}];
    degree.pop();
    const response = await fetch(`${apiURL}/inscription`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        //console.log(response);
        response.forEach((carrera) => {
          degree.push({
            label: carrera.idEstudio.estudio,
            value: carrera.idEstudio.idEstudio,
          });
        });
      })
      .catch((error) => {
        //console.log(error);
      });
    //console.log(degree);
    return degree;
  } catch (error) {
    //console.log(error);
    //alert(error);
  }
};

export const getDegree = async () => {
  const authToken = await getData();
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: ` ${authToken}`,
    },
  };
  try {
    let degree;
    const response = await fetch(`${apiURL}/inscription`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        response.forEach((carrera) => {
          if (carrera.idTipoEstudio.idTipoEstudio == 1) {
            degree = carrera.idEstudio.estudio;
          } else if (carrera.idTipoEstudio.idTipoEstudio == 2) {
            degree = carrera.idEstudio.estudio;
          }
        });
      })
      .catch((error) => {
        //console.log(error);
      });
    return degree;
  } catch (error) {
    //console.log(error);
    //alert(error);
  }
};

//Consulta que retorna el nombre, el apellido y la foto del estudiante
export const getProfilePhoto = async () => {
  const authToken = await getData();
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: ` ${authToken}`,
    },
  };
  try {
    const response = await fetch(`${apiURL}/curriculum`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        storePhoto(response.fotografia);
      })
      .catch((error) => {
        //console.log(error);
      });
  } catch (error) {
    //console.log(error);
  }
};

//Obteniendo el ID de la inscripción
export const getInscriptionId = async () => {
  const authToken = await getData();
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: ` ${authToken}`,
    },
  };
  try {
    let inscriptionId;
    const response = await fetch(`${apiURL}/inscription`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        response.map((element) => {
          if (element.idTipoEstudio.idTipoEstudio == 1) {
            inscriptionId = element.idInscripcion;
          } else if (element.idTipoEstudio.idTipoEstudio == 2) {
            inscriptionId = element.idInscripcion;
          }
        });
        //inscriptionId = response[0].idInscripcion;
      })
      .catch((error) => {
        //console.log(error);
        //console.log("Error en la consulta de inscripción");
      });
    return inscriptionId;
  } catch (error) {
    //console.log(error);
    //alert("Ocurrió un problema de conexión con el servidor");
  }
};

//Obteniendo el periodo actual
export const getPeriod = async () => {
  const authToken = await getData();
  const inscriptionId = await getInscriptionId();
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: ` ${authToken}`,
    },
  };
  try {
    const format = (text) => {
      let response = "";
      text = text.replace(/ /g, "").replace(/-/g, "").replace("/", "-");
      for (let i = 0; i < text.length; i++) {
        if (text.charAt(i) === "2" && text.charAt(i + 1) === "0") {
          response += " " + text.charAt(i);
        } else if (text.charAt(i) === "-") {
          response += " " + text.charAt(i) + " ";
        } else {
          response += text.charAt(i);
        }
      }
      return response;
    };
    let period;
    const response = await fetch(
      `${apiURL}/period/byPersonInscription/${inscriptionId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        period = response[0].periodo;
        period = format(period);
      })
      .catch((error) => {
        //console.log(error);
      });
    return period;
  } catch (error) {
    //console.log(error);
    //alert(error);
  }
};

//Obteniendo el periodo actual
export const getAllPeriods = async (inscriptionId) => {
  const authToken = await getData();
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: ` ${authToken}`,
    },
  };
  try {
    const format = (text) => {
      let response = [];
      text = text.trim();
      text = text.replace(/-/g, " ").replace("/", " ");
      text = text.split(" ");
      text.forEach((element) => {
        if (element != "") {
          response.push(element);
        }
      });
      if (response.length == 4) {
        text = `${response[0]} ${response[1]} - ${response[2]} ${response[3]}`;
      } else {
        text = "";
        response.forEach((element) => {
          text += element + " ";
        });
      }
      return text;
    };

    let period = [];
    let lastPeriod = "";
    const response = await fetch(
      `${apiURL}/period/byPersonInscription/${inscriptionId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        response.map((element) => {
          if (lastPeriod == "") {
            lastPeriod = element.idPeriodo;
            period = [
              ...period,
              {
                label: format(element.periodo),
                value: element.idPeriodo,
              },
            ];
          } else if (lastPeriod != "" && lastPeriod != element.idPeriodo) {
            lastPeriod = element.idPeriodo;
            period = [
              ...period,
              {
                label: format(element.periodo),
                value: element.idPeriodo,
              },
            ];
          }
        });
      })
      .catch((error) => {
        //console.log(error);
      });
    return period;
  } catch (error) {
    //console.log(error);
    //alert("Error de conexión con el servidor");
  }
};

//Consulta de horario
export const getNewSchedule = async (studyType) => {
  const authToken = await getData();
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: ` ${authToken}`,
    },
  };

  try {
    let index = 0;
    let studentSchedule = [];
    //Función para formatear la hora
    const formatHour = (hour) => {
      const aux = hour.split(":");
      hour = `${aux[0]}:${aux[1]}`;
      return hour;
    };
    //Función para asignarle el AM/PM a la hora según el turno
    const setHour = (entryHour, shift) => {
      let formatedHour = "";
      entryHour = formatHour(entryHour);
      let aux = entryHour.split(":");
      aux = parseInt(aux[0]);
      if (shift == "N") {
        formatedHour = `${entryHour} PM`;
      } else if (aux == 12 && shift == "V") {
        formatedHour = `${entryHour} PM`;
      } else if (aux >= 1 && aux <= 4 && shift == "V") {
        formatedHour = `${entryHour} PM`;
      } else if (aux >= 5 && aux < 12 && shift == "V") {
        formatedHour = `${entryHour} AM`;
      } else if (shift == "M") {
        formatedHour = `${entryHour} AM`;
      }
      return formatedHour;
    };

    const response = await fetch(
      `${apiURL}/schedule/student/unified/minimal?tipoEstudio=${studyType}`,
      requestOptions
    )
      .then((response) => response.json())
      .then(({ horario }) => {
        try {
          horario.map(({ bloqueHora, fecha }) => {
            bloqueHora.map((element) => {
              if (studentSchedule.length == 0) {
                studentSchedule = [
                  ...studentSchedule,
                  {
                    id: index,
                    materia: element.seccion.contenido.contenidoProgramatico,
                    seccion: element.seccion.seccion,
                    aula: element.seccion.espacio.espacio
                      ? element.seccion.espacio.espacio
                      : "No posee aula asignada",
                    horaInicio: setHour(element.horaInicio, element.turno),
                    horaFin: setHour(element.horaFin, element.turno),
                    dia: fecha,
                    studyType: studyType,
                    profesor: `${element.seccion.persona.primerNombre} ${element.seccion.persona.primerApellido}`,
                    profesorId: element.seccion.persona.idPersona,
                  },
                ];
              } else if (
                studentSchedule[index]["materia"] ==
                  element.seccion.contenido.contenidoProgramatico &&
                studentSchedule[index]["horaFin"] !=
                  setHour(element.horaFin, element.turno)
              ) {
                studentSchedule[index]["horaFin"] = setHour(
                  element.horaFin,
                  element.turno
                );
              } else if (
                studentSchedule[index]["materia"] !=
                element.seccion.contenido.contenidoProgramatico
              ) {
                index++;
                studentSchedule = [
                  ...studentSchedule,
                  {
                    id: index,
                    materia: element.seccion.contenido.contenidoProgramatico,
                    seccion: element.seccion.seccion,
                    aula: element.seccion.espacio.espacio
                      ? element.seccion.espacio.espacio
                      : "No posee aula asignada",
                    horaInicio: setHour(element.horaInicio, element.turno),
                    horaFin: setHour(element.horaFin, element.turno),
                    dia: fecha,
                    studyType: studyType,
                    profesor: `${element.seccion.persona.primerNombre} ${element.seccion.persona.primerApellido}`,
                    profesorId: element.seccion.persona.idPersona,
                  },
                ];
              }
            });
          });
        } catch (error) {
          console.error(error);
          //alert("Error de conexión");
        }
      });
    //console.log(studentSchedule);
    return studentSchedule;
  } catch (error) {
    //console.log(error);
    //alert(`Error al consultar sus estudios de ${studyType}`);
  }
};

export const getSchedule = async () => {
  const authToken = await getData();
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: ` ${authToken}`,
    },
  };

  try {
    let schedule = [];
    const formatHour = (hour) => {
      const aux = hour.split(":");
      hour = `${aux[0]}:${aux[1]}`;
      return hour;
    };
    const response = await fetch(`${apiURL}/schedule`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        let index = 0;
        response.length == 0
          ? alert("No hay clases esta semana")
          : response.map((parentElement) => {
              parentElement.classes.filter((element) => {
                if (schedule == "") {
                  schedule = [
                    ...schedule,
                    {
                      id: index,
                      materia:
                        element.section.idContenido.contenidoProgramatico,
                      seccion: element.section.seccion,
                      aula: element.space.espacio
                        ? element.space.espacio
                        : "No posee aula asignada",
                      horaDesde: formatHour(element.timeBlock.horaInicio),
                      horaHasta: formatHour(element.timeBlock.horaFin),
                      profesor: `${element.section.idPersona.primerNombre} ${element.section.idPersona.primerApellido}`,
                      dia: parentElement.date,
                    },
                  ];
                } else if (
                  schedule[index]["materia"] ==
                    element.section.idContenido.contenidoProgramatico &&
                  schedule[index]["horaHasta"] !=
                    formatHour(element.timeBlock.horaFin)
                ) {
                  schedule[index]["horaHasta"] = formatHour(
                    element.timeBlock.horaFin
                  );
                } else if (
                  schedule[index]["materia"] !=
                  element.section.idContenido.contenidoProgramatico
                ) {
                  index++;
                  schedule = [
                    ...schedule,
                    {
                      id: index,
                      materia:
                        element.section.idContenido.contenidoProgramatico,
                      seccion: element.section.seccion,
                      aula: element.space.espacio
                        ? element.space.espacio
                        : "No posee aula asignada",
                      horaDesde: formatHour(element.timeBlock.horaInicio),
                      horaHasta: formatHour(element.timeBlock.horaFin),
                      profesor: `${element.section.idPersona.primerNombre} ${element.section.idPersona.primerApellido}`,
                      dia: parentElement.date,
                    },
                  ];
                }
              });
            }); //Map
      })
      .catch((error) => {
        //console.log(error);
      });
    //console.log(schedule);
    return schedule;
  } catch (error) {
    //console.log(error);
    //alert("Error de conexión con el servidor");
  }
};

//Consulta de Profesores
export const getProffesors = async (studyType) => {
  const authToken = await getData();
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: ` ${authToken}`,
    },
  };
  try {
    let proffesors = [];
    let id = 0;
    const response = await fetch(`${apiURL}/schedule`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        response.length == 0
          ? alert("No se encontraron profesores")
          : response.map(({ classes }) => {
              classes.map(({ section }) => {
                if (proffesors.length == 0) {
                  proffesors = [
                    ...proffesors,
                    {
                      id: id,
                      materia: section.idContenido.contenidoProgramatico,
                      profesor: `${section.idPersona.primerNombre} ${section.idPersona.primerApellido}`,
                      idProfesor: section.idPersona.idPersona,
                      idSeccion: section.idSeccion,
                      studyType: studyType,
                    },
                  ];
                } else {
                  const isFound = proffesors.some((element) => {
                    if (element.idSeccion === section.idSeccion) {
                      return true;
                    }
                    return false;
                  });
                  if (!isFound) {
                    id++;
                    proffesors = [
                      ...proffesors,
                      {
                        id: id,
                        materia: section.idContenido.contenidoProgramatico,
                        profesor: `${section.idPersona.primerNombre} ${section.idPersona.primerApellido}`,
                        idProfesor: section.idPersona.idPersona,
                        idSeccion: section.idSeccion,
                        studyType: studyType,
                      },
                    ];
                  }
                }
              });
            }); //Map
      })
      .catch((error) => {
        //console.log(error);
      });
    return proffesors;
  } catch (error) {
    //console.log(error);
    alert("Error de conexión con el servidor"); //Error inesperado
  }
};

export const getNewProffesors = async (studyType) => {
  const authToken = await getData();
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: ` ${authToken}`,
    },
  };

  try {
    let id = 0;
    let proffesors = [];
    const response = await fetch(
      `${apiURL}/schedule/student/unified/minimal?tipoEstudio=${studyType}`,
      requestOptions
    )
      .then((response) => response.json())
      .then(({ horario }) => {
        if (horario.length != 0) {
          horario.map(({ bloqueHora }) => {
            bloqueHora.map((element) => {
              if (proffesors.length == 0) {
                proffesors = [
                  ...proffesors,
                  {
                    id: id,
                    courseName: element.seccion.contenido.contenidoProgramatico,
                    proffesor: `${element.seccion.persona.primerNombre} ${element.seccion.persona.primerApellido}`,
                    proffesorId: element.seccion.persona.idPersona,
                    sectionId: element.seccion.idSeccion,
                    studyType: studyType,
                  },
                ];
              } else {
                const isFound = proffesors.some((insideElement) => {
                  if (insideElement.sectionId === element.seccion.idSeccion) {
                    return true;
                  }
                  return false;
                });
                if (!isFound) {
                  id++;
                  proffesors = [
                    ...proffesors,
                    {
                      id: id,
                      courseName:
                        element.seccion.contenido.contenidoProgramatico,
                      proffesor: `${element.seccion.persona.primerNombre} ${element.seccion.persona.primerApellido}`,
                      proffesorId: element.seccion.persona.idPersona,
                      sectionId: element.seccion.idSeccion,
                      studyType: studyType,
                    },
                  ];
                }
              }
            });
          });
        }
      })
      .catch((error) => {
        //console.log(error);
      });
    return proffesors;
  } catch (error) {
    //console.log(error);
    alert("Error de conexión con el servidor"); //Error inesperado
  }
};

export const getInscriptionIdByStudyId = async (studyId) => {
  const authToken = await getData();
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: ` ${authToken}`,
    },
  };
  try {
    let inscriptionId;
    const response = await fetch(`${apiURL}/inscription`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        response.map((carrera) => {
          if (carrera.idEstudio.idEstudio == studyId) {
            inscriptionId = carrera.idInscripcion;
          }
        });
      })
      .catch((error) => {
        //console.log(error);
      });
    //console.log(inscriptionId);
    return inscriptionId;
  } catch (error) {
    //console.log(error);
    alert("Error de conexión con el servidor"); //Error inesperado
  }
};

//Reemplazar por la de arriba
export const getIdInscripcionByIdEstudio = async (idEstudio) => {
  const authToken = await getData();
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: ` ${authToken}`,
    },
  };
  try {
    let idInscripcion;
    const response = await fetch(`${apiURL}/inscription`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        response.map((element) => {
          if (element.idEstudio.idEstudio == idEstudio) {
            idInscripcion = element.idInscripcion;
          }
        });
      });
    //console.log(idInscripcion);
    return idInscripcion;
  } catch (error) {
    //console.log(error);
    alert("Error de conexión con el servidor"); //Error inesperado
  }
};

//Consulta de las notas del estudiante
export const getGrades = async (period, career) => {
  const authToken = await getData();
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: ` ${authToken}`,
    },
  };
  try {
    let grades = [];
    const response = await fetch(
      `${apiURL}/grade/byPeriod/${period}/${career}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        //console.log(`period: ${period} career: ${career}`);
        //console.log(response);
        let notas = [];
        let notaAcumulativa = 0;
        let idGrade = 0;
        let idNota = 0;
        response.map((element) => {
          element.grades.map((grade) => {
            notaAcumulativa += parseFloat(grade.notaAcu, 10);
            notas = [
              ...notas,
              {
                id: idNota,
                notaParcial: isNaN(grade.notaParcial)
                  ? 0
                  : parseFloat(grade.notaParcial, 10),
                peso: parseInt(grade.gradeDetail.peso, 10),
                base: parseInt(grade.gradeDetail.base, 10),
              },
            ];
            idNota++;
          });
          grades = [
            ...grades,
            {
              id: idGrade,
              materia: element.subject.contenidoProgramatico,
              seccion: element.section.seccion,
              notaAcumulativa:
                Math.round((notaAcumulativa + Number.EPSILON) * 100) / 100,
              notas: notas,
              idSeccion: element.section.idSeccion,
            },
          ];
          idGrade++;
          notas = [];
          notaAcumulativa = 0;
        });
      });
    //console.log(grades);
    return grades;
  } catch (error) {
    //console.log(error);
    alert("Error de conexión con el servidor"); //Error inesperado
  }
};

//Consulta de pagos hecha por Klissman o David Soles
export const getPayments = async (studyType) => {
  const authToken = await getData();
  const formatDate = (date) => {
    date = date.split("-").reverse().join("-");
    return date;
  };

  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: ` ${authToken}`,
    },
  };
  try {
    let id = 0;
    let payments = [];
    const response = await fetch(`${apiURL}/fee`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        if (response[studyType]) {
          response[studyType].map(({ estudio, feePaymentDtos }) => {
            feePaymentDtos.map((individualPayment) => {
              payments = [
                ...payments,
                {
                  id: id,
                  balance: individualPayment.saldoCuota,
                  date: formatDate(individualPayment.vigencia),
                  name: individualPayment.idConcepto.descripcionConcepto,
                  state: individualPayment.estadoCuota,
                  studyName: estudio,
                  studyType: studyType,
                },
              ];
              id++;
            });
          });
        }
      });
    return payments;
  } catch (error) {
    //console.error(error);
    alert("Error de conexión con el servidor"); //Error inesperado
  }
};

//Consulta para obtener el horario del profesor studyType = "PREGRADO" o "POSTGRADO"
export const getProffesorSchedule = async (studyType, proffesorId, today) => {
  const authToken = await getData();
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: ` ${authToken}`,
    },
  };

  //Funciones
  const formatHour = (hour) => {
    const aux = hour.split(":");
    hour = `${aux[0]}:${aux[1]}`;
    return hour;
  };
  //Función pata dar formato a la fecha
  const formatDate = (date) => date.split("-").reverse().join("-");

  //Función para asignarle el AM/PM a la hora según el turno
  const setHour = (entryHour, shift) => {
    let formatedHour = "";
    entryHour = formatHour(entryHour);
    let aux = entryHour.split(":");
    aux = parseInt(aux[0]);
    if (shift == "N") {
      formatedHour = `${entryHour} PM`;
    } else if (aux == 12 && shift == "V") {
      formatedHour = `${entryHour} PM`;
    } else if (aux >= 1 && aux <= 4 && shift == "V") {
      formatedHour = `${entryHour} PM`;
    } else if (aux >= 5 && aux < 12 && shift == "V") {
      formatedHour = `${entryHour} AM`;
    } else if (shift == "M") {
      formatedHour = `${entryHour} AM`;
    }
    return formatedHour;
  };

  try {
    let index = 0;
    let proffesorSchedule = [];
    const response = await fetch(
      `${apiURL}/schedule/teacher/minimal?tipoEstudio=${studyType}&idPersona=${proffesorId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then(({ horario }) => {
        try {
          let day = horario.filter((day) => day.fecha == today);
          day.map(({ bloqueHora }) => {
            bloqueHora.map((element) => {
              if (proffesorSchedule.length == 0) {
                proffesorSchedule = [
                  ...proffesorSchedule,
                  {
                    id: index,
                    horaInicio: setHour(element.horaInicio, element.turno),
                    horaFin: setHour(element.horaFin, element.turno),
                    materia: element.seccion.contenido.contenidoProgramatico,
                    seccion: element.seccion.seccion,
                    aula: element.seccion.espacio.espacio
                      ? element.seccion.espacio.espacio
                      : "No posee aula asignada",
                    fecha: formatDate(today),
                  },
                ];
              } else if (
                proffesorSchedule[index]["materia"] ==
                  element.seccion.contenido.contenidoProgramatico &&
                proffesorSchedule[index]["horaFin"] !=
                  setHour(element.horaFin, element.turno)
              ) {
                proffesorSchedule[index]["horaFin"] = setHour(
                  element.horaFin,
                  element.turno
                );
              } else if (
                proffesorSchedule[index]["materia"] !=
                element.seccion.contenido.contenidoProgramatico
              ) {
                index++;
                proffesorSchedule = [
                  ...proffesorSchedule,
                  {
                    id: index,
                    horaInicio: setHour(element.horaInicio, element.turno),
                    horaFin: setHour(element.horaFin, element.turno),
                    materia: element.seccion.contenido.contenidoProgramatico,
                    seccion: element.seccion.seccion,
                    aula: element.seccion.espacio.espacio
                      ? element.seccion.espacio.espacio
                      : "No posee aula asignada",
                    fecha: formatDate(today),
                  },
                ];
              }
            });
          });
        } catch (error) {
          alert("Error de conexión");
        }
      });
    return proffesorSchedule;
  } catch (error) {
    //console.log(error);
    //alert(`Hubo un error al consultar su estudio de ${studyType}`); //Error inesperado
  }
};

export const getProffesorClassSchedule = async (studyType, proffesorId) => {
  const authToken = await getData();
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: ` ${authToken}`,
    },
  };

  //Funciones
  const formatHour = (hour) => {
    const aux = hour.split(":");
    hour = `${aux[0]}:${aux[1]}`;
    return hour;
  };
  //Función pata dar formato a la fecha
  const formatDate = (date) => date.split("-").reverse().join("-");

  //Función para asignarle el AM/PM a la hora según el turno
  const setHour = (entryHour, shift) => {
    let formatedHour = "";
    entryHour = formatHour(entryHour);
    let aux = entryHour.split(":");
    aux = parseInt(aux[0]);
    if (shift == "N") {
      formatedHour = `${entryHour} PM`;
    } else if (aux == 12 && shift == "V") {
      formatedHour = `${entryHour} PM`;
    } else if (aux >= 1 && aux <= 4 && shift == "V") {
      formatedHour = `${entryHour} PM`;
    } else if (aux >= 5 && aux < 12 && shift == "V") {
      formatedHour = `${entryHour} AM`;
    } else if (shift == "M") {
      formatedHour = `${entryHour} AM`;
    }
    return formatedHour;
  };

  try {
    let index = 0;
    let proffesorSchedule = [];
    const response = await fetch(
      `${apiURL}/schedule/teacher/minimal?tipoEstudio=${studyType}&idPersona=${proffesorId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then(({ horario }) => {
        try {
          horario.map(({ bloqueHora, fecha }) => {
            bloqueHora.map((element) => {
              if (proffesorSchedule.length == 0) {
                proffesorSchedule = [
                  ...proffesorSchedule,
                  {
                    id: index,
                    horaInicio: setHour(element.horaInicio, element.turno),
                    horaFin: setHour(element.horaFin, element.turno),
                    materia: element.seccion.contenido.contenidoProgramatico,
                    seccion: element.seccion.seccion,
                    aula: element.seccion.espacio.espacio
                      ? element.seccion.espacio.espacio
                      : "No posee aula asignada",
                    fecha: formatDate(fecha),
                  },
                ];
              } else if (
                proffesorSchedule[index]["materia"] ==
                  element.seccion.contenido.contenidoProgramatico &&
                proffesorSchedule[index]["horaFin"] !=
                  setHour(element.horaFin, element.turno)
              ) {
                proffesorSchedule[index]["horaFin"] = setHour(
                  element.horaFin,
                  element.turno
                );
              } else if (
                proffesorSchedule[index]["materia"] !=
                element.seccion.contenido.contenidoProgramatico
              ) {
                index++;
                proffesorSchedule = [
                  ...proffesorSchedule,
                  {
                    id: index,
                    horaInicio: setHour(element.horaInicio, element.turno),
                    horaFin: setHour(element.horaFin, element.turno),
                    materia: element.seccion.contenido.contenidoProgramatico,
                    seccion: element.seccion.seccion,
                    aula: element.seccion.espacio.espacio
                      ? element.seccion.espacio.espacio
                      : "No posee aula asignada",
                    fecha: formatDate(fecha),
                  },
                ];
              }
            });
          });
        } catch (error) {
          //console.error(error);
          //alert("Error de conexión");
        }
      });
    return proffesorSchedule;
  } catch (error) {
    //console.log(error);
    //alert(`Hubo un error al consultar su estudio de ${studyType}`); //Error inesperado
  }
};

export const getAllStudyTypesByInscriptionId = async () => {
  const authToken = await getData();
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: ` ${authToken}`,
    },
  };

  let studyTypes = [];
  const removeAccents = (string) => {
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  try {
    const response = await fetch(`${apiURL}/inscription`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        //console.log(response);
        response.map(({ estadoEstudio, idTipoEstudio }) => {
          //Cambios a hacer: En teoría van a solucionar el problema con extensión. Si lo hacen quita el campo.
          if (estadoEstudio == "ACTIVO" && idTipoEstudio.idTipoEstudio != 3) {
            studyTypes = [
              ...studyTypes,
              {
                label: idTipoEstudio.tipoEstudio,
                value: removeAccents(idTipoEstudio.tipoEstudio),
              },
            ];
          }
        });
      });
    //console.log(studyTypes);
    return studyTypes;
  } catch (error) {
    //console.log(error);
  }
};

export const getAllDegreesData = async () => {
  const authToken = await getData();
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: ` ${authToken}`,
    },
  };
  try {
    const formatStudyValue = (studyTypeValue) => {
      if (studyTypeValue.includes("POSTGRADO")) {
        studyTypeValue = "POSTGRADO";
      }
      return removeAccents(studyTypeValue);
    };
    const removeAccents = (string) => {
      return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };
    let id = 0;
    let degree = [];
    const response = await fetch(`${apiURL}/inscription`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        response.map((career) => {
          degree = [
            ...degree,
            {
              id: id,
              career: career.idEstudio.estudio,
              careerId: career.idEstudio.idEstudio,
              inscriptionId: career.idInscripcion,
              studyTypeId: career.idTipoEstudio.idTipoEstudio,
              studyType: career.idTipoEstudio.tipoEstudio,
              studyTypeValue: formatStudyValue(
                career.idTipoEstudio.tipoEstudio
              ),
              studyState: career.estadoEstudio,
            },
          ];
          id++;
        });
      })
      .catch((error) => {
        //console.error(error);
      });
    return degree;
  } catch (error) {
    //console.error(error);
  }
};
