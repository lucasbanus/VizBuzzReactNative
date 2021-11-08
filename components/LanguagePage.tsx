import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  FlatList,
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
import i18n from "i18n-js";

const english_key = "1";
const spanish_key = "2";
const english_string = "English";
const english_code = "en-US";
const spanish_code = "es";
const spanish_string = "Spanish";

const changeLanguage = (choice: string) => {
  if (choice === english_key) {
    i18n.locale = english_code;
  }
  if (choice == spanish_key) {
    i18n.locale = spanish_code;
  }
  console.log("curr locale" + i18n.locale);
};

const LanguagePage = (props: any) => {
  // TODO enter default
  let def_lang = "";
  console.log("i18 locale: " + i18n.locale);
  if (i18n.locale == english_code) {
    def_lang = english_key;
  }
  if (i18n.locale == spanish_code) {
    def_lang = spanish_key;
  }
  console.log("Def " + def_lang);
  const [choice, setChoice] = React.useState<string>(def_lang);
  const languageOptions = [
    { label: english_string, value: "1" },
    { label: spanish_string, value: "2" }
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={languageOptions}
        keyExtractor={item => item.value}
        extraData={choice}
        renderItem={({ item }) => (
          <SimpleSelectButton
            onPress={() => {
              // TODO show state in the global state
              setChoice(item.value);
              changeLanguage(item.value);
            }}
            isChecked={choice === item.value}
            text={item.label}
            textSize={14}
            iconName="check"
            iconColor="#fff"
            iconSize={14}
            buttonDefaultColor="#737578"
            buttonSelectedColor={greenColors.deep}
            textDefaultColor="white"
            textSelectedColor="#fff"
          />
        )}
      />
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
    //     volume: state.pageSetup.volumeEnabled,
    //     sentiment: state.pageSetup.sentimentEnabled,
    //     pitch: state.pageSetup.pitchEnabled
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    //     setVolumeEnabled: (volume: boolean) => dispatch(setVolumeEnabled(volume)),
    //     setSentimentEnabled: (sentiment: boolean) =>
    //       dispatch(setSentimentEnabled(sentiment)),
    //     setPitchEnabled: (pitch: boolean) => dispatch(setPitchEnabled(pitch))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguagePage);
