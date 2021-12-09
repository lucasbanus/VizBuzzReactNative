import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  FlatList,
  TouchableHighlight
} from "react-native";

import { primaryColors } from "../constants/colors";
import {
  setVolumeEnabled,
  setSentimentEnabled,
  setPitchEnabled,
  setLanguage
} from "../actions/pageSetupActions";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { languages_supported } from "../constants/strings";
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
  return (
    <View style={styles.container}>
      <FlatList
        data={languages_supported}
        keyExtractor={item => item.code}
        renderItem={({ item }) => (
          <SimpleSelectButton
            onPress={() => {
              // TODO show state in the global state
              props.setLanguage(item.code);
            }}
            isChecked={props.language === item.code}
            text={item.name}
            textSize={14}
            iconName="check"
            iconColor="#fff"
            iconSize={14}
            buttonDefaultColor="#737578"
            buttonSelectedColor={primaryColors.highlights}
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
    backgroundColor: primaryColors.background,
    flex: 1
  }
});

const mapStateToProps = (state: any) => {
  return {
    language: state.pageSetup.languageCode
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setLanguage: (lan: string) => dispatch(setLanguage(lan))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguagePage);
