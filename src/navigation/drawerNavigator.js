//Navegador
import { createDrawerNavigator } from "@react-navigation/drawer";

//Pantallas
import { SocialUrbe } from "../screens/SocialUrbe";
import { Emergencies } from "../screens/Emergencies";
import { About } from "../screens/About";
import { News } from "../screens/News";
import { Events } from "../screens/Events";

//Components
import { CustomDrawer } from "../components/customNavigators/CustomDrawer";

//Screen Options Styles
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

const Drawer = createDrawerNavigator();

//Arreglo de elementos a mostrar dentro del navegador
const drawerItems = [
  {
    navigateTo: "Emergencies",
    iconName: "phone-alt",
    iconColor: "#002469",
    buttonName: "Emergencias",
    isOniIcons: false,
  },
  {
    navigateTo: "Events",
    iconName: "calendar-alt",
    iconColor: "#002469",
    buttonName: "Eventos",
    isOniIcons: false,
  },
  {
    navigateTo: "https://www.urbe.edu/universidad/sede.html",
    iconName: "map-marked",
    iconColor: "#002469",
    buttonName: "Mapas",
    isOniIcons: false,
  },
  {
    navigateTo: "News",
    iconName: "newspaper-outline",
    iconColor: "#002469",
    buttonName: "Noticias",
    isOniIcons: true,
  },
  {
    navigateTo: "https://www.urbe.edu/estudios/pregrado/",
    iconName: "graduation-cap",
    iconColor: "#002469",
    buttonName: "Oferta Académica Pregrado",
    isOniIcons: false,
  },
  {
    navigateTo: "https://www.urbe.edu/estudios/postgrado/",
    iconName: "graduation-cap",
    iconColor: "#002469",
    buttonName: "Oferta Académica Postgrado",
    isOniIcons: false,
  },
  {
    navigateTo: "https://radioshdstreaming.com/player/urbefm/",
    iconName: "radio",
    iconColor: "#002469",
    buttonName: "Radio URBE",
    isOniIcons: true,
  },
  {
    navigateTo: "SocialUrbe",
    iconName: "chatbubbles-sharp",
    iconColor: "#002469",
    buttonName: "Redes Sociales",
    isOniIcons: true,
  },
  {
    navigateTo: "About",
    iconName: "info",
    iconColor: "#002469",
    buttonName: "Acerca de",
    isOniIcons: false,
  },
];

//Drawer Navigator. Aquí se deben incluir las rutas con sus respectivas opciones.
export const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={screenOptionsStyles}
    drawerContent={(props) => (
      <CustomDrawer props={props} drawerItems={drawerItems} />
    )}
  >
    <Drawer.Screen
      name="SocialUrbe"
      component={SocialUrbe}
      options={{ drawerLabel: "Redes Sociales", title: "REDES SOCIALES" }}
    />
    <Drawer.Screen
      name="Emergencies"
      component={Emergencies}
      options={{ drawerLabel: "Emergencias", title: "EMERGENCIAS" }}
    />
    <Drawer.Screen
      name="About"
      component={About}
      options={{ drawerLabel: "Acerca de", title: "ACERCA DE" }}
    />
    <Drawer.Screen
      name="News"
      component={News}
      options={{ drawerLabel: "Noticias", title: "NOTICIAS" }}
    />
    <Drawer.Screen
      name="Events"
      component={Events}
      options={{ drawerLabel: "Eventos", title: "EVENTOS" }}
    />
  </Drawer.Navigator>
);
