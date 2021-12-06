import Ionicons from "@expo/vector-icons/build/Ionicons";
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";
// import { setIsUploading } from "../../actions/pageSetupActions";
import { greenColors } from "../../constants/colors";

const BrowseEpisodesPage = (props: any) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.text}>Episodes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: greenColors.background,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    // justifyContent: "space-between",
    paddingTop: 10,
    paddingRight: 10
  },
  text: {
    fontSize: 30,
    paddingBottom: 10,
    paddingTop: 10,
    fontWeight: "bold",
    letterSpacing: 1,
    color: greenColors.deep
  }
});

const mapStateToProps = (state: any) => {
  return {
    // isUploading: state.pageSetup.isUploading
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    // setIsUploading: (bool: boolean) => dispatch(setIsUploading(bool))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowseEpisodesPage);
