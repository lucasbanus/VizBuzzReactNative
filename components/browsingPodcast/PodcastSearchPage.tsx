import Ionicons from "@expo/vector-icons/build/Ionicons";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  TextInput,
  TouchableHighlight
} from "react-native";
import i18n from "i18n-js";
import { connect } from "react-redux";
import { setIsUploading } from "../../actions/pageSetupActions";
import {
  searchNewPodcast,
  noMoreSearch,
  setLoadingEpisodes
} from "../../actions/podcastSearchActions";
import { primaryColors } from "../../constants/colors";
import {
  getEpisodesInfo,
  getPodcastsFromItunes
} from "../../dataManager/dataManager";
import { ItunesPodcastInfo } from "../../types/types";
import { ScrollView } from "react-native-gesture-handler";

const PodcastSearchPage = (props: any) => {
  const [searchString, setSearchString] = useState<string>("");
  if (props.shouldSearch) {
    getPodcastsFromItunes(props.searchString);
  }
  let pods = [];
  if (props.searchResults.length > 0) {
    pods = props.searchResults.map((pod: ItunesPodcastInfo, idx: number) => {
      return (
        <View
          style={styles.podcastShowContainer}
          key={pod.show_name + idx.toString()}
        >
          <TouchableHighlight
            underlayColor="#ccc"
            onPress={() => {
              props.setLoadingEpisodes(true);
              // set the approriate podcast to look the episodes up
              getEpisodesInfo(pod.rss_url, pod.show_name);
              // navigator go to the next page
              props.navigation.navigate("Browse Episodes", {
                name: i18n.t("browse_episodes")
              });
            }}
            style={styles.podcastTouchable}
          >
            <View style={styles.podcastTouchableContentContainer}>
              <View style={styles.podcastShowTextContainer}>
                <Text
                  style={styles.titleText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {pod.show_name}
                </Text>
                <Text style={styles.artistText}>{pod.artist}</Text>
              </View>
              <Ionicons name="arrow-forward-outline" size={35} color="white" />
            </View>
          </TouchableHighlight>
        </View>
      );
    });
  }
  return (
    <View style={styles.modalContainer}>
      <View style={styles.overallView}>
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
            style={styles.searchButton}
            onPress={() => {
              props.newSearch(searchString);
              setSearchString("");
            }}
          >
            <View style={styles.searchIcon}>
              <Ionicons name="search" size={30} color="white" />
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.podcastListContainer}>
          <ScrollView style={{ height: "100%" }}>{pods}</ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: primaryColors.background,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    paddingTop: 10,
    paddingRight: 10
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: primaryColors.background,
    height: "100%"
  },
  container: {
    backgroundColor: primaryColors.background,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexDirection: "row",
    paddingTop: 10,
    paddingRight: 10
  },
  searchButton: {
    backgroundColor: primaryColors.highlights,
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
  },
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
    backgroundColor: primaryColors.highlights,
    margin: 5,
    height: 100,
    borderRadius: 10
  },
  textInputContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "12%",
    display: "flex",
    flexDirection: "row"
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
    backgroundColor: primaryColors.textInput,
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
  },
  podcastListContainer: {
    height: "80%",
    width: "90%"
  },
  podcastTouchable: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    fontSize: 27,
    letterSpacing: 2,
    overflow: "hidden",
    height: "60%",
    paddingTop: 10,
    color: "white"
  },
  authorsText: {
    fontSize: 27,
    letterSpacing: 2,
    overflow: "hidden",
    height: "60%",
    paddingTop: 10,
    color: "white"
  },
  artistText: {
    height: "40%",
    fontSize: 20,
    color: "white"
  },
  podcastShowTextContainer: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    justifyContent: "center",
    alignContent: "center",
    textAlignVertical: "bottom"
  },
  podcastTouchableContentContainer: {
    textAlignVertical: "center",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row"
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
    noMoreSearch: () => dispatch(noMoreSearch()),
    setLoadingEpisodes: (bool: boolean) => dispatch(setLoadingEpisodes(bool))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PodcastSearchPage);
