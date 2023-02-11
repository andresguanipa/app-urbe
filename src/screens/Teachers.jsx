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

//Queries
import { getNewProffesors, getAllDegreesData } from "../services/Queries";
import { FontAwesome5 } from "@expo/vector-icons";

const iconName = "user-circle";
const iconSize = Dimensions.get("window").height * 0.12;

export const Teachers = ({ navigation }) => {
  //Estados
  const [proffesors, setProffesors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFlatList, setShowFlatList] = useState(false);

  const ItemProffesor = ({ item }) => (
    <View style={styles.card}>
      <FontAwesome5 name={iconName} size={iconSize} color={"#000042"} />
      <Text style={styles.name}>{item.proffesor}</Text>
      <Text style={styles.course}>{item.courseName}</Text>
      <Pressable
        style={styles.button}
        onPress={() => {
          if (!item.studyType) return;
          navigation.navigate("TeacherSchedule", {
            proffesorName: item.proffesor,
            proffesorId: item.proffesorId,
            studyType: item.studyType,
          });
        }}
      >
        <Text style={styles.textButton}>Ver Horario</Text>
      </Pressable>
    </View>
  );

  //Esta función carga la información de los profesores en el FlatList.
  const searchAllStudies = async () => {
    try {
      const allStudyTypes = await getAllDegreesData();
      allStudyTypes.map(async (studyType) => {
        if (studyType.studyTypeValue != "EXTENSION") {
          setProffesors(
            ...proffesors,
            await getNewProffesors(studyType.studyTypeValue)
          );
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchRequest = async () => {
      if (proffesors.length > 0) {
        setIsLoading(false);
        setShowFlatList(true);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 30000);
    };
    fetchRequest();
  }, [proffesors]);

  useEffect(() => {
    const fetchRequest = async () => {
      await searchAllStudies();
    };
    fetchRequest();
  }, []);

  const renderItemProffesors = ({ item }) => {
    return <ItemProffesor item={item} />;
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
      ) : showFlatList ? (
        <FlatList
          style={styles.flatListContainer}
          data={proffesors}
          renderItem={renderItemProffesors}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <>
          <Text style={styles.course}> No se encontraron profesores</Text>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: "5%",
    width: "55%",
    height: Dimensions.get("window").height * 0.045,
    backgroundColor: "#000042",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: Dimensions.get("window").height * 0.008,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    width: "90%",
    marginHorizontal: "5%",
    backgroundColor: "white",
    marginTop: 10,
    minHeight: 200,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "2%",
  },
  name: {
    color: "black",
    fontSize: Dimensions.get("window").height * 0.025,
    textAlign: "center",
    marginTop: "3%",
  },
  course: {
    color: "black",
    fontSize: Dimensions.get("window").height * 0.02,
    textAlign: "center",
    paddingHorizontal: "1%",
  },
  textButton: {
    color: "white",
    fontSize: Dimensions.get("window").height * 0.02,
    textAlign: "center",
    paddingHorizontal: "1%",
  },
  spinner: {
    alignSelf: "center",
  },
});
