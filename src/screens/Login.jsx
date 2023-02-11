import { useState, useContext } from "react";

//Componentes de React Native
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Alert,
  StatusBar,
  Platform,
  Dimensions,
  ActivityIndicator,
} from "react-native";

//Expo Components
import { LinearGradient } from "expo-linear-gradient";

//Components
import { TextButton } from "../components/buttons/TextButton";
import { Input } from "../components/inputs/Input";
import { PrimaryButton } from "../components/buttons/PrimaryButton";

//Services
import { loginService } from "../services/Queries";

//Context
import { AuthContext } from "../components/AuthContext";

//Buttons
const recoveryButton = {
  name: "Recuperar Contraseña",
  url: "https://recovery.urbe.edu/",
};
const companyButton = {
  name: "Powered By SERVIEDUCA",
  url: "https://www.servieduca.net/inicio",
};

export const Login = () => {
  const myContext = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const clearInputs = () => {
    setUsername("");
    setPassword("");
  };

  //Inputs
  const userInput = {
    iconColor: "black",
    iconName: "user-alt",
    maxLength: 8,
    onChangeText: setUsername,
    placeholder: "Usuario",
    showIcon: true,
    type: "number",
    value: username,
  };
  const passwordInput = {
    iconColor: "black",
    iconName: "lock",
    maxLength: 20,
    onChangeText: setPassword,
    placeholder: "Contraseña",
    showIcon: true,
    type: "password",
    value: password,
  };

  //Consulta de Login
  const handlePress = async () => {
    try {
      if (username === "" && password === "") {
        Alert.alert("LOGIN", "Ingrese su usuario y contraseña para ingresar");
      } else if (username === "") {
        Alert.alert("LOGIN", "Ingrese su usuario");
      } else if (password === "") {
        Alert.alert("LOGIN", "Ingrese su contraseña");
      } else {
        setIsLoading(true);
        const response = await loginService(username, password);
        setIsLoading(false);
        if (response == 200) {
          clearInputs();
          myContext.isSignedInFunction(true);
        } else if (response == 403) {
          Alert.alert("LOGIN", "Usuario o contraseña inválida");
        } else if (response == 404) {
          Alert.alert("LOGIN", "Hubo un error de conexión");
        }
      }
    } catch (error) {
      Alert.alert("LOGIN", "Hubo un error de conexión");
    }
  };

  //Access button
  const accessButton = {
    name: "INICIAR SESIÓN",
    function: handlePress,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#000042" />
      ) : (
        <View style={styles.container}>
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
              <Input item={userInput} />
              <Input item={passwordInput} />
              <TextButton item={recoveryButton} />
            </View>
            <View style={styles.bottomContent}>
              <PrimaryButton item={accessButton} />
              <TextButton item={companyButton} />
            </View>
          </LinearGradient>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomContent: {
    width: "100%",
    height: Dimensions.get("window").height * 0.2,
    justifyContent: "center",
    alignContent: "center",
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
  container: {
    flex: 1,
    justifyContent: "center",
  },
  gradient: {
    flex: 0.57,
    width: "100%",
  },
  logo: {
    width: "60%",
    overflow: "visible",
    resizeMode: "contain",
  },
  topContent: {
    width: "100%",
    flex: 0.43,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
