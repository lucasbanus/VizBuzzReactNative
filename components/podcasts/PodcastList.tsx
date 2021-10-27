import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableHighlight
} from "react-native";

import { PodcastInfo, PodcastInfoR } from "../../types/types";
import { greenColors } from "../../constants/colors";
import {
  setTranscriptIndex,
  showTranscript,
  favoriteClicked
} from "../../actions/pageSetupActions";
import { connect } from "react-redux";
import {
  setPodcast,
  setRssUrl,
  setImageUrl,
  setStreamingUrl,
  setAuthors,
  setEpisodeName
} from "../../actions/podcastActions";
import { addFavePodcast } from "../../actions/userFavoritePodcastActions";
import { Ionicons } from "@expo/vector-icons";
import { queryPodcast } from "../../dataManager/dataManager";

// export type Props = {
//   podcastNames: Array<PodcastInfoR>;
//   openPodcast: () => void;
//   selectPodcast: (idx: number) => void;
// };

const PodcastList = (props: any) => {
  let changeColor = true;
  const pressPodcast = (idx: number) => {
    queryPodcast(idx, props.podcastList[idx]);
    // props.showTranscript(true);
  };

  const addToFavorites = (idx: number) => {
    props.addFavorite(props.podcastList[idx]);
    props.setFave(true, idx);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} testID="title">
        All Podcasts
      </Text>
      <FlatList
        data={props.podcastList}
        testID="list"
        renderItem={({ item }) => (
          <View>
            <TouchableHighlight
              underlayColor="#ccc"
              style={styles.touchable}
              onPress={() => pressPodcast(item.idx)}
            >
              <View style={styles.browserButton}>
                <Text
                  style={styles.textInside}
                  testID={item.show_name + ": " + item.ep_name}
                >
                  {item.show_name + ": " + item.ep_name}
                </Text>
                <TouchableHighlight
                  underlayColor="#ccc"
                  style={styles.faveTouchable}
                  onPress={() => {
                    addToFavorites(item.idx);
                    // setState({});
                  }}
                >
                  <Ionicons
                    name="heart"
                    size={30}
                    color={item.isFave ? "#ff73bb" : "white"}
                  />
                </TouchableHighlight>
              </View>
            </TouchableHighlight>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: greenColors.background,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  title: {
    fontSize: 30,
    paddingBottom: 10,
    paddingTop: 10,
    fontWeight: "bold",
    letterSpacing: 1,
    color: greenColors.deep
  },
  textInside: {
    fontSize: 20,
    //color: "#0074FF",
    color: "#FFFFFF",
    width: "90%"
  },
  touchable: {
    //borderColor: "#DEDEDE",
    backgroundColor: greenColors.deep,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    padding: 10,
    width: "100%"
  },
  faveTouchable: {
    backgroundColor: greenColors.deep,
    // borderColor: "#FFFFFF",
    // borderWidth: 1,
    width: "10%",
    alignItems: "center",
    justifyContent: "center"
  },
  browserButton: {
    display: "flex",
    flexDirection: "row"
  }
});

const mapStateToProps = (state: any) => {
  return {
    transcript: state.podcast.podcast,
    podcastList: state.pageSetup.podcastList
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setTranscriptIndex: (idx: number) => dispatch(setTranscriptIndex(idx)),
    showTranscript: (show: boolean) => dispatch(showTranscript(show)),
    setPodcast: (podcast: any) => dispatch(setPodcast(podcast)),
    setRssUrl: (rss_url: any) => dispatch(setRssUrl(rss_url)),
    setImageUrl: (image_url: any) => dispatch(setImageUrl(image_url)),
    setStreamingUrl: (streaming_url: any) =>
      dispatch(setStreamingUrl(streaming_url)),
    setAuthors: (authors: any) => dispatch(setAuthors(authors)),
    setEpisodeName: (ep: string) => dispatch(setEpisodeName(ep)),
    addFavorite: (podcast: any) => dispatch(addFavePodcast(podcast)),
    setFave: (fave: boolean, idx: number) =>
      dispatch(favoriteClicked(fave, idx))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PodcastList);
