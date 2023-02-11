import { useEffect, useContext } from "react";

//Navegador
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabNavigator } from "./TabNavigator";

//Context
import { AuthContext } from "../components/AuthContext";

//AsyncStorage
import { getData } from "../asyncStorage/AsyncStorage";

//Pantallas
import { Index } from "../screens/Index";
import { Login } from "../screens/Login";
import { Emergencies } from "../screens/Emergencies";
import { SocialUrbe } from "../screens/SocialUrbe";
import { News } from "../screens/News";
import { Events } from "../screens/Events";
//Importar eventos

const screenOptionsStyles = {
  headerStyle: {
    backgroundColor: "#000042",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
  headerTitleAlign: "center",
};

const Stack = createNativeStackNavigator();

export const MainNavigator = () => {
  useEffect(() => {
    const fetchRequest = async () => {
      await checkLogin();
    };
    fetchRequest();
  }, []);

  const checkLogin = async () => {
    let aux = await getData();
    if (aux == null || aux == undefined) {
      myContext.isSignedInFunction(false);
    } else {
      myContext.isSignedInFunction(true);
    }
  };

  const myContext = useContext(AuthContext);

  return myContext.isSignedIn ? (
    <Stack.Navigator screenOptions={screenOptionsStyles}>
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator screenOptions={screenOptionsStyles}>
      <Stack.Screen
        name="Index"
        component={Index}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Emergencies"
        component={Emergencies}
        options={{ title: "EMERGENCIA" }}
      />
      <Stack.Screen
        name="SocialUrbe"
        component={SocialUrbe}
        options={{ title: "SOCIAL URBE" }}
      />
      <Stack.Screen
        name="News"
        component={News}
        options={{ title: "NOTICIAS" }}
      />
      <Stack.Screen
        name="Events"
        component={Events}
        options={{ title: "EVENTOS" }}
      />
    </Stack.Navigator>
  );
};
