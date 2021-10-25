import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import FavoritePodcastList from './FavoritePodcastList';
import PodcastTranscriptR from "../podcasts/PodcastTranscriptR";
import {
  getPodcastsInitialWrapperR, 
  getRss,
  getFavoritePodcasts
} from "../../dataManager/dataManager";
import { greenColors } from "../../constants/colors";
import { connect } from 'react-redux';


export type Props ={
  isLoading: boolean,
  isTranscript: boolean, 
}

class FavoritePodcastListContainer extends React.Component<Props>{
  render(){
    if (this.props.isLoading){
      //getPodcastsInitialWrapperR();
        // get the favorite podcast list
        getFavoritePodcasts();
    }
    let mainComponent;
    if (this.props.isLoading){
      mainComponent = (<Text>Loading</Text>);
    } else if (this.props.isTranscript){
      mainComponent = (
        <PodcastTranscriptR/>
      );
    } else {
      mainComponent = (
        <FavoritePodcastList/>
      );
    }
    return (<View style={styles.container}>{mainComponent}</View>);
  }
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

const mapStateToProps = (state: any) => {
  return {
      isLoading : state.favePodcasts.isLoading,
      isTranscript: state.favePodcasts.isShowingTranscript,
  }
};

const mapDispatchToProps = (dispatch : any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritePodcastListContainer);


