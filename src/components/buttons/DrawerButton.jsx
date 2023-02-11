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
    buttonName: string
    isOniIcons: boolean
  },
*/
const iconSize = Dimensions.get("window").height * 0.038;

export const DrawerButton = ({ item, props }) => {
  const searchFunction = (navigateTo) => {
    item.navigateTo.includes("http")
      ? confirmExit(navigateTo)
      : item.navigateTo.includes("tel:")
      ? confirmExit(navigateTo)
      : props.navigation.navigate(navigateTo);
  };

  return (
    <TouchableOpacity
      style={styles.button}
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
      <Text style={styles.text}>{item.buttonName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginVertical: "5%",
    paddingHorizontal: "5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  text: {
    flex: 0.8,
    fontSize: Dimensions.get("window").height * 0.021,
    fontWeight: "bold",
    marginLeft: "10%",
    color: "#002469",
  },
  icon: {
    flex: 0.2,
    textAlign: "center",
  },
});
