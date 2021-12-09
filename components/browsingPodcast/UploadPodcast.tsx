import Ionicons from "@expo/vector-icons/build/Ionicons";
import React, { useState } from "react";
import i18n from "i18n-js";
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
import { primaryColors } from "../../constants/colors";
import {
  noMoreSearch,
  searchNewPodcast
} from "../../actions/podcastSearchActions";
import { getPodcastsFromItunes } from "../../dataManager/dataManager";
import { ItunesPodcastInfo } from "../../types/types";

const UploadPodcast = (props: any) => {
  const [searchString, setSearchString] = useState<string>("");
  if (props.shouldSearch) {
    getPodcastsFromItunes(props.searchString);
  }
  let pods = [];
  if (props.searchResults.length > 0) {
    pods = props.searchResults.map((pod: ItunesPodcastInfo) => {
      return (
        <View style={styles.podcastShowContainer}>
          <TouchableHighlight
            underlayColor="#ccc"
            style={styles.touchableClose}
            onPress={() => {}}
          >
            <Text>{pod.show_name}</Text>
          </TouchableHighlight>
        </View>
      );
    });
  }
  return (
    <Modal
      visible={props.isUploading}
      animationType="slide"
      style={styles.modalContainer}
    >
      <View style={styles.overallView}>
        <View style={styles.topBar}>
          <TouchableHighlight
            underlayColor="#ccc"
            style={styles.touchableClose}
            onPress={() => {
              props.setIsUploading(false);
            }}
          >
            <Ionicons name="close-outline" size={50} color="white" />
          </TouchableHighlight>
          <Text style={styles.browseHeaderText}>{i18n.t("browse")}</Text>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            multiline={true}
            textAlignVertical="top"
            numberOfLines={3}
            onChangeText={text => setSearchString(text)}
            defaultValue={searchString}
            placeholder={i18n.t("podcast_search_name")}
          ></TextInput>
          <TouchableHighlight
            underlayColor="#ccc"
            style={styles.touchableSearch}
            onPress={() => {
              props.newSearch(searchString);
              setSearchString("");
            }}
          >
            <Text style={styles.searchText}>{i18n.t("search_podcast")}</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight
          underlayColor="#ccc"
          onPress={() => {
            props.navigation.navigate("Browse Episodes");
          }}
        >
          <Ionicons name="arrow-forward-outline" size={30} color="black" />
        </TouchableHighlight>
        {pods}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  browserButton: {
    display: "flex",
    flexDirection: "row"
  },
  searchText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 25
  },
  podcastShowContainer: {
    width: "90%",
    backgroundColor: "white",
    margin: 5,
    height: "5%"
  },
  textInputContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "15%"
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: primaryColors.background
  },
  touchableClose: {
    width: "12%",
    backgroundColor: primaryColors.highlights,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10
  },
  touchableSearch: {
    width: "40%",
    height: "28%",
    backgroundColor: primaryColors.highlights,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10
  },
  textInput: {
    width: "80%",
    backgroundColor: "white",
    margin: 10,
    height: 45,
    fontSize: 25,
    paddingLeft: 10
  },
  topBar: {
    paddingTop: 50,
    flexDirection: "row",
    width: "100%",
    alignItems: "center"
  },
  browseHeaderText: {
    fontSize: 36,
    letterSpacing: 2,
    fontWeight: "bold",
    marginLeft: 10
  },
  overallView: {
    backgroundColor: primaryColors.background,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%"
  }
});

const mapStateToProps = (state: any) => {
  return {
    isUploading: state.pageSetup.isUploading,
    shouldSearch: state.podcastSearch.shouldSearch,
    searchString: state.podcastSearch.searchQuery,
    searchResults: state.podcastSearch.podcastSearchResults
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setIsUploading: (bool: boolean) => dispatch(setIsUploading(bool)),
    newSearch: (query: string) => dispatch(searchNewPodcast(query)),
    noMoreSearch: () => dispatch(noMoreSearch())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadPodcast);
