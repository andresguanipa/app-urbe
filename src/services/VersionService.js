import { Alert, Linking, Platform } from "react-native";
import Constants from "expo-constants";

//Get the latest version from servieduca.net depending of the platform
export const getLatestVersionService = async (isAndroid) => {
  //URL where the version is stored
  const apiURL = "https://www.servieduca.net/apps/urbe-movil.json";
  const requestOptions = { method: "GET" };
  try {
    let versionJson;
    const response = await fetch(`${apiURL}`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        versionJson = {
          version: isAndroid
            ? String(response.versionCode)
            : String(response.buildNumber),
          nextVersion: isAndroid
            ? String(response.nextVersion)
            : String(response.nextBuildNumber),
          active: response.active,
        };
      })
      .catch((error) => {
        alert(error);
      });
    return versionJson;
  } catch (error) {
    alert(error);
  }
};

export const getLatestVersion = async () => {
  //Asking the plataform
  const isAndroid = Platform.OS == "android";
  //URL link
  const linkURL = isAndroid
    ? "https://play.google.com/store/apps/details?id=com.servieduca.net"
    : "";

  //Get the app version from the current platform
  let appVersion = String(
    isAndroid
      ? Constants.manifest.android.versionCode
      : Constants.manifest.ios.buildNumber
  );

  const latestVersion = await getLatestVersionService(isAndroid);
  //This alert will show if the applications is not in the lastest version
  if (
    latestVersion.active &&
    appVersion !== latestVersion.version &&
    appVersion !== latestVersion.nextVersion
  ) {
    Alert.alert(
      "ACTUALIZACIÓN DISPONIBLE",
      "Se encontró una actualización de la aplicación.",
      [
        {
          text: "Actualizar",
          onPress: () => Linking.openURL(linkURL),
        },
      ]
    );
  }
};
