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

import { PrimaryButton } from "../components/buttons/PrimaryButton";

//Proffesors
import { getProffesorSchedule } from "../services/Queries";

export const TeacherSchedule = ({ route, navigation }) => {
  const { proffesorName, proffesorId, studyType } = route.params;
  const [proffesorSchedule, setProffesorSchedule] = useState();
  const [isLoading, setIsLoading] = useState(true);

  //Componente iterable
  const ItemProffesorSchedule = ({ item }) => (
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
  );
  const renderItemProffesorSchedule = ({ item }) => {
    return <ItemProffesorSchedule item={item} />;
  };

  //Función de carga de información
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        let schedule = await getProffesorSchedule(
          studyType,
          proffesorId,
          today
        );
        if (schedule.length == 0) {
          Alert.alert("Horario", "No posee asignaciones este día");
          navigation.navigate("Teachers");
        } else {
          setProffesorSchedule(schedule);
        }
      } catch (error) {
        navigation.navigate("Teachers");
      }
      setIsLoading(false);
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
        <View style={styles.spaceBetween}>
          <Text style={styles.name}>{proffesorName}</Text>
          <FlatList
            style={styles.flatListContainer}
            data={proffesorSchedule}
            renderItem={renderItemProffesorSchedule}
            keyExtractor={(item) => item.id}
          />
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate("Teachers");
            }}
          >
            <Text style={styles.buttonText}>Volver</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 20,
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
  button: {
    margin: "5%",
    width: "65%",
    height: Dimensions.get("window").height * 0.055,
    backgroundColor: "#B31105",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: Dimensions.get("window").height * 0.01,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: Dimensions.get("window").height * 0.022,
  },
  hourText: {
    fontSize: Dimensions.get("window").height * 0.02,
    textAlign: "center",
  },
  nameText: {
    fontSize: Dimensions.get("window").height * 0.022,
    color: "white",
    flex: 1,
    flexWrap: "wrap",
    flexShrink: 1,
  },
  text: {
    color: "black",
    fontSize: Dimensions.get("window").height * 0.02,
    paddingHorizontal: "1%",
  },
  spinner: {
    alignContent: "center",
    justifyContent: "center",
    flex: 0.8,
  },
  spaceBetween: {
    flex: 1,
    justifyContent: "space-between",
  },
  name: {
    fontSize: Dimensions.get("window").height * 0.032,
    fontWeight: "700",
    color: "#000042",
    alignSelf: "center",
    marginBottom: "5%",
  },
});
