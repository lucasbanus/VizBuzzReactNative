import Ionicons from "@expo/vector-icons/build/Ionicons";
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  Dimensions
} from "react-native";
import i18n from "i18n-js";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
// import { setIsUploading } from "../../actions/pageSetupActions";
import { greenColors } from "../../constants/colors";
import { EpisodeInfo } from "../../types/types";
import { requestEpisode } from "../../dataManager/postRequests";

const BrowseEpisodesPage = (props: any) => {
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round(dimensions.width * 16 / 9) * 0.2;
  const imageWidth = dimensions.width * 0.4;
  let episodes = props.episodes.map((ep : EpisodeInfo, idx : number) => {
      return (
        <View style={styles.podcastShowContainer} key={ep.ep_name+idx.toString()}>
          <View style={styles.episodeTextContainer}>
            <Text style={styles.titleText}>{ep.ep_name}</Text>
            <Text style={styles.authorsText}>{ep.authors}</Text>
          </View>
          <TouchableHighlight
            underlayColor="#ccc"
            style={styles.addTouchable}
            onPress={() => {requestEpisode(ep)}}
          >
            <Ionicons name="add-outline" size={35} color="white" />
          </TouchableHighlight>
        </View>
      );
  });
  let image; 
  if (props.episodesImage === ""){
    image = (
      <Image
           style={{height: imageHeight, width: imageWidth, marginBottom: 10}}
           source={{uri: "https://macfarlaneoffice.com/wp-content/uploads/2020/03/no_image.jpg"}}
         />
    );
  } else {
    image = (<Image
           style={{height: imageHeight, width: imageWidth, marginBottom: 10}}
           source={{
             uri:
               props.episodesImage
           }}
         />);
  }

  let mainComp;
  if (props.loadingEpisodes){
    mainComp = (
    <View style={styles.loadingBack}>
      <Text style={{fontSize: 30}}>{i18n.t("loading")}</Text>
    </View>);
  } else {
    mainComp = (
      <View style={styles.mainContainer}>
        {/* <Text style={styles.text}>{i18n.t("episodes")}</Text> */}
        <Text style={{...styles.text, paddingTop: 0}}>{props.podcastName}</Text>
        {image}
        <ScrollView>
        {episodes}
        </ScrollView>
      </View>
    );
  }
  return (<View>
    {mainComp}
  </View>);
};

const styles = StyleSheet.create({
  loadingBack: {
    height: "100%", 
    width: "100%", 
    backgroundColor: greenColors.background,
    alignItems: "center", 
    justifyContent: "center",
  },
  mainContainer: {
    backgroundColor: greenColors.background,
    alignItems: "center",
    //justifyContent: "center",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    // justifyContent: "space-between",
    paddingTop: 10,
    paddingRight: 10
  },
  text: {
    fontSize: 30,
    paddingBottom: 10,
    paddingTop: 10,
    fontWeight: "bold",
    letterSpacing: 1,
    color: greenColors.deep
  }, 
  podcastShowContainer:{
    width: '93%',
    backgroundColor: greenColors.deep,
    display: "flex",
    flexDirection: "row",
    margin: 5,
    height: 100,
    borderRadius: 10,
    alignItems: "center",
  },
  titleText :{
    fontSize: 20, 
    letterSpacing: 1,
    overflow: 'hidden', 
    height: '60%',
    paddingTop: 10,
    color: 'white',
    width: "95%",
    paddingLeft: 10,
  },
  authorsText :{
    fontSize: 16,
    overflow: 'hidden',
    height: "40%", 
    width: "95%",
    paddingLeft: 10,
    color: "white",
  },
  addTouchable :{
    width: "20%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  episodeTextContainer:{
    flexDirection: "column", 
    display: "flex",
    width: "80%", 
  },
  tinyLogo: {
    height: '20%',
    width: '20%',
  },
});

const mapStateToProps = (state: any) => {
  return {
    // isUploading: state.pageSetup.isUploadingod
    episodes: state.podcastSearch.podcastEpisodes,
    episodesImage: state.podcastSearch.image,
    podcastName: state.podcastSearch.podcastChosenName,
    loadingEpisodes: state.podcastSearch.loadingEpisodes,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    // setIsUploading: (bool: boolean) => dispatch(setIsUploading(bool))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowseEpisodesPage);
