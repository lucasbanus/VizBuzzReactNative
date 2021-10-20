import React, { useState } from "react";
import { Audio } from "expo-av";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,} from "react-native";
import { buttonColors, greenColors } from "../../../constants/colors";
import { WordContainer } from "../../../types/types";
import {
  setTranscriptIndex,
  showTranscript
} from "../../../actions/pageSetupActions";
import { connect } from "react-redux";
import { changePageSetup } from "../../../reducers/pageSetupReducer";

export type Props = {
  transcript: Array<WordContainer>;
  showTranscript: (show: boolean) => void;
  isTranscript: boolean;
  rss_url: string;
  image_url: string;
  streaming_url: string;
  authors: string;
};

export const sound = new Audio.Sound();
//sound.loadAsync(require('./test.mp3'));
//http://commondatastorage.googleapis.com/codeskulptor-assets/week7-bounce.m4a
sound.loadAsync({
  uri:
    "https://cdn.simplecast.com/audio/bceb3f91-afbb-4f97-87f6-5f4387bbb382/episodes/0190d6a8-fb48-4ee8-8a72-715e8ac1b4b1/audio/929445c3-f0e5-42db-9bc2-1e5c6338bef2/default_tc.mp3?aid=rss_feed&feed=c2RzTGta"
}); // TODO replace with props.podcast.streaming_url

const Player = (props: Props) => {
    const [playing, setPlaying] = useState(false);
    Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true
      });

      const play = () => {
        sound.playAsync();
        setPlaying(true);
      };
      const pause = async () => {
        sound.pauseAsync();
        setPlaying(false);
      };

  return (
    <View style={styles.container}>
        <TouchableHighlight
            underlayColor="#ccc"
            style={styles.player}
            onPress={playing ? () => pause() : () => play()}
        > 
            <Text style={styles.playerText}> {playing ? 'Pause' : 'Play'}</Text>
        </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
    container : {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%', 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    playerText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    player: {
        backgroundColor: greenColors.deep,
        width: '25%', 
        height: '40%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const mapStateToProps = (state: any) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(Player);

//export default PodcastTranscript;
