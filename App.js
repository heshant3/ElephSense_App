import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./Screen/Navigation";
import NetInfo from "@react-native-community/netinfo";
import * as SplashScreen from "expo-splash-screen";

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
    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    // Hide splash screen after 2 seconds
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);

    // Unsubscribe when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }
  return <Navigation />;
}

const styles = StyleSheet.create({});
