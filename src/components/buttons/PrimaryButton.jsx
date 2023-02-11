import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";

/*
  Expected interface
  interface Button {
    name: string;
    //navigate: string;
    function: any;
  }
*/
export const PrimaryButton = ({ item }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={item.function}>
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "75%",
    height: Dimensions.get("window").height * 0.075,
    borderRadius: Dimensions.get("window").height * 0.1,
    backgroundColor: "#b31105",
    justifyContent: "center",
    alignContent: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: Dimensions.get("window").height * 0.018,
  },
});
