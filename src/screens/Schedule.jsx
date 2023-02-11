import { useState, useEffect } from "react";

//Componentes de React Native
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Alert,
  Pressable,
  ActivityIndicator,
  StatusBar,
  Dimensions,
} from "react-native";

//Iconos
import { FontAwesome5 } from "@expo/vector-icons";

//Consultas
import { getNewSchedule, getAllDegreesData } from "../services/Queries";

const iconSize = Dimensions.get("window").height * 0.035;

export const Schedule = () => {
  //Componente iterable del horario
  const ItemHorario = ({ item }) => (
    <>
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
            <Text style={styles.tinyText}>Profesor: {item.profesor}</Text>
            <Text style={styles.tinyText}>Aula: {item.aula}</Text>
            <Text style={styles.tinyText}>Sección: {item.seccion}</Text>
          </View>
        </View>
      </View>
    </>
  );
  const renderItemHorario = ({ item }) => {
    return <ItemHorario item={item} />;
  };

  //Estados
  const [isLoading, setIsLoading] = useState(true);
  const [disableLeft, setDisableLeft] = useState(false);
  const [disableRight, setDisableRight] = useState(false);
  const [fullDate, setFullDate] = useState(new Date());
  const [day, setDay] = useState([]);
  const [dayOfTheWeek, setDayOfTheWeek] = useState("");
  const [flatListData, setFlatListData] = useState([]);
  const [showFlatList, setShowFlatList] = useState(false);

  const mountContent = async () => {
    const itemsStudyTypes = await getAllDegreesData();
    itemsStudyTypes.map(async (studyType) => {
      try {
        if (
          (studyType.state =
            "ACTIVO" && studyType.studyTypeValue != "EXTENSION")
        ) {
          setDay(...day, await getNewSchedule(studyType.studyTypeValue));
        }
      } catch (error) {
        //Do nothing
      }
    });
  };

  //Función para montar el horario en el FlatList según el día de la semana.
  const mountFlatListData = async () => {
    setFlatListData([]);
    let dayData = day.filter(
      (element) => element.dia == dateToString(fullDate)
    );
    setFlatListData(dayData);
  };

  //Carga de información
  useEffect(() => {
    const fetchRequest = async () => {
      await mountContent();
    };
    fetchRequest();
  }, []);

  //Espera a que cargue el horario
  useEffect(() => {
    if (day.length > 0) {
      setCurrentSchedule();
      setIsLoading(false);
      setShowFlatList(true);
    }
    setTimeout(() => {
      setCurrentSchedule();
      setIsLoading(false);
    }, 30000);
  }, [day]);

  //Funciones
  //Función para actualizar el nombre del día y el estado de los botones.
  const setCurrentSchedule = () => {
    mountFlatListData();
    setDayOfTheWeek(getDayByNumber(fullDate));
    disableButton(fullDate);
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

  //Función de navegación para ir al día siguiente o anterior
  const navigateDay = (action) => {
    if (action == "next") {
      fullDate.setDate(fullDate.getDate() + 1);
      setCurrentSchedule();
    } else if (action == "previous") {
      fullDate.setDate(fullDate.getDate() - 1);
      setCurrentSchedule();
    }
  };

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
        <>
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
          <View style={styles.content}>
            {showFlatList ? (
              <FlatList
                data={flatListData}
                renderItem={renderItemHorario}
                keyExtractor={(item) => item.id}
              />
            ) : (
              <View style={styles.container}>
                <Text style={styles.day}>
                  No encontró horario para ésta semana
                </Text>
              </View>
            )}
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  arrowButton: {
    flex: 0.2,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: "2.5%",
    width: "100%",
  },
  content: {
    flex: 9,
    width: "100%",
  },
  topButton: {
    margin: 1,
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
  hourText: {
    fontSize: Dimensions.get("window").height * 0.0185,
    textAlign: "center",
  },
  nameText: {
    fontWeight: "bold",
    fontSize: Dimensions.get("window").height * 0.0215,
    color: "white",
    flex: 1,
    flexWrap: "wrap",
    flexShrink: 1,
  },
  tinyText: {
    fontSize: Dimensions.get("window").height * 0.0195,
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
  dayContainer: {
    flex: 0.6,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  day: {
    fontSize: Dimensions.get("window").height * 0.025,
    fontWeight: "bold",
    textAlign: "center",
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
  spinner: {
    alignSelf: "center",
  },
});
