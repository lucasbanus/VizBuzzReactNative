import React from 'react';
import {StyleSheet, Modal, Text, ScrollView, View, Button, TouchableHighlight} from 'react-native';
import { buttonColors } from '../../constants/colors';
import { WordContainer } from '../../types/types';
import { setTranscriptIndex, showTranscript } from '../../actions/pageSetupActions';
import { connect } from 'react-redux';

export type Props = {
    transcript: Array<WordContainer>, 
    showTranscript: (show : boolean) => void,
    isTranscript: boolean,
}

const PodcastTranscript = (props : Props) => {
    const allWords = props.transcript.map((word, idx) => {
        let wordComp;
        if (idx !== 0 && idx %21 === 0){
            wordComp = (<View key={"word"+idx} style={styles.timeStamp}><Text style={{...styles.textArea, color : word.color}}>{word.word}</Text></View>);
        } else {
            wordComp = (<Text key={"word"+idx} style={{...styles.textArea, color : word.color}}>{word.word}</Text>);
        }
        return wordComp;
    });
    return(
        <Modal visible={props.isTranscript} animationType="slide" style={styles.modalContainer}>
            <View style={styles.scrollContainer}>
                <ScrollView>
                    <View style={styles.textTogether}>
                        {allWords}
                    </View>
                </ScrollView>
            </View>
            <View style={styles.closeContainer}>
                <TouchableHighlight
                    underlayColor={buttonColors.closeButton}
                    style={styles.touchable}
                    //onPress={props.closePodcast}
                    onPress={() => props.showTranscript(false)}
                >
                    <Text style={styles.closeButtonText}> Close</Text>
                </TouchableHighlight>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    closeContainer:{
        width: "100%",
        height:"10%",
        justifyContent:"center", 
        alignItems:"center",
        //backgroundColor: "#DEDEDE",
        backgroundColor: buttonColors.closeButton,
        color: "red",
    },
    closeButtonText: {
        textAlign: "center", 
        justifyContent: "center", 
        fontSize: 30, 
        color: "white",
        fontWeight: "bold",  
    },
    modalContainer: {
        justifyContent:"center", 
        alignItems: "center",
    },
    scrollContainer: {
        width: "100%", 
        height: "90%",
        paddingTop: 50, 
        paddingHorizontal: 30,
    }, 
    textArea: {
        fontSize: 25,
        textAlign: "center",
    },
    textTogether: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center", 
    },
    timeStamp : {
        width: '100%'
    },
    touchable: {
        backgroundColor: buttonColors.closeButton,
        padding: 10,
        width: "100%"
      }
});


const mapStateToProps = (state: any) => {
    return {
        transcript: state.podcast.podcast,
        isTranscript: state.pageSetup.isShowingTranscript,
    }
  };
  
  const mapDispatchToProps = (dispatch : any) => {
    return {
        showTranscript : (show : boolean) => dispatch(showTranscript(show)),
    }
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(PodcastTranscript);

//export default PodcastTranscript;