import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
} from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { BlurView } from "expo-blur";

const Analyses = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
        networkActivityIndicatorVisible={true}
      />
      <Image
        source={require("../assets/background.jpg")}
        style={[styles.image, StyleSheet.absoluteFillObject]}
      />
      <View style={styles.Head}>
        <Text style={styles.HeadText}>Analyses</Text>
      </View>
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <BlurView
          experimentalBlurMethod="dimezisBlurView"
          intensity={20}
          tint="systemChromeMaterial"
          style={styles.Box}
        >
          <Text style={styles.ChartName}>Body Temperature</Text>
        </BlurView>
      </View>
    </SafeAreaView>
  );
};

export default Analyses;

const styles = ScaledSheet.create({
  image: {
    alignSelf: "center",
    width: "100%",
    height: "100%",
  },
  Head: {
    height: "10%",
    paddingTop: 30,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },

  HeadText: {
    fontSize: "25@mvs",
    fontFamily: "Inter_600SemiBold",
    color: "#fff",
  },

  Box: {
    alignSelf: "center",
    overflow: "hidden",
    width: "80%",
    height: "24%",
    borderRadius: 20,
    borderColor: "#ffff",
    borderWidth: 1,
  },

  ChartName: {
    color: "white",
    fontFamily: "Inter_400Regular",
    fontSize: "20@mvs",
    padding: 10,
  },
});
