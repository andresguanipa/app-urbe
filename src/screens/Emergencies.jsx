//Componentes de React Native
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";

import { BigIconButton } from "../components/buttons/BigIconButton";

const iconsData = [
  {
    navigateTo: "tel:+5802612008720",
    iconName: "phone-square-alt",
    iconColor: "#534f4a",
    buttonText: "Servicios médicos",
    isOniIcons: false,
  },
  {
    navigateTo: "tel:+5802612008720",
    iconName: "phone-square-alt",
    iconColor: "#534f4a",
    buttonText: "Seguridad",
    isOniIcons: false,
  },
  {
    navigateTo: "tel:+5802612008703",
    iconName: "phone-square-alt",
    iconColor: "#534f4a",
    buttonText: "SHA",
    isOniIcons: false,
  },
  {
    navigateTo: "tel:+5802612008723",
    iconName: "phone-square-alt",
    iconColor: "#534f4a",
    buttonText: "Recepción",
    isOniIcons: false,
  },
];

export const Emergencies = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      {iconsData.map((icon) => {
        return (
          <BigIconButton key={icon.buttonText.toLowerCase()} item={icon} />
        );
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
});
