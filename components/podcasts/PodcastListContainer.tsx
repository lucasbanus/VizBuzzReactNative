import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  unstable_batchedUpdates
} from "react-native";
import { useState, useEffect } from "react";
import PodcastList from "./PodcastList";
import PodcastTranscript from "./PodcastTranscript";
import PodcastTranscriptR from './PodcastTranscriptR';
import {getPodcastsInitialWrapper, parseRssWrapper, getPodcastsInitialWrapper2, getPodcastsInitialWrapperR} from "../../dataManager/dataManager";
import {greenColors} from '../../constants/colors';

import { PodcastItems, PodcastInfo, PodcastInfo2, PodcastInfoR } from "../../types/types";

// TODO For rigged demo: retrieving json from local data
const localData = require("./data.json");

export default function PodcastListContainer(): React.ReactElement {
  const [isTranscript, setTranscript] = useState(false);
  const [podcastNames, setPodcastNames] = useState<PodcastInfo[] | []>([]);
  const [podcastNames2, setPodcastNames2] = useState<PodcastInfo2[] | []>([]);
  const [currentPodcast, setCurrentPodcast] = useState(0);

  const [podcastNamesR, setPodcastNamesR] = useState<PodcastInfoR[] | []>([]);

  const closePodcast = () => {
    setTranscript(false);
  };

  const openPodcast = () => {
    setTranscript(true);
  };

  //get the rss parsing
  // parseRssWrapper();

  // get the initial podcasts 
  //getPodcastsInitialWrapper(setPodcastNames);

  // trial second
  //getPodcastsInitialWrapper2();
  //getPodcastsInitialWrapper2(setPodcastNames);
  getPodcastsInitialWrapperR(setPodcastNamesR);

  let mainComponent;
  if (isTranscript) {
    mainComponent = (
      <PodcastTranscriptR
        transcript={podcastNamesR[currentPodcast].allText}
        visible={isTranscript}
        closePodcast={closePodcast}
      />
    );
  } else {
    mainComponent = (
      <PodcastList
        podcastNames={podcastNamesR}
        openPodcast={openPodcast}
        selectPodcast={setCurrentPodcast}
      />
    );
  }

  return <View style={styles.container}>{mainComponent}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: greenColors.background,
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  }
});
