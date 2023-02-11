//Navegador
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Pantallas
import { Teachers } from "../screens/Teachers";
import { TeacherSchedule } from "../screens/TeacherSchedule";

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
export const ProffesorNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Teachers"
      screenOptions={screenOptionsStyles}
    >
      <Stack.Screen
        name="Teachers"
        component={Teachers}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TeacherSchedule"
        component={TeacherSchedule}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
