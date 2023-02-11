import { useState, useEffect, useContext } from "react";

//Componentes de React Native
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  ActivityIndicator,
  Platform,
  StatusBar,
} from "react-native";

//Gradiente
import { LinearGradient } from "expo-linear-gradient";

//Consultas
import {
  getProfilePhoto,
  getDegree,
  getPeriod,
  hasActiveInscription,
  getTokenStatus,
} from "../services/Queries";

//AsyncStorage
import { getPhoto, logOut } from "../asyncStorage/AsyncStorage";

//Variables globales
import { AuthContext } from "../components/AuthContext";

//Components
import { ProfileButton } from "../components/buttons/ProfileButton";

//Functions
import { getUserAuthorities, getUserName } from "../services/TokenService";

import { confirmExit } from "../../utils";

export const Profile = ({ navigation }) => {
  //States
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [authentications, setAuthentications] = useState([]);
  const [degree, setDegree] = useState("");
  const [period, setPeriod] = useState("");
  const [photo, setPhoto] = useState("");
  const [isInscribed, setIsInscribed] = useState(false);
  const myContext = useContext(AuthContext);

  //Funciones
  //opens a new screen on the app or an url in the default browser
  const searchFunction = (navigate, props = null) => {
    navigate.includes("http")
      ? confirmExit(navigate)
      : props
      ? navigation.navigate(navigate, props)
      : navigation.navigate(navigate);
  };

  //Monta la foto de perfil del estudiante
  const mountProfilePhoto = async () => {
    if (await getPhoto()) {
      setPhoto(await getPhoto());
    } else {
      await getProfilePhoto();
      setPhoto(await getPhoto());
    }
  };

  const addAuthentication = async () => {
    let newAuthentications = [];
    const tokenAud = await getUserAuthorities();
    if (typeof tokenAud == "object") {
      tokenAud.map((element) => {
        newAuthentications = [...newAuthentications, element];
      });
    } else if (typeof tokenAud == "string" || typeof tokenAud == "text") {
      newAuthentications = [tokenAud];
    }
    return newAuthentications;
  };

  //Carga la información básica del estudiante (nombre, carrera, periodo y foto)
  const loadStudentInfo = async () => {
    const inscribed = await hasActiveInscription();
    setIsInscribed(inscribed);
    setAuthentications(await addAuthentication());
    setName(await getUserName());
    setDegree(await getDegree());
    setPeriod(await getPeriod());
    await mountProfilePhoto();
  };

  //Checkea la validez del token de autenticación al ingresar a la pantalla
  const checkTokenStatus = async () => {
    let tokenStatus = await getTokenStatus();
    tokenStatus != 200 ? handleLogOut() : null;
  };

  //Función para cerrar sesión
  const handleLogOut = async () => {
    await logOut();
    myContext.isSignedInFunction(false);
  };

  //Función para actualizar la pantalla al cargarla por primera vez
  useEffect(() => {
    const fetchRequest = async () => {
      await checkTokenStatus();
      await loadStudentInfo();
      setIsLoading(false);
    };
    fetchRequest();
  }, []);

  //button list
  const buttonList = [
    {
      authority: "teacher",
      buttonText: "Horario de Clases Profesor",
      iconName: "chalkboard-teacher",
      function: () => {
        searchFunction("TeacherClassSchedule");
      },
      requireInscription: false,
    },
    {
      authority: "student",
      buttonText: "Horario de Clases",
      iconName: "clock",
      function: () => {
        searchFunction("Schedule");
      },
      requireInscription: true,
    },
    {
      authority: "student",
      buttonText: "Corte de Notas",
      iconName: "clipboard-list",
      function: () => {
        searchFunction("TermGradesNavigator");
      },
      requireInscription: false,
    },
    {
      authority: "student",
      buttonText: "Profesores",
      iconName: "user-tie",
      function: () => {
        searchFunction("ProffesorNavigator");
      },
      requireInscription: true,
    },
    {
      authority: "student",
      buttonText: "Pagos",
      iconName: "money-check-alt",
      function: () => {
        searchFunction("Payments");
      },
      requireInscription: true,
    },
    {
      authority: "everyone",
      buttonText: "Estudios a Distancia",
      iconName: "laptop",
      function: () => {
        searchFunction("https://login.urbe.edu/");
      },
      requireInscription: false,
    },
    {
      authority: "everyone",
      buttonText: "Cerrar Sesión",
      iconName: "power-off",
      function: () => {
        handleLogOut();
      },
      requireInscription: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      {isLoading ? (
        <ActivityIndicator
          style={styles.spinner}
          size="large"
          color="#000042"
        />
      ) : (
        <ScrollView style={styles.scroll} keyboardDismissMode="on-drag">
          <LinearGradient
            colors={["#000042", "#0070f7"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            style={styles.blueContent}
          >
            <View style={styles.header}>
              <Image
                style={styles.logo}
                source={require("../assets/titulo-urbe.png")}
              />
            </View>
            <View style={styles.imgContainer}>
              <Image
                style={styles.img}
                source={{ uri: `data:image/gif;base64,${photo}` }}
              />
            </View>
          </LinearGradient>
          <View style={styles.whiteContent}>
            <View style={styles.studentInfo}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.description}>{degree}</Text>
              {isInscribed ? (
                <Text style={styles.description}>{period}</Text>
              ) : null}
            </View>
            <View style={styles.buttonContainer}>
              {buttonList.map((singleButton) => {
                return singleButton.requireInscription == isInscribed ||
                  singleButton.requireInscription == false ? (
                  <ProfileButton
                    key={singleButton.buttonText.trim()}
                    item={singleButton}
                    authorities={authentications}
                  />
                ) : null;
              })}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  scroll: {
    flex: 1,
  },
  header: {
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    margin: "1%",
  },
  logo: {
    width: "50%",
    resizeMode: "contain",
    alignSelf: "center",
  },
  imgContainer: {
    width: "100%",
    alignItems: "center",
  },
  img: {
    width: Dimensions.get("window").height * 0.25,
    height: Dimensions.get("window").height * 0.25,
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
  },
  studentInfo: {
    marginTop: "1%",
    width: "100%",
    alignSelf: "center",
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  studentActions: {
    width: "100%",
    height: "100%",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  blueContent: {
    width: "100%",
    height: Dimensions.get("window").height * 0.4,
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  whiteContent: {
    paddingVertical: "2.5%",
    width: "100%",
    minHeight: Dimensions.get("window").height * 0.65,
    backgroundColor: "#fff",
    paddingBottom: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  profilePicture: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.3,
    height: Dimensions.get("window").height * 0.2,
  },
  name: {
    color: "black",
    fontSize: Dimensions.get("window").height * 0.02,
    textAlign: "center",
  },
  description: {
    width: "100%",
    color: "#494949",
    fontSize: Dimensions.get("window").height * 0.018,
    textAlign: "center",
    alignSelf: "center",
  },
  leftContainer: {
    width: "70%",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  leftIcon: {
    left: "5%",
  },
  rightIcon: {
    right: "1%",
  },
  spinner: {
    alignSelf: "center",
  },
});
