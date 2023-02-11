//Navegador
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Navegadores
import { ProfileNavigator } from "./ProfileNavigator";
import { DrawerNavigator } from "./DrawerNavigator";

//Iconos
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
export const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="ProfileNavigator"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Perfil") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          } else if (route.name === "Servicios") {
            iconName = focused
              ? "ellipsis-horizontal"
              : "ellipsis-horizontal-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#000042",
        tabBarInactiveTintColor: "#98a49e",
      })}
    >
      <Tab.Screen
        name="Perfil"
        component={ProfileNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Servicios"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};
