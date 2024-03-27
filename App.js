import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./Screen/Navigation";
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

  if (!fontsLoaded) {
    return null;
  }
  return <Navigation />;
}

const styles = StyleSheet.create({});
