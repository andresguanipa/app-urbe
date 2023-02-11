import jwt_decode from "jwt-decode";

//Get Token
import { getData } from "../asyncStorage/AsyncStorage";

/* 
  //Token example

  const decodedToken = {
    "aud": Array [
      "EMPLOYEE",
      "STUDENT",
    ],
    "correoPrimario": "matteoleccese2099@gmail.com",
    "exp": 1665756014,
    "idPersona": 1121660,
    "identificacion": "27683018",
    "primerApellido": "LECCESE",
    "primerNombre": "MATTEO",
    "proviene": "WEB",
    "segundoApellido": "IEMMA",
    "segundoNombre": "ANTONIO",
    "sub": "27683018",
    "tipoCedula": "V",
    "tipoIdentificacion": "C",
  }
*/

//Function to decode the token
/*export*/ const decodeToken = async () => jwt_decode(await getData());

export const getUserAuthorities = async () => {
  const decodedToken = await decodeToken();
  return decodedToken.aud;
};

export const getUserName = async () => {
  const decodedToken = await decodeToken();
  return `${decodedToken.primerNombre} ${decodedToken.primerApellido}`;
};

export const getUserId = async () => {
  const decodedToken = await decodeToken();
  return decodedToken.idPersona;
};

/*
export const functionname = async () => {

}
*/
