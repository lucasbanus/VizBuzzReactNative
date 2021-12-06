import Ionicons from "@expo/vector-icons/build/Ionicons";
import React from "react";
<<<<<<< HEAD
import i18n from "i18n-js";
import { View, StyleSheet, Text, Modal, TouchableHighlight } from "react-native";
=======
import {
  View,
  StyleSheet,
  Text,
  Modal,
  TextInput,
  TouchableHighlight
} from "react-native";
>>>>>>> 241b1515a35f485d1acd55b9f79c3e2612565efc
import { connect } from "react-redux";
import { setIsUploading } from "../../actions/pageSetupActions";
import { greenColors } from "../../constants/colors";

const UploadPodcast = (props: any) => {
<<<<<<< HEAD
    return (
        <Modal
        visible={props.isUploading}
        animationType="slide"
        style={styles.modalContainer}
        > 
        <Text>{i18n.t("browse")}</Text>
        <TouchableHighlight
=======
  return (
    <Modal
      visible={props.isUploading}
      animationType="slide"
      style={styles.modalContainer}
    >
      <View style={styles.overallView}>
        <View style={styles.topBar}>
          <TouchableHighlight
>>>>>>> 241b1515a35f485d1acd55b9f79c3e2612565efc
            underlayColor="#ccc"
            style={styles.touchable}
            onPress={() => {
              props.setIsUploading(false);
            }}
          >
            <Ionicons name="close-outline" size={50} color="white" />
            {/* <Text style={styles.closeText}> Close</Text> */}
          </TouchableHighlight>
          <Text style={styles.browseHeaderText}>Browse</Text>
        </View>
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            multiline={true}
            textAlignVertical="top"
            numberOfLines={3}
            // onChangeText={user => user}
            placeholder="RSS Link"
          ></TextInput>
          <TextInput
            style={styles.textInput}
            // onChangeText={user => user}
            placeholder="Episode Name"
          ></TextInput>
        </View>
      </View>
    </Modal>
    // <View style={styles.container}>
    //     <Text>Browse</Text>
    // </View>
  );
};

const styles = StyleSheet.create({
  browserButton: {
    display: "flex",
    flexDirection: "row"
  },
  container: {
    backgroundColor: greenColors.background,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: greenColors.background
  },
  touchable: {
    // width: "100%",
    // height: "100%",
    width: "10%",
    backgroundColor: greenColors.deep,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10
  },
  textInput: {
    width: "80%",
    backgroundColor: "white",
    margin: 10,
    height: 25,
    fontSize: 20,
    paddingLeft: 10
  },
  topBar: {
    paddingTop: 50,
    flexDirection: "row",
    width: "100%"
  },
  browseHeaderText: {
    fontSize: 24
  },
  overallView: {
    backgroundColor: greenColors.background
    // alignItems: "center",
    // justifyContent: "center"
    // width: "100%",
    // height: "100%"
  }
});

const mapStateToProps = (state: any) => {
  return {
    isUploading: state.pageSetup.isUploading
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setIsUploading: (bool: boolean) => dispatch(setIsUploading(bool))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadPodcast);
