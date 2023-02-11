import React, { useState, useEffect } from "react";
//React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./src/navigation/MainNavigator";
//Contexto global de autenticación
import { AuthContext } from "./src/components/AuthContext";
//Splash Screen
import { SplashScreen } from "./src/screens/SplashScreen";
//Latest version service
import { getLatestVersion } from "./src/services/VersionService";

export default function App() {
  //Global Variables
  const [isSplashVisible, setIsSplashisVisible] = useState(true);
  const [isSignedInValue, setIsSignedInValue] = useState(false);
  const isSignedInFunction = (props) => {
    props ? setIsSignedInValue(true) : setIsSignedInValue(false);
  };
  const userSettings = {
    isSignedIn: isSignedInValue,
    isSignedInFunction,
  };
  // useEffect(async () => {
  //   const splashTimeout = setTimeout(async () => {
  //     setIsSplashisVisible(false);
  //     await getLatestVersion(); //This function checks if the app is in the current or "next version" of the app.
  //   }, 4500);
  //   return () => clearTimeout(splashTimeout);
  // }, []);

  useEffect(() => {
    const splashTimeout = setTimeout(async () => {
      setIsSplashisVisible(false);
      await getLatestVersion(); //This function checks if the app is in the current or "next version" of the app.
    }, 2500);
    return () => clearTimeout(splashTimeout);
  }, []);

  return (
    <>
      {isSplashVisible === true ? (
        <SplashScreen />
      ) : (
        <AuthContext.Provider value={userSettings}>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </AuthContext.Provider>
      )}
    </>
  );
}
