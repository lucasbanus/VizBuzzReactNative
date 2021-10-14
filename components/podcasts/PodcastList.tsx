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
  showTranscript
} from "../../actions/pageSetupActions";
import { connect } from "react-redux";
import { setPodcast } from "../../actions/podcastActions";

// export type Props = {
//   podcastNames: Array<PodcastInfoR>;
//   openPodcast: () => void;
//   selectPodcast: (idx: number) => void;
// };

const PodcastList = (props: any) => {
  const pressPodcast = (idx: number) => {
    props.setPodcast(props.podcastList[idx].allText);
    props.showTranscript(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} testID="title">
        Your Podcasts
      </Text>
      <FlatList
        data={props.podcastList}
        testID="list"
        renderItem={({ item }) => (
          <TouchableHighlight
            underlayColor="#ccc"
            style={styles.touchable}
            onPress={() => pressPodcast(item.idx)}
          >
            <Text style={styles.textInside} testID={item.name}>
              {item.name}
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
    podcastList: state.pageSetup.podcastList
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setTranscriptIndex: (idx: number) => dispatch(setTranscriptIndex(idx)),
    showTranscript: (show: boolean) => dispatch(showTranscript(show)),
    setPodcast: (podcast: any) => dispatch(setPodcast(podcast))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PodcastList);
