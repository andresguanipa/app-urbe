//Navegador
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Pantallas
import { Profile } from "../screens/Profile";
import { Schedule } from "../screens/Schedule";
import { Payments } from "../screens/Payments";
import { TeacherClassSchedule } from "../screens/TeacherClassSchedule";

//BORRAR
import { SplashScreen } from "../screens/SplashScreen";

//Navegadores
import { TermGradesNavigator } from "./TermGradesNavigator";
import { ProffesorNavigator } from "./ProffesorNavigator";

const screenOptionsStyles = {
  headerStyle: {
    backgroundColor: "#000042",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  headerTitleAlign: "center",
};

const Stack = createNativeStackNavigator();
export const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={screenOptionsStyles}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Schedule"
        component={Schedule}
        options={{ title: "HORARIO DE CLASES" }}
      />
      <Stack.Screen
        name="TermGradesNavigator"
        component={TermGradesNavigator}
        options={{ title: "CORTE DE NOTAS" }}
      />
      <Stack.Screen
        name="ProffesorNavigator"
        component={ProffesorNavigator}
        options={{ title: "PROFESORES" }}
      />
      <Stack.Screen
        name="Payments"
        component={Payments}
        options={{ title: "PAGOS" }}
      />
      <Stack.Screen
        name="TeacherClassSchedule"
        component={TeacherClassSchedule}
        options={{ title: "HORARIO DE CLASES PROFESOR" }}
      />
    </Stack.Navigator>
  );
};
