import React, { useState } from "react";
import { Audio } from "expo-av";
import {
  StyleSheet,
  Modal,
  Text,
  ScrollView,
  View,
  Button,
  TouchableHighlight,
  Image
} from "react-native";
import { buttonColors, greenColors } from "../../constants/colors";
import { WordContainer } from "../../types/types";
import {
  setTranscriptIndex,
  showTranscript
} from "../../actions/pageSetupActions";
import { connect } from "react-redux";
import TranscriptHeader from "./transcriptComp/TranscriptHeader";
import Player from "./transcriptComp/Player";

export type Props = {
  transcript: Array<WordContainer>;
  showTranscript: (show: boolean) => void;
  isTranscript: boolean;
  rss_url: string;
  image_url: string;
  streaming_url: string;
  authors: string;
};

const PodcastTranscript = (props: Props) => {
  Audio.setAudioModeAsync({
    allowsRecordingIOS: true,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    playsInSilentModeIOS: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    shouldDuckAndroid: true,
    staysActiveInBackground: true,
    playThroughEarpieceAndroid: true
  });
  const sound = new Audio.Sound();
  //sound.loadAsync(require('./test.mp3'));
  //http://commondatastorage.googleapis.com/codeskulptor-assets/week7-bounce.m4a
  sound.loadAsync({
    uri:
      "https://cdn.simplecast.com/audio/bceb3f91-afbb-4f97-87f6-5f4387bbb382/episodes/0190d6a8-fb48-4ee8-8a72-715e8ac1b4b1/audio/929445c3-f0e5-42db-9bc2-1e5c6338bef2/default_tc.mp3?aid=rss_feed&feed=c2RzTGta"
  }); // TODO replace with props.podcast.streaming_url
  const [playing, setPlaying] = useState(false);
  const play = () => {
    sound.playAsync();
    //setPlaying(true);
  };
  const pause = () => {
    sound.pauseAsync();
  };

  let button;

  if (playing) {
    button = (
      <Button
        title="Pause"
        onPress={() => {
          setPlaying(false);
          sound.pauseAsync();
        }}
      />
    );
  } else {
    button = (
      <Button
        title="Play"
        onPress={() => {
          setPlaying(true);
          sound.playAsync();
        }}
      />
    );
  }

  const allWords = props.transcript.map((word, idx) => {
    let wordComp;
    if (idx !== 0 && idx % 21 === 0) {
      wordComp = (
        <View key={"word" + idx} style={styles.timeStamp}>
          <Text style={{ ...styles.textArea, color: word.color }}>
            {word.word}
          </Text>
        </View>
      );
    } else {
      wordComp = (
        <Text
          key={"word" + idx}
          style={{ ...styles.textArea, color: word.color }}
        >
          {word.word}
        </Text>
      );
    }
    return wordComp;
  });
  return (
    <Modal
      visible={props.isTranscript}
      animationType="slide"
      style={styles.modalContainer}
    >
      <View style={styles.headerContainer}><TranscriptHeader/></View>
      <View style={styles.scrollContainer}>
        <ScrollView>
          <View style={styles.textTogether}>{allWords}</View>
        </ScrollView>
      </View>
      <View style={styles.playerContainer}><Player/></View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  headerContainer : {
    display: 'flex', 
    height: '18%',
    width: '100%', 
    backgroundColor: greenColors.background
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  scrollContainer: {
    width: "100%",
    height: "72%",
    paddingTop: 5,
    paddingHorizontal: 30
  },
  playerContainer :{
    width: "100%",
    height: "10%",
    backgroundColor: greenColors.background,
  },
  textArea: {
    fontSize: 25,
    textAlign: "center"
  },
  textTogether: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  timeStamp: {
    width: "100%"
  },
  touchable: {
    backgroundColor: buttonColors.closeButton,
    padding: 10,
    width: "100%"
  },
  tinyLogo: {
    width: 50,
    height: 50
  }
});

const mapStateToProps = (state: any) => {
  console.log("PodcastTranscriptR" + state.podcast.image_url);
  return {
    transcript: state.podcast.podcast,
    isTranscript: state.pageSetup.isShowingTranscript,
    rss_url: state.podcast.rss_url,
    image_url: state.podcast.image_url,
    streaming_url: state.podcast.streaming_url,
    authors: state.podcast.authors
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    showTranscript: (show: boolean) => dispatch(showTranscript(show))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PodcastTranscript);

//export default PodcastTranscript;
