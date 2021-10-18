import * as React from "react";
import { StyleSheet, Text, View, Switch } from "react-native";

import { greenColors } from "../constants/colors";
import {
  setVolumeEnabled,
  setSentimentEnabled,
  setPitchEnabled
} from "../actions/pageSetupActions";
import { connect } from "react-redux";

const SettingsTab = (props: any) => {
  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: greenColors.background,
    flex: 1
  },
  switch: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    backgroundColor: greenColors.background
  },
  label: {
    fontSize: 20,
    paddingLeft: 10
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
