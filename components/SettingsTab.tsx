import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableHighlight
} from "react-native";

import { greenColors } from "../constants/colors";
import {
  setVolumeEnabled,
  setSentimentEnabled,
  setPitchEnabled
} from "../actions/pageSetupActions";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const SettingsTab = (props: any) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        underlayColor="#ccc"
        style={styles.faveTouchable}
        onPress={() => {
          props.navigation.navigate("Language");
        }}
      >
        <View style={styles.languageButton}>
          <Text style={styles.label}>Language</Text>
          {/* <View style={styles.arrowButton}> */}
          <Ionicons
            name="arrow-forward-outline"
            size={30}
            color="black"
            style={styles.arrowButton}
          />
          {/* </View> */}
        </View>
      </TouchableHighlight>
      <View style={styles.switch}>
        <Text style={styles.label}>Volume Analysis</Text>
        <Switch
          trackColor={{ false: "#767577", true: greenColors.deep }}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => props.setVolumeEnabled(!props.volume)}
          value={props.volume}
        />
      </View>
      <View style={styles.switch}>
        <Text style={styles.label}>Sentiment Analysis</Text>
        <Switch
          trackColor={{ false: "#767577", true: greenColors.deep }}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => props.setSentimentEnabled(!props.sentiment)}
          value={props.sentiment}
        />
      </View>
      <View style={styles.switch}>
        <Text style={styles.label}>Pitch Analysis</Text>
        <Switch
          trackColor={{ false: "#767577", true: greenColors.deep }}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => props.setPitchEnabled(!props.pitch)}
          value={props.pitch}
        />
      </View>
      {/* <View style={styles.switch}>
        <Text style={styles.label}>Language</Text>
        <Ionicons name="arrow-forward-outline" size={24} color="black" />
      </View> */}
      <View style={styles.logoutButton}>
        <TouchableHighlight
          underlayColor="#ccc"
          onPress={() => props.navigation.navigate("Login")}
          style={styles.touchable}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  arrowButton: {
    paddingRight: 10
  },
  languageButton: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingTop: 10
  },
  container: {
    backgroundColor: greenColors.background,
    flex: 1
  },
  switch: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    backgroundColor: greenColors.background,
    paddingRight: 10
  },
  label: {
    fontSize: 20,
    paddingLeft: 10
  },
  touchable: {
    backgroundColor: greenColors.deep,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    alignItems: "center",
    width: "100%"
  },
  logoutButton: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    bottom: 0
  },
  logoutText: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    padding: 5
  }
});

const mapStateToProps = (state: any) => {
  return {
    volume: state.pageSetup.volumeEnabled,
    sentiment: state.pageSetup.sentimentEnabled,
    pitch: state.pageSetup.pitchEnabled
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setVolumeEnabled: (volume: boolean) => dispatch(setVolumeEnabled(volume)),
    setSentimentEnabled: (sentiment: boolean) =>
      dispatch(setSentimentEnabled(sentiment)),
    setPitchEnabled: (pitch: boolean) => dispatch(setPitchEnabled(pitch))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsTab);
