//Componentes de React Native
import { StyleSheet, View, SafeAreaView, Image, StatusBar } from "react-native";

//Gradiente
import { LinearGradient } from "expo-linear-gradient";

//Components
import { IconButton } from "../components/buttons/IconButton";
import { PrimaryButton } from "../components/buttons/PrimaryButton";
import { TextButton } from "../components/buttons/TextButton";

const recoveryButton = {
  name: "Powered By SERVIEDUCA",
  url: "https://www.servieduca.net/inicio",
};

const iconsData = [
  {
    navigateTo: "News",
    iconName: "newspaper-outline",
    isOniIcons: true,
    iconColor: "white",
    buttonText: "Noticias",
    whiteText: true,
  },
  {
    navigateTo: "Events",
    iconName: "calendar-alt",
    isOniIcons: false,
    iconColor: "white",
    buttonText: "Eventos",
    whiteText: true,
  },
  {
    navigateTo: "https://www.urbe.edu/estudios/pregrado/",
    iconName: "graduation-cap",
    isOniIcons: false,
    iconColor: "white",
    buttonText: "Oferta Académica",
    whiteText: true,
  },
  {
    navigateTo: "https://radioshdstreaming.com/player/urbefm/",
    iconName: "radio",
    isOniIcons: true,
    iconColor: "white",
    buttonText: "Radio",
    whiteText: true,
  },
  {
    navigateTo: "https://www.urbe.edu/publicaciones/",
    iconName: "book-reader",
    isOniIcons: false,
    iconColor: "white",
    buttonText: "Revistas",
    whiteText: true,
  },
  {
    navigateTo: "https://www.urbe.edu/universidad/sede.html",
    iconName: "map-marked",
    isOniIcons: false,
    iconColor: "white",
    buttonText: "Mapas",
    whiteText: true,
  },
  {
    navigateTo: "SocialUrbe",
    iconName: "chatbubbles-sharp",
    isOniIcons: true,
    iconColor: "white",
    buttonText: "Social Urbe",
    whiteText: true,
  },
  {
    navigateTo: "Emergencies",
    iconName: "phone-alt",
    isOniIcons: false,
    iconColor: "white",
    buttonText: "Emergencia",
    whiteText: true,
  },
];

export const Index = ({ navigation }) => {
  const navigateFunction = () => navigation.navigate("Login");
  const accessButton = {
    name: "ACCEDER",
    function: navigateFunction,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={styles.topContent}>
        <Image
          style={styles.logo}
          source={require("../assets/logo-urbe.png")}
        />
      </View>
      <LinearGradient
        colors={["#000042", "#0053B7"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.centerContent}>
          {iconsData.map((button) => (
            <IconButton
              key={button.buttonText.replace(" ", "")}
              navigation={navigation}
              item={button}
            />
          ))}
        </View>
        <View style={styles.bottomContent}>
          <PrimaryButton item={accessButton} navigation={navigation} />
          <TextButton item={recoveryButton} />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomContent: {
    width: "100%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  centerContent: {
    width: "100%",
    height: "60%",
    paddingTop: "8%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    height: "52%",
  },
  logo: {
    width: "70%",
    overflow: "visible",
    resizeMode: "contain",
  },
  topContent: {
    width: "100%",
    height: "48%",
    backgroundColor: "#fff",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
