import { View, StyleSheet } from "react-native";

//Navegador
import { DrawerContentScrollView } from "@react-navigation/drawer";

//Components
import { DrawerButton } from "../buttons/DrawerButton";

//Elemento que contiene el arreglo de botones. Es el Drawer como tal.
export const CustomDrawer = ({ props, drawerItems }) => (
  <DrawerContentScrollView {...props}>
    <View style={styles.menu}>
      {drawerItems.map((drawerItem) => {
        return (
          <DrawerButton
            key={drawerItem.buttonName.replace(" ", "")}
            item={drawerItem}
            props={props}
          />
        );
      })}
    </View>
  </DrawerContentScrollView>
);

const styles = StyleSheet.create({
  menu: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
