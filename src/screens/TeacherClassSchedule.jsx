import { useState, useEffect } from "react";

//React Native Components
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";

//Proffesors
import { getProffesorClassSchedule } from "../services/Queries";
import { getUserId } from "../services/TokenService";

const iconSize = Dimensions.get("window").height * 0.035;

export const TeacherClassSchedule = ({ navigation }) => {
  const [proffesorSchedule, setProffesorSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const studyTypes = ["PREGRADO", "POSTGRADO", "EXTENSION"];
  const [fullDate, setFullDate] = useState(new Date());
  const [day, setDay] = useState([]);
  const [dayOfTheWeek, setDayOfTheWeek] = useState("");
  const [disableLeft, setDisableLeft] = useState(false);
  const [disableRight, setDisableRight] = useState(false);

  //Componente iterable
  const ItemProffesorClassSchedule = ({ item }) => (
    <>
      {item.fecha == reverseDate(fullDate) ? (
        <View style={styles.card}>
          <View style={styles.leftContent}>
            <Text style={styles.hourText}>{item.horaInicio}</Text>
            <Text style={styles.hourText}>a</Text>
            <Text style={styles.hourText}>{item.horaFin}</Text>
          </View>
          <View style={styles.rightContent}>
            <View style={styles.insideHeader}>
              <Text style={styles.nameText}>{item.materia}</Text>
            </View>
            <View style={styles.insideCard}>
              <Text style={styles.text}>Sección: {item.seccion}</Text>
              <Text style={styles.text}>Aula: {item.aula}</Text>
              <Text style={styles.text}>Fecha: {item.fecha}</Text>
            </View>
          </View>
        </View>
      ) : null}
    </>
  );
  const renderItemProffesorClassSchedule = ({ item }) => {
    return <ItemProffesorClassSchedule item={item} />;
  };

  const addProffesorSchedule = async () => {
    try {
      studyTypes.map(async (studyType) => {
        await getProffesorClassSchedule(studyType, await getUserId()).then(
          (scheduleResponse) => {
            if (scheduleResponse.length) {
              setProffesorSchedule(...proffesorSchedule, scheduleResponse);
            }
          }
        );
      });
    } catch (error) {
      alert("Error de Conexión", "Error de conexión con el servidor");
      navigation.navigate("Teachers");
    }
  };

  //Función para actualizar el nombre del día y el estado de los botones.
  const setCurrentSchedule = () => {
    setDayOfTheWeek(getDayByNumber());
    disableButton(fullDate);
  };

  //Función para navegar los días de la semana
  const navigateDay = (action) => {
    if (action == "next") {
      fullDate.setDate(fullDate.getDate() + 1);
      setCurrentSchedule();
    } else if (action == "previous") {
      fullDate.setDate(fullDate.getDate() - 1);
      setCurrentSchedule();
    }
  };

  //Función para obtener el día de la semana a partir del número del día
  const getDayByNumber = () => {
    const days = [
      "DOMINGO",
      "LUNES",
      "MARTES",
      "MIÉRCOLES",
      "JUEVES",
      "VIERNES",
      "SÁBADO",
    ];
    let date = fullDate.getDay();
    return days[date];
  };

  //Función para desabilitar los botones de navegación dependiendo del día en que se encuentre
  const disableButton = (date) => {
    let dateNumber = date.getDay();
    if (dateNumber == 0) {
      setDisableRight(true);
    } else if (dateNumber == 1) {
      setDisableLeft(true);
    } else {
      setDisableRight(false);
      setDisableLeft(false);
    }
  };

  //Retorna la fecha al revés
  const reverseDate = (date) => {
    date = typeof date == "string" ? null : dateToString(date);
    return date.split("-").reverse().join("-");
  };

  //Función para dar formato al día	para usar en la consulta (YYYY-MM-DD)
  const dateToString = (date) => {
    let month = date.getUTCMonth() + 1; //months from 1-12
    month < 10 ? (month = "0" + month) : month;
    let day = date.getUTCDate();
    day < 10 ? (day = "0" + day) : day;
    let year = date.getUTCFullYear();
    return `${year}-${month}-${day}`;
  };

  //Función de carga de información
  useEffect(() => {
    const fetchRequest = async () => {
      await addProffesorSchedule();
      setIsLoading(false);
      setCurrentSchedule();
    };
    fetchRequest();
  }, []);

  useEffect(() => {
    const fetchRequest = async () => {
      proffesorSchedule.length > 0 ? setIsLoading(false) : null;
    };
    fetchRequest();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      {isLoading ? (
        <View style={styles.spinner}>
          <ActivityIndicator
            //style={styles.spinner}
            size="large"
            color="#000042"
          />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <Pressable
              disabled={disableLeft}
              style={styles.arrowButton}
              onPress={() => {
                navigateDay("previous");
              }}
            >
              <FontAwesome5
                name="arrow-left"
                size={iconSize}
                color={disableLeft ? "#98a49e" : "black"}
              />
            </Pressable>
            <View style={styles.dayContainer}>
              <Text style={styles.day}>{dayOfTheWeek}</Text>
            </View>
            <Pressable
              disabled={disableRight}
              style={styles.arrowButton}
              onPress={() => {
                navigateDay("next");
              }}
            >
              <FontAwesome5
                name="arrow-right"
                size={iconSize}
                color={disableRight ? "#98a49e" : "black"}
              />
            </Pressable>
          </View>
          <View style={styles.flatListContainer}>
            <FlatList
              data={proffesorSchedule}
              renderItem={renderItemProffesorClassSchedule}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: "5%",
  },
  leftContent: {
    width: "20%",
    alignContent: "center",
  },
  rightContent: {
    backgroundColor: "white",
    width: "80%",
    justifyContent: "center",
    borderRadius: 10,
    alignSelf: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  insideHeader: {
    backgroundColor: "#000042",
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    paddingVertical: "2%",
    paddingHorizontal: "4%",
    minHeight: 35,
  },
  insideCard: {
    paddingVertical: "2%",
    paddingHorizontal: "4%",
  },

  hourText: {
    fontSize: 14,
    textAlign: "center",
  },
  nameText: {
    fontSize: 16,
    color: "white",
    flex: 1,
    flexWrap: "wrap",
    flexShrink: 1,
  },
  date: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
    marginTop: "3%",
  },
  text: {
    color: "black",
    fontSize: 16,
    paddingHorizontal: "1%",
  },
  spinner: {
    alignContent: "center",
    justifyContent: "center",
    flex: 0.8,
  },
  flatListContainer: {
    flex: 0.875,
  },
  button: {
    margin: "5%",
    width: "55%",
    height: Dimensions.get("window").height * 0.05,
    borderRadius: 10,
    backgroundColor: "#b31105",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: Dimensions.get("window").height * 0.08,
    justifyContent: "center",
  },
  textButton: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: "1%",
  },
  buttonContainer: {
    flex: 0.2,
  },
  spaceBetween: {
    flex: 1,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 18,
    alignSelf: "center",
    marginBottom: "5%",
  },
  header: {
    flex: 0.125,
    flexDirection: "row",
    width: "100%",
  },
  arrowButton: {
    flex: 0.2,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  dayContainer: {
    flex: 0.6,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  day: {
    fontSize: 16,
    textAlign: "center",
  },
});
