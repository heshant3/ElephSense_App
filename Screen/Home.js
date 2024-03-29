import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { ref, onValue } from "firebase/database";
import { db } from "../config";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [Temperature, setTemperature] = useState(null);
  const [HeartPulse, setHeartPulse] = useState(null);
  const [SoundWave, setSoundWave] = useState(null);
  const [Alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const TemperatureRef = ref(db, "Temperature");
    const HeartPulseRef = ref(db, "HeartPulse");
    const SoundWaveRef = ref(db, "SoundWave");
    const AlertRef = ref(db, "Alert");

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

    onValue(AlertRef, (snapshot) => {
      const data = snapshot.val();
      setAlert(data);

      if (data === 1 && !modalVisible) {
        setModalVisible(true);
      }
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

      {/*  Alert Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={styles.centeredView}
          onTouchEnd={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modalView}>
            <Feather name="alert-triangle" size={24} color="#ff5866" />
            <Text style={styles.Text}>"High frequency detected"</Text>
          </View>
        </View>
      </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalView: {
    // flexDirection: "row",
    height: "12%",
    width: "80%",
    overflow: "hidden",
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderWidth: 1.5,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  Text: {
    fontSize: "20@mvs",
    fontFamily: "Inter_600SemiBold",
    color: "#595959",
  },
});
