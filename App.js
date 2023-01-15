import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./components/Router";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [user, setUser] = useState(null);
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Italic": require("./assets/fonts/Roboto-Italic.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  onAuthStateChanged(auth, (user) => {
    console.log(user);
    setUser(user);
  });

  const routing = useRoute(user);

  return (
    <Provider store={store}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <NavigationContainer>{routing}</NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
