import React from "react";
import { useFonts } from "expo-font";
import * as Splashscreen from "expo-splash-screen";
import { useCallback } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./navigation/navigation";
import { AudioProvider, AudioContext } from "./context/audio_provider.js";

export default function App() {
  return (
    <AudioProvider>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </AudioProvider>
  );
}
