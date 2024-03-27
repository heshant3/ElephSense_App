import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { ref, onValue } from "firebase/database";
import { db } from "../config";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [Temperature, setTemperature] = useState(null);
  const [HeartPulse, setHeartPulse] = useState(null);
  const [SoundWave, setSoundWave] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const TemperatureRef = ref(db, "Temperature");
    const HeartPulseRef = ref(db, "HeartPulse");
    const SoundWaveRef = ref(db, "SoundWave");

    onValue(TemperatureRef, (snapshot) => {
      const data = snapshot.val();
      setTemperature(data);
      setLoading(false);
    });

    onValue(HeartPulseRef, (snapshot) => {
      const data = snapshot.val();
      setHeartPulse(data);
    });

    onValue(SoundWaveRef, (snapshot) => {
      const data = snapshot.val();
      setSoundWave(data);
    });
  }, []);

  const navigation = useNavigation();

  const navigateToHomePage = () => {
    // Navigate to the home page
    navigation.navigate("Analyses");
  };

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
        <Text style={styles.HeadText}>Home</Text>
        <MaterialCommunityIcons
          name="elephant"
          size={30}
          color="#fff"
          onPress={navigateToHomePage}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          paddingRight: 30,
        }}
      >
        <View style={styles.Content1}>
          <Ionicons name="thermometer-outline" size={30} color="#fff" />
          <Text style={styles.TextName}>Body</Text>
          <Text style={styles.TextName}>Temperature</Text>
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#fff"
              style={{ marginTop: 20 }}
            />
          ) : (
            <>
              <Text style={styles.TextValue}>
                {Temperature}
                <Text style={styles.UnitText1}>°C</Text>
              </Text>
            </>
          )}
        </View>

        <View style={styles.Content1}>
          <Ionicons name="pulse-outline" size={30} color="#fff" />
          <Text style={styles.TextName}>Heart Pulse</Text>
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#fff"
              style={{ marginTop: 20 }}
            />
          ) : (
            <>
              <Text style={styles.TextValue}>
                {HeartPulse}
                <Text style={styles.UnitText2}> bpm</Text>
              </Text>
            </>
          )}
        </View>

        <View style={styles.Content1}>
          <MaterialCommunityIcons name="waveform" size={30} color="#fff" />
          <Text style={styles.TextName}>Sound Wave</Text>
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#fff"
              style={{ marginTop: 20 }}
            />
          ) : (
            <>
              <Text style={styles.TextValue}>
                {SoundWave} <Text style={styles.UnitText3}>dB</Text>
              </Text>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = ScaledSheet.create({
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
  image: {
    alignSelf: "center",
    width: "100%",
    height: "100%",
  },
  Content1: {
    alignItems: "flex-end",
    marginBottom: 50,
  },

  TextName: {
    color: "white",
    fontFamily: "Inter_400Regular",
    fontSize: "20@mvs",
    marginBottom: -9,
  },

  TextValue: {
    marginTop: 10,
    color: "white",
    fontFamily: "Inter_600SemiBold",
    fontSize: "49@mvs",
  },

  UnitText1: {
    color: "white",
    fontFamily: "Inter_400Regular",
    fontSize: "49@mvs",
  },

  UnitText2: {
    color: "white",
    fontFamily: "Inter_400Regular",
    fontSize: "25@mvs",
  },

  UnitText3: {
    color: "white",
    fontFamily: "Inter_400Regular",
    fontSize: "35@mvs",
  },
});
