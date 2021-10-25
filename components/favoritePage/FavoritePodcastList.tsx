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
import { connect } from "react-redux";
import {
  setPodcast,
  setRssUrl,
  setImageUrl,
  setStreamingUrl,
  setAuthors,
  setEpisodeName
} from "../../actions/podcastActions";
import {
    setFaveIdx, showFaveTranscript
} from '../../actions/userFavoritePodcastActions';

// export type Props = {
//   podcastNames: Array<PodcastInfoR>;
//   openPodcast: () => void;
//   selectPodcast: (idx: number) => void;
// };

const FavoritePodcastList = (props: any) => {
  const pressPodcast = (idx: number) => {
      if (props.favePodcastList !== undefined){
    props.setPodcast(props.favePodcastList[idx].allText);
    props.showFaveTranscript(true);
    props.setRssUrl(props.favePodcastList[idx].rss_url);
    props.setImageUrl(props.favePodcastList[idx].image_url);
    props.setStreamingUrl(props.favePodcastList[idx].streaming_url);
    props.setAuthors(props.favePodcastList[idx].authors);
    props.setEpisodeName(props.favePodcastList[idx].ep_name);
    props.setFaveIdx(idx);
      }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} testID="title">
        Your Favorite Podcasts
      </Text>
      <FlatList
        data={props.favePodcastList}
        testID="list"
        renderItem={({ item }) => (
          <TouchableHighlight
            underlayColor="#ccc"
            style={styles.touchable}
            onPress={() => pressPodcast(item.idx)}
          >
            <Text
              style={styles.textInside}
              testID={item.show_name + ": " + item.ep_name}
            >
              {item.show_name + ": " + item.ep_name}
            </Text>
          </TouchableHighlight>
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
    width: "100%"
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  title: {
    fontSize: 30,
    paddingBottom: 10,
    fontWeight: "bold",
    letterSpacing: 1,
    color: greenColors.deep
  },
  textInside: {
    fontSize: 20,
    //color: "#0074FF",
    color: "#FFFFFF"
  },
  touchable: {
    //borderColor: "#DEDEDE",
    backgroundColor: greenColors.deep,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    padding: 10,
    width: "100%"
  }
});

const mapStateToProps = (state: any) => {
  return {
    transcript: state.podcast.podcast,
    favePodcastList: state.favePodcasts.favoritePodcasts
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setFaveIdx: (idx: number) => dispatch(setFaveIdx(idx)),
    showFaveTranscript: (show: boolean) => dispatch(showFaveTranscript(show)),
    setPodcast: (podcast: any) => dispatch(setPodcast(podcast)),
    setRssUrl: (rss_url: any) => dispatch(setRssUrl(rss_url)),
    setImageUrl: (image_url: any) => dispatch(setImageUrl(image_url)),
    setStreamingUrl: (streaming_url: any) =>
      dispatch(setStreamingUrl(streaming_url)),
    setAuthors: (authors: any) => dispatch(setAuthors(authors)), 
    setEpisodeName: (ep: string) => dispatch(setEpisodeName(ep)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritePodcastList);
