import { StyleSheet, Text, Dimensions, Pressable } from "react-native";

//Icons
import { FontAwesome5 } from "@expo/vector-icons";

export const ProfileButton = ({ item, authorities }) => {
  const iconSize = Dimensions.get("window").height * 0.03;
  const arrowSize = iconSize * 0.7;
  const iconColor = "#98a49e";
  return (
    <>
      {authorities.includes(item.authority.toUpperCase()) ||
      item.authority == "everyone" ? (
        <Pressable style={styles.button} onPress={item.function}>
          <FontAwesome5
            style={styles.icon}
            name={item.iconName}
            size={iconSize}
            color={iconColor}
          />
          <Text style={styles.text}>{item.buttonText}</Text>
          <FontAwesome5
            style={styles.arrowIcon}
            name="arrow-right"
            size={arrowSize}
            color={iconColor}
          />
        </Pressable>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    flexDirection: "row",
    height: 70,
    paddingHorizontal: "5%",
    width: "100%",
  },
  text: {
    color: "#494949",
    flex: 8,
    fontSize: Dimensions.get("window").height * 0.0205,
    marginLeft: "10%",
  },
  icon: {
    flex: 1,
    textAlign: "center",
  },
  arrowIcon: {
    flex: 1,
    textAlign: "right",
  },
});
