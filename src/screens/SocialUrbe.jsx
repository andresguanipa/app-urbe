//Componentes de React Native
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";

import { BigIconButton } from "../components/buttons/BigIconButton";

const iconsData = [
  {
    navigateTo: "https://www.facebook.com/infourbe/",
    iconName: "facebook",
    iconColor: "#3b5998",
    buttonText: "Facebook",
    isOniIcons: false,
  },
  {
    navigateTo: "https://www.twitter.com/infourbe",
    iconName: "twitter",
    iconColor: "#00ACEE",
    buttonText: "Twitter",
    isOniIcons: false,
  },
  {
    navigateTo: "https://www.youtube.com/c/infourbe2017",
    iconName: "youtube",
    iconColor: "#C4302B",
    buttonText: "Youtube",
    isOniIcons: false,
  },
  {
    navigateTo: "https://www.instagram.com/infourbe/?hl=es-la",
    iconName: "instagram",
    iconColor: "#C13584",
    buttonText: "Instagram",
    isOniIcons: false,
  },
];

export const SocialUrbe = () => {
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
  },
});
