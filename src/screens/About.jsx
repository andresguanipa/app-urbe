import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import Constants from "expo-constants";

//Gradiente
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";

import { confirmExit } from "../../utils";

export const About = ({ navigation }) => {
  const iconSize = Dimensions.get("window").height * 0.03;
  const year = new Date().getFullYear();
  const appVersion = Constants.manifest.version;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <LinearGradient
        colors={["#000042", "#0053B7"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <View style={styles.container}>
          <Text style={styles.title}>URBE</Text>
          <Text style={styles.subtitle}>Versión {appVersion}</Text>
          <Image
            style={styles.logo}
            source={require("../assets/urbe-symbol.png")}
          />
          <TouchableOpacity
            onPress={() => confirmExit("https://www.servieduca.net/inicio")}
            style={styles.textCenter}
          >
            <FontAwesome5
              style={styles.icon}
              name="copyright"
              size={iconSize}
              color="#FFFFFF"
            />
            <Text style={styles.buttonText}>
              {year != "2022" ? `2022 - ${year} - ` : "2022 -"} SERVIEDUCA
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 125,
    width: 125,
    margin: "3%",
  },
  title: {
    fontSize: Dimensions.get("window").height * 0.025,
    color: "#FFFFFF",
    textAlign: "center",
  },
  subtitle: {
    fontSize: Dimensions.get("window").height * 0.02,
    color: "#F5F3F4",
    textAlign: "center",
  },
  textCenter: {
    color: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    width: "75%",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: Dimensions.get("window").height * 0.02,
  },
  icon: {
    margin: "2.5%",
  },
});
