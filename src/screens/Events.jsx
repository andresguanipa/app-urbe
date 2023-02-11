//Componentes de React Native
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  FlatList,
  ActivityIndicator,
  StatusBar,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";

//Queries
import { getLatestEvents } from "../services/NewsService";

//utils
import { getAbbreviatedMonth, getDay } from "../../utils";

const Item = ({ item }) => (
  <View style={styles.card}>
    <View style={styles.leftContainer}>
      <Text style={styles.date}>{getAbbreviatedMonth(item.fechaFin)}</Text>
      <Text style={[styles.date, styles.number]}>{getDay(item.fechaFin)}</Text>
      <Text style={styles.date}>{item.dia}</Text>
    </View>
    <View style={styles.rightContainer}>
      <Text style={styles.title}>{item.titulo}</Text>
      <Text style={styles.hour}>{`${item.horaInicio} a ${item.horaFin}`}</Text>
    </View>
  </View>
);

export const Events = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [responseOk, setResponseOk] = useState(false);
  const [events, setEvents] = useState([]);

  //Get the latest events
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const latestEvents = await getLatestEvents();
        latestEvents.length > 0
          ? setEvents(latestEvents)
          : Alert.alert(
              "EVENTOS",
              "No se encontraron eventos. Intente nuevamente más tarde."
            );
        setResponseOk(latestEvents.length > 0);
        setIsLoading(false);
      } catch (error) {
        Alert.alert(
          "Error de conexión",
          "Hubo un error de conexión. Intente de nuevo más tarde."
        );
        setIsLoading(false);
        setResponseOk(false);
      }
    };
    fetchRequest();
  }, []);

  const renderItem = ({ item }) => <Item item={item} />;

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
      ) : responseOk ? (
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={(item) => item.idEvento}
        />
      ) : (
        <Image
          style={styles.imgError}
          source={require("../assets/campus-error.jpg")}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  card: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    paddingVertical: "2.5%",
    paddingHorizontal: "1.5%",
    borderRadius: 10,
    marginVertical: "1.5%",
    minHeight: 80,
    backgroundColor: "#ffffff",
    width: "95%",
  },
  rightContainer: {
    width: "75%",
    paddingVertical: "1%",
    paddingRight: "5%",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  leftContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "25%",
  },
  imgError: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    alignSelf: "center",
    margin: "auto",
    backgroundColor: "white",
  },
  date: {
    fontSize: Dimensions.get("window").height * 0.018,
    color: "#000042",
  },
  number: {
    color: "#000042",
    fontSize: Dimensions.get("window").height * 0.04,
    fontWeight: "bold",
  },
  hour: {
    fontSize: Dimensions.get("window").height * 0.018,
    fontWeight: "bold",
    color: "#000042",
    marginTop: "2.5%",
  },
  title: {
    color: "#000042",
    color: "black",
    fontSize: Dimensions.get("window").height * 0.022,
    fontWeight: "bold",
  },
  button: {
    width: "60%",
    borderRadius: 10,
    color: "white",
    textAlign: "center",
    fontSize: Dimensions.get("window").height * 0.02,
    fontWeight: "bold",
    backgroundColor: "#000042",
    padding: "1%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
