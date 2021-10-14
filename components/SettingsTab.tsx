import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableHighlight,
  Switch
} from "react-native";

import { useState } from "react";
import { greenColors } from "../constants/colors";

const SettingsTab = (props: any) => {
  const [analysisIsEnabled, setAnalysisIsEnabled] = useState(false);
  const analysisToggleSwitch = () =>
    setAnalysisIsEnabled(previousState => !previousState);

  const [fontIsEnabled, setFontisIsEnabled] = useState(false);
  const fontToggleSwitch = () =>
    setFontisIsEnabled(previousState => !previousState);

  return (
    <View>
      <View style={styles.switch}>
        <Text style={styles.label}>Analysis</Text>
        <Switch
          trackColor={{ false: "#767577", true: greenColors.deep }}
          ios_backgroundColor="#3e3e3e"
          onValueChange={analysisToggleSwitch}
          value={analysisIsEnabled}
        />
      </View>
      <View style={styles.switch}>
        <Text style={styles.label}>Font</Text>
        <Switch
          trackColor={{ false: "#767577", true: greenColors.deep }}
          ios_backgroundColor="#3e3e3e"
          onValueChange={fontToggleSwitch}
          value={fontIsEnabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: greenColors.background
    // alignItems: "center",
    // justifyContent: "center",
    // width: "100%"
  },
  switch: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    backgroundColor: greenColors.background
  },
  label: {
    fontSize: 20
  }
});

export default SettingsTab;
