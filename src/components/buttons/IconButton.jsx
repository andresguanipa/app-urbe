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
    isOniIcons: boolean
    iconColor: string
    buttonText: string
    whiteText: boolean
  }
*/
export const IconButton = ({ item, navigation }) => {
  const iconSize = Dimensions.get("window").height * 0.063;

  const searchFunction = (navigateTo) => {
    item.navigateTo.includes("http")
      ? confirmExit(navigateTo)
      : navigation.navigate(navigateTo);
  };

  return (
    <TouchableOpacity
      style={styles.touchableIcon}
      onPress={() => searchFunction(item.navigateTo)}
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
          onPress={() => searchFunction(item.navigateTo)}
          name={item.iconName}
          size={iconSize}
          color={item.iconColor}
        />
      )}
      <Text
        style={item.whiteText ? styles.tinyTextWhite : styles.tinyTextBlack}
      >
        {item.buttonText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableIcon: {
    width: "25%",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "1.5%",
  },
  icon: {
    alignSelf: "center",
  },
  tinyTextWhite: {
    color: "white",
    textAlign: "center",
    width: "100%",
    fontSize: Dimensions.get("window").height * 0.015,
  },
  tinyTextBlack: {
    color: "black",
    textAlign: "center",
    width: "100%",
    fontSize: Dimensions.get("window").height * 0.015,
  },
});
