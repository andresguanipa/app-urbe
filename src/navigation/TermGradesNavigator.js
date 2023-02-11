//Navigator
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screens
import { TermGrades } from "../screens/TermGrades";
import { TeacherEvaluation } from "../screens/TeacherEvaluation";

//Styles
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
export const TermGradesNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="TermGrades"
      screenOptions={screenOptionsStyles}
    >
      <Stack.Screen
        name="TermGrades"
        component={TermGrades}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TeacherEvaluation"
        component={TeacherEvaluation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
