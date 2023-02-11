import { StyleSheet, Dimensions, Animated, Easing } from "react-native";
import { useRef, useEffect } from "react";

//Gradient
import { LinearGradient } from "expo-linear-gradient";

export const SplashScreen = () => {
  const move = useRef(new Animated.Value(0)).current;
  const breathIn = Easing.out(Easing.sin);
  const breathOut = Easing.in(Easing.sin);
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(move, {
          toValue: 1,
          duration: 1500,
          easing: breathIn,
          useNativeDriver: true,
        }),
        Animated.timing(move, {
          toValue: 0,
          duration: 1500,
          easing: breathOut,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [move]);

  return (
    <LinearGradient
      colors={["#000042", "#0053B7"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Animated.Image
        style={[{ opacity: move }, styles.logo]}
        source={require("../assets/logo-urbe-blanco.png")}
      />
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: Dimensions.get("window").width * 0.85,
    width: Dimensions.get("window").width * 0.85,
  },
});
