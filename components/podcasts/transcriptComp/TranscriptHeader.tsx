import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  ScrollView
} from "react-native";
import { greenColors } from "../../../constants/colors";
import { WordContainer } from "../../../types/types";
import { showTranscript} from "../../../actions/pageSetupActions";
import { connect } from "react-redux";
import {sound} from './Player';
import { showFaveTranscript } from "../../../actions/userFavoritePodcastActions";

export type Props = {
  transcript: Array<WordContainer>;
  showTranscript: (show: boolean) => void;
  showFaveTranscript: (show : boolean) => void;
  isTranscript: boolean;
  rss_url: string;
  image_url: string;
  streaming_url: string;
  authors: string;
  ep_name: string;
};

const TranscriptHeader = (props: Props) => {
    //{uri: require('./trial.jpg')}
    //https://image.simplecastcdn.com/images/bceb3f91-afbb-4f97-87f6-5f4387bbb382/e54a95a4-3e6f-4471-8e41-3684c52d2f2e/3000x3000/d6e900686dd88c35c643f0a1747f1912.jpg?aid=rss_feed
    //require('./trial.jpg')
  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
        <Image
           style={styles.tinyLogo}
           source={{
             uri:
               props.image_url
           }}
         />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.scrollContainer}><ScrollView style={styles.nameScroll} scrollsToTop={true}><Text style={styles.nameText}>{props.ep_name}</Text></ScrollView></View>
            <Text style={styles.authorsText}>{props.authors}</Text>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableHighlight
            underlayColor="#ccc"
            style={styles.touchable}
            onPress={() => {
              props.showTranscript(false);
              props.showFaveTranscript(false);
              sound.stopAsync();
              sound.unloadAsync();
            }}
            > 
                <Text style={styles.closeText}> Close</Text>
            </TouchableHighlight>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    buttonContainer: {
        display: 'flex',
        backgroundColor: greenColors.deep, 
        borderRadius: 10,
        width: '15%',
        height: '20%',
        shadowOffset: { width: 10, height: 10},
        shadowColor: 'black'
    },
    touchable :{
        width: '100%',
        height: '100%',
        backgroundColor: greenColors.deep,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeText: {
        color: 'white',
        fontWeight: 'bold',
    },
    container : {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%', 
        alignItems: 'center', 
        paddingTop: 20,
    }, 
    imageContainer: {
        width: '30%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    image : {
        margin: 20,
        maxHeight: '80%',
        maxWidth: '80%',
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10,
        width: '50%',
    }, 
    nameText: {
      fontSize: 25, 
      fontWeight: 'bold',
    },
    authorsText: {
        fontSize: 15,
    },
    tinyLogo: {
      width: '80%',
      height: '80%'
    },
    nameScroll : {
      display:'flex', 
      flexDirection: 'row',
      height: '5%',
    },
    scrollContainer : {
      height: '30%',
      width: '90%',
    },
});

const mapStateToProps = (state: any) => {
  return {
    transcript: state.podcast.podcast,
    isTranscript: state.pageSetup.isShowingTranscript,
    rss_url: state.podcast.rss_url,
    image_url: state.podcast.image_url,
    streaming_url: state.podcast.streaming_url,
    authors: state.podcast.authors, 
    ep_name: state.podcast.ep_name,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    showTranscript: (show: boolean) => dispatch(showTranscript(show)),
    showFaveTranscript : (show: boolean) => dispatch(showFaveTranscript(show)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TranscriptHeader);

//export default PodcastTranscript;
