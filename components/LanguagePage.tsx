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
import SimpleSelectButton from "react-native-simple-select-button";

const LanguagePage = (props: any) => {
  return (
    <View style={styles.container}>
      <Text>Language Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: greenColors.background,
    flex: 1
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

export default connect(mapStateToProps, mapDispatchToProps)(LanguagePage);
