import React from "react";
import { useFonts } from "expo-font";
import * as Splashscreen from "expo-splash-screen";
import { useCallback } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./navigation/navigation";
import colorTheme from "./misc/color_theme";
const { LightTheme } = adaptNavigationTheme({
  reactNavigationLight: DefaultTheme,
});

const theme = {
  backgroundColor: colorTheme.colors.primaryContainer,
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={LightTheme}>
        <Navigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
