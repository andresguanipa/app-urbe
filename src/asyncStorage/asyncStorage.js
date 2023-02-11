import AsyncStorage from "@react-native-async-storage/async-storage";

//Logout Function
export const logOut = async () => {
  await removeData();
  await removePhoto();
  await removePeriodId();
  await removeStudentFullName();
};

export const killSesion = async () => {
  removeData();
  removePhoto();
  removePeriodId();
  removeStudentFullName();
};
//Referente a autenticación
//Read authKey
export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("authKey");
    if (value !== null) {
      return value;
    } else {
    }
  } catch (error) {
    //console.log("Error al leer la llave de autenticación => " + error);
  }
};
//Función para guardar datos
export const storeData = async (value) => {
  try {
    await AsyncStorage.setItem("authKey", value);
  } catch (error) {
    //console.log("Error al almacenar la llave de autenticación => " + error);
  }
};
//Función Remover los datos
export const removeData = async () => {
  try {
    await AsyncStorage.removeItem("authKey");
    getData();
  } catch (error) {
    //console.log("Error al eliminar la llave de autenticación => " + error);
  }
};

//Foto del estudiante
//Buscar la foto
export const getPhoto = async () => {
  try {
    const value = await AsyncStorage.getItem("profilePhoto");
    if (value !== null) {
      return value;
    } else {
      return null;
      //console.log("La Foto de Perfil está vacía");
    }
  } catch (error) {
    //console.log("Error al leer la Foto de Perfil => " + error);
  }
};
//Leer la foto
export const storePhoto = async (value) => {
  try {
    await AsyncStorage.setItem("profilePhoto", value);
  } catch (error) {
    //console.log("Error al almacenar la Foto de Perfil => " + error);
  }
};
//Remover la foto
export const removePhoto = async () => {
  try {
    await AsyncStorage.removeItem("profilePhoto");
    //getPhoto(); ???
  } catch (error) {
    //console.log("Error al eliminar la Foto de Perfil => " + error);
  }
};

//Referente al ID del periodo del estudiante
export const getPeriodId = async () => {
  try {
    const value = await AsyncStorage.getItem("periodId");
    if (value !== null) {
      return value;
    } else {
      //console.log("El ID del periodo está vacío");
    }
  } catch (error) {
    //console.log("Error al leer el Id del periodo => " + error);
  }
};
//Función para guardar datos ID del periodo del estudiante
export const storePeriodId = async (value) => {
  try {
    await AsyncStorage.setItem("periodId", value);
  } catch (error) {
    //console.log("Error al almacenar el Id del periodo => " + error);
  }
};
//Remover el ID del periodo del estudiante
export const removePeriodId = async () => {
  try {
    await AsyncStorage.removeItem("periodId");
  } catch (error) {
    //console.log("Error al eliminar el Id del periodo => " + error);
  }
};

//Referente al Nombre del estudiante
export const getStudentFullName = async () => {
  try {
    const value = await AsyncStorage.getItem("studentFullName");
    if (value !== null) {
      return value;
    } else {
      //console.log("El nombre completo está vacío");
    }
  } catch (error) {
    //console.log("Error al leer el nombre completo => " + error);
  }
};
//Función para guardar datos
export const storeStudentFullName = async (value) => {
  try {
    await AsyncStorage.setItem("studentFullName", value);
  } catch (error) {
    //console.log("Error al almacenar el nombre completo => " + error);
  }
};
//Remover StudentFullName
export const removeStudentFullName = async () => {
  try {
    await AsyncStorage.removeItem("studentFullName");
  } catch (error) {
    //console.log("Error al eliminar studentFullName => " + error);
  }
};
