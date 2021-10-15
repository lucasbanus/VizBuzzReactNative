import * as React from "react";
import { StyleSheet, Text, View, Switch } from "react-native";

import { useState } from "react";
import { greenColors } from "../constants/colors";
// import { connect } from "tls";

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

// needed when we start using redux
const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (state: any) => {
  return {};
};

export default SettingsTab;
// export default connect(mapStateToProps, mapDispatchToProps)(SettingsTab);
