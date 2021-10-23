import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import { greenColors } from "../constants/colors";
import { connect } from 'react-redux';


// export type Props ={
//   isLoading: boolean,
//   isTranscript: boolean, 
// }

// class PodcastListContainer extends React.Component<Props>{
//   render(){
//     if (this.props.isLoading){
//       getPodcastsInitialWrapperR();
//     }
//     let mainComponent;
//     if (this.props.isLoading){
//       mainComponent = (<Text>Loading</Text>);
//     } else if (this.props.isTranscript){
//       mainComponent = (
//         <PodcastTranscriptR/>
//       );
//     } else {
//       mainComponent = (
//         <PodcastList/>
//       );
//     }
//     return (<View style={styles.container}>{mainComponent}</View>);
//   }
// }

export const UserLogin = (props: any) => {
    return(
        <View style={styles.container}>
            <Text style={styles.title} testID="title">Log In</Text>
            <TextInput style={styles.textInput} placeholder="Username"></TextInput>
            <TextInput style={styles.textInput} placeholder="Password"></TextInput>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: greenColors.background,
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  }, 
  title: {
    fontSize: 30,
    paddingBottom: 10,
    fontWeight: "bold",
    letterSpacing: 1,
    color: greenColors.deep
  },
  textInput : {
    width: '80%', 
    backgroundColor: 'white',
    margin: 10, 
    height: '4%',
    fontSize: 20, 
    paddingLeft: 10,
  },
});

const mapStateToProps = (state: any) => {
  return {
      isLoading : state.pageSetup.isLoading,
      isTranscript: state.pageSetup.isShowingTranscript,
  }
};

const mapDispatchToProps = (dispatch : any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);


