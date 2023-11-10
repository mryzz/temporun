import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import * as Splashscreen from "expo-splash-screen";
import { useCallback } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import Home from "./screens/home";

export default function App() {
  return (
    <>
      <Home />
    </>
  );
}
