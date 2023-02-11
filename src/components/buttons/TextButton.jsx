import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";

import { confirmExit } from "../../../utils";
/*
  Expected interface
  interface Icon {
    name: string
    url: string
  }
*/
export const TextButton = ({ item }) => {
  return (
    <TouchableOpacity
      onPress={() => confirmExit(item.url)} //Linking.openURL(item.url)}
      style={styles.button}
    >
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "5%",
    width: "75%",
  },
  text: {
    color: "white",
    fontSize: Dimensions.get("window").height * 0.02,
    textAlign: "center",
  },
});
