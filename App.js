import { StyleSheet, Text, View } from "react-native";
import Navigation from "./Screen/Navigation";
import * as SplashScreen from "expo-splash-screen";
import React, { useState, useEffect } from "react";

SplashScreen.preventAutoHideAsync();
import {
  useFonts,
  Inter_600SemiBold,
  Inter_300Light,
  Inter_500Medium,
  Inter_400Regular,
} from "@expo-google-fonts/inter";

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_600SemiBold,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
  });

  useEffect(() => {
    // Hide splash screen after 2 seconds
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);

    // Unsubscribe when the component unmounts
  }, []);

  if (!fontsLoaded) {
    return null;
  }
  return <Navigation />;
}

const styles = StyleSheet.create({});
