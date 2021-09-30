import React from 'react';
import {StyleSheet, Modal, Text, ScrollView, View, Button} from 'react-native';

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
                <Button title = "Close" onPress={props.closePodcast} color="red"/>
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
        backgroundColor: "#DEDEDE",
        color: "red",
    },
    modalContainer: {
        justifyContent:"center", 
        alignItems: "center",
    },
    scrollContainer: {
        width: "100%", 
        height: "90%",
        paddingVertical: 50, 
        paddingHorizontal: 30, 
    }, 
    textArea: {
        fontSize: 30,
    },
    textTogether: {
        flexDirection: "row",
        flexWrap: "wrap", 
    }
});

export default PodcastTranscript;