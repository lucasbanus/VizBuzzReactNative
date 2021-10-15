import * as React from "react";
import { StyleSheet, Text, View, Switch } from "react-native";

import { greenColors } from "../constants/colors";
import {
  setAnalysisEnabled,
  setColorEnabled
} from "../actions/pageSetupActions";
import { connect } from "react-redux";

const SettingsTab = (props: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.switch}>
        <Text style={styles.label}>Analysis</Text>
        <Switch
          trackColor={{ false: "#767577", true: greenColors.deep }}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => props.setAnalysisEnabled(!props.analysis)}
          value={props.analysis}
        />
      </View>
      <View style={styles.switch}>
        <Text style={styles.label}>Color</Text>
        <Switch
          trackColor={{ false: "#767577", true: greenColors.deep }}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => props.setColorEnabled(!props.color)}
          value={props.color}
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
    analysis: state.pageSetup.analysisEnabled,
    color: state.pageSetup.colorEnabled
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setAnalysisEnabled: (analysis: boolean) =>
      dispatch(setAnalysisEnabled(analysis)),
    setColorEnabled: (color: boolean) => dispatch(setColorEnabled(color))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsTab);
