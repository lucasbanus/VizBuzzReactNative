import Ionicons from "@expo/vector-icons/build/Ionicons";
import React from "react";
import i18n from "i18n-js";
import { View, StyleSheet, Text, Modal, TouchableHighlight } from "react-native";
import { connect } from "react-redux";
import { setIsUploading } from "../../actions/pageSetupActions";
import { greenColors } from "../../constants/colors";



const UploadPodcast = (props: any) => {
    return (
        <Modal
        visible={props.isUploading}
        animationType="slide"
        style={styles.modalContainer}
        > 
        <Text>{i18n.t("browse")}</Text>
        <TouchableHighlight
            underlayColor="#ccc"
            style={styles.touchable}
            onPress={() => {
              props.setIsUploading(false);
            }}
            > 
            <Ionicons name="close-outline" size={50} color="white" />
                {/* <Text style={styles.closeText}> Close</Text> */}
            </TouchableHighlight>
        </Modal>
        // <View style={styles.container}>
        //     <Text>Browse</Text>
        // </View>
    );
}


const styles = StyleSheet.create({
    browserButton: {
      display: "flex",
      flexDirection: "row"
    },
    container: {
      backgroundColor: greenColors.background,
      alignItems: "center",
      justifyContent: "center",
      width: "100%"
    },
    modalContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    touchable :{
        width: '100%',
        height: '100%',
        backgroundColor: greenColors.deep,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const mapStateToProps = (state: any) => {
    return {
        isUploading : state.pageSetup.isUploading,
    };
  };
  
  const mapDispatchToProps = (dispatch: any) => {
    return {
        setIsUploading : (bool : boolean) => dispatch(setIsUploading(bool)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(UploadPodcast);