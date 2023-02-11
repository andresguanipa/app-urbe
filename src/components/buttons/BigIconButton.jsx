import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";

//Iconos
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { confirmExit } from "../../../utils";
/*
  Expected interface
  interface Icon {
    navigateTo: string
    iconName: string
    iconColor: string
    buttonText: string
    isOniIcons: boolean
  }
*/

const iconSize = Dimensions.get("window").height * 0.075;

export const BigIconButton = ({ item, navigation }) => {
  const searchFunction = (navigateTo) => {
    item.navigateTo.includes("http")
      ? confirmExit(navigateTo)
      : item.navigateTo.includes("tel:")
      ? confirmExit(navigateTo)
      : navigation.navigate(navigateTo);
  };

  return (
    <TouchableOpacity
      style={styles.box}
      onPress={() => {
        searchFunction(item.navigateTo);
      }}
    >
      {item.isOniIcons ? (
        <Ionicons
          style={styles.icon}
          name={item.iconName}
          size={iconSize}
          color={item.iconColor}
        />
      ) : (
        <FontAwesome5
          style={styles.icon}
          name={item.iconName}
          size={iconSize}
          color={item.iconColor}
        />
      )}
      <Text style={styles.text}>{item.buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    width: Dimensions.get("window").width * 0.5,
    height: "50%",
    alignContent: "space-around",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#98a49e",
    borderWidth: 1,
  },
  icon: {
    margin: 5,
  },
  text: {
    margin: 5,
    textAlign: "center",
    color: "black",
    fontSize: Dimensions.get("window").height * 0.018,
  },
});
