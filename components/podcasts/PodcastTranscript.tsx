import React from 'react';
import {StyleSheet, Modal, Text, ScrollView, View, Button, TouchableHighlight} from 'react-native';
import { buttonColors } from '../../constants/colors';

export type Props = {
    transcript: string, 
    visible: boolean,
    closePodcast : () => void, 
    color : string, 
}

const PodcastTranscript = (props : Props) => {
    return(
        <Modal visible={props.visible} animationType="slide" style={styles.modalContainer}>
            <View style={styles.scrollContainer}>
                <ScrollView>
                    <View style={styles.textTogether}>
                        <Text style={{...styles.textArea, color : props.color}}>{props.transcript}</Text>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.closeContainer}>
                <TouchableHighlight
                    underlayColor={buttonColors.closeButton}
                    style={styles.touchable}
                    onPress={props.closePodcast}
                >
                    <Text style={styles.closeButtonText}> Close</Text>
                </TouchableHighlight>
                {/* <Button title = "Close" onPress={props.closePodcast} color="red"/> */}
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
    }, 
    touchable: {
        //borderColor: "#DEDEDE",
        backgroundColor: buttonColors.closeButton,
        padding: 10,
        width: "100%"
      }
});

export default PodcastTranscript;