import Ionicons from "@expo/vector-icons/build/Ionicons";
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  TextInput,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";
import { setIsUploading } from "../../actions/pageSetupActions";
import { greenColors } from "../../constants/colors";

const PodcastSearchPage = (props: any) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          multiline={true}
          textAlignVertical="top"
          numberOfLines={3}
          // onChangeText={user => user}
          placeholder="Enter Podcast Name"
        ></TextInput>
        <TouchableHighlight
          underlayColor="#ccc"
          style={styles.searchButton}
          onPress={() => {
            // props.setIsUploading(true);
          }}
        >
          <View style={styles.searchIcon}>
            <Ionicons name="search" size={30} color="white" />
          </View>
        </TouchableHighlight>
      </View>
      <View>
        <TouchableHighlight
          underlayColor="#ccc"
          // style={styles.searchButton}
          onPress={() => {
            props.navigation.navigate("Browse Episodes");
            // props.setIsUploading(true);
          }}
        >
          <Ionicons name="arrow-forward-outline" size={30} color="black" />
        </TouchableHighlight>
      </View>
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
    backgroundColor: greenColors.background,
    paddingRight: 10
  },
  container: {
    backgroundColor: greenColors.background,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    // height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    backgroundColor: greenColors.background,
    paddingRight: 10
  },
  textInput: {
    width: "85%",
    backgroundColor: "white",
    margin: 10,
    height: 45,
    fontSize: 20,
    paddingLeft: 10
  },
  searchButton: {
    backgroundColor: greenColors.deep,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 10
  },
  searchIcon: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10
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

export default connect(mapStateToProps, mapDispatchToProps)(PodcastSearchPage);
