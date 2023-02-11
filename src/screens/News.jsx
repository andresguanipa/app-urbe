//Componentes de React Native
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  FlatList,
  ActivityIndicator,
  StatusBar,
  Alert,
  TouchableOpacity,
} from "react-native";

import { useEffect, useState } from "react";

//utils
import { confirmExit } from "../../utils";

//Queries
import { getLatestNews } from "../services/NewsService";

const Item = ({ item }) => (
  <View style={styles.card}>
    <View style={styles.leftContainer}>
      {item.imagen ? (
        <Image
          style={item.imagen.includes("http") ? styles.img : styles.imgError}
          source={imageSource(item.imagen)}
        />
      ) : (
        <Image
          style={styles.imgError}
          source={require("../assets/news-placeholder.jpg")}
        />
      )}
    </View>
    <View style={styles.rightContainer}>
      <Text style={styles.title}>{formatTitle(item.titulo)}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          confirmExit(`https://campus.urbe.edu/noticias/${item.idNoticia}`);
        }}
      >
        <Text style={styles.button}>Saber Más</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const formatTitle = (title) =>
  title.length > 100 ? `${title.slice(0, 100)}...` : title;

const imageSource = (source) => {
  let newSource = "";
  source && source.includes("http")
    ? (newSource = {
        uri: source,
      })
    : (newSource = require("../assets/news-placeholder.jpg"));
  return newSource;
};

export const News = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [responseOk, setResponseOk] = useState(true);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const latestNews = await getLatestNews();
        latestNews.length > 0
          ? setNews(latestNews)
          : Alert.alert(
              "NOTICIAS",
              "No se encontraron noticias. Intente nuevamente más tarde."
            );
        setIsLoading(false);
        setResponseOk(latestNews.length > 0);
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
          data={news}
          renderItem={renderItem}
          keyExtractor={(item) => item.idNoticia}
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
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    borderRadius: 10,
    margin: "1%",
    maxHeight: Dimensions.get("window").height * 0.2,
    backgroundColor: "#ffffff",
    alignSelf: "center",
    minHeight: 50,
  },
  rightContainer: {
    width: "60%",
    paddingHorizontal: "2.5%",
    paddingVertical: "4%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  leftContainer: {
    width: "40%",
    overflow: "hidden",
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: "center",
  },
  img: {
    height: "100%",
    resizeMode: "cover",
    overflow: "hidden",
  },
  imgError: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    alignSelf: "center",
    margin: "auto",
    backgroundColor: "white",
  },
  title: {
    color: "black",
    textAlign: "left",
    fontSize: Dimensions.get("window").height * 0.02,
    fontWeight: "bold",
  },
  button: {
    width: "75%",
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
