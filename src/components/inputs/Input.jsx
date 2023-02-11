//React Native
import {
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";

//Iconos
import { FontAwesome5 } from "@expo/vector-icons";

/*
  interface Input {
    showIcon: boolean | null;
    iconName: string | null;
    iconColor: string | null;
    type: string; //text | number | password | email | phone
    placeholder: string;
    maxLength: number;
    onChangeText: any; // setValue
    value: any; // value
  }
  StatusBar
*/
export const Input = ({ item }) => {
  const [hideText, setHideText] = useState(false);
  const [type, setType] = useState("default");
  const iconSize = Dimensions.get("window").height * 0.022;

  useEffect(() => {
    setKeyboardType();
  }, []);

  const toggleTextVisiblity = () => {
    setHideText(hideText ? false : true);
  };

  const setKeyboardType = () => {
    const keyboardType = item.type;
    keyboardType === "password" ? setHideText(true) : null;
    keyboardType === "number" ? setType("numeric") : null;
    keyboardType === "email" ? setType("email-address") : null;
    keyboardType === "phone" ? setType("phone-pad") : null;
  };

  return (
    <View style={styles.inputSection}>
      {item.showIcon ? (
        <FontAwesome5
          style={styles.inputIconLeft}
          name={item.iconName}
          size={iconSize}
          color={item.iconColor}
        />
      ) : null}
      <TextInput
        style={styles.input}
        autoCorrect={false}
        placeholder={item.placeholder}
        secureTextEntry={hideText}
        keyboardType={type}
        maxLength={item.maxLength}
        onChangeText={item.onChangeText}
        value={item.value}
      />
      {item.type === "password" ? (
        <TouchableOpacity
          onPress={toggleTextVisiblity}
          style={styles.inputIconRight}
        >
          <FontAwesome5
            name={hideText ? "eye-slash" : "eye"}
            size={iconSize}
            color={item.iconColor}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  gradient: {
    flex: 0.57,
    width: "100%",
  },
  topContent: {
    width: "100%",
    flex: 0.43,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  centerContent: {
    paddingTop: "15%",
    width: "100%",
    height: Dimensions.get("window").height * 0.37,
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center",
  },
  bottomContent: {
    width: "100%",
    height: Dimensions.get("window").height * 0.2,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "60%",
    overflow: "visible",
    resizeMode: "contain",
  },
  inputSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "75%",
    height: Dimensions.get("window").height * 0.082,
    borderRadius: Dimensions.get("window").height * 0.1,
    paddingLeft: "5%",
  },
  textCenter: {
    flexDirection: "row",
    alignItems: "center",
    width: "75%",
    justifyContent: "center",
  },
  inputIconLeft: {
    width: "10%",
  },
  input: {
    height: "100%",
    width: "70%",
    fontSize: Dimensions.get("window").height * 0.02,
  },
  inputIconRight: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: Dimensions.get("window").height * 0.1,
    borderTopRightRadius: Dimensions.get("window").height * 0.1,
  },
  tinyText: {
    color: "white",
    textAlign: "right",
    fontSize: 12,
    marginRight: "15%",
  },
  button: {
    width: "75%",
    height: Dimensions.get("window").height * 0.08,
    borderRadius: Dimensions.get("window").height * 0.1,
    backgroundColor: "#b31105",
    justifyContent: "center",
    alignContent: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: Dimensions.get("window").height * 0.018,
  },
  buttonTextCenter: {
    marginTop: "5%",
    flexDirection: "row",
    alignItems: "center",
    width: "75%",
    justifyContent: "center",
  },
});
