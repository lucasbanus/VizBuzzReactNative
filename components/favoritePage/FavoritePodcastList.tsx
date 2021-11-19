import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableHighlight
} from "react-native";

import { PodcastInfo, PodcastInfoR } from "../../types/types";
import { greenColors } from "../../constants/colors";
import { connect } from "react-redux";
import {
  setPodcast,
  setRssUrl,
  setImageUrl,
  setStreamingUrl,
  setAuthors,
  setEpisodeName
} from "../../actions/podcastActions";
import {favoriteUnclicked} from '../../actions/pageSetupActions';
import {
    setFaveIdx, showFaveTranscript, deleteFavePodcast
} from '../../actions/userFavoritePodcastActions';
import { Ionicons } from "@expo/vector-icons";
import { queryPodcast } from "../../dataManager/dataManager";

export type Props = {
  favePodcastList: Array<any>;
};

class FavoritePodcastList extends React.Component<any>{

  render(){
    const pressPodcast = (idx: number) => {
      if (this.props.favePodcastList !== undefined){
        queryPodcast(idx, this.props.favePodcastList[idx]);
      }
    };

    const removeFave = (idx: number) => {
      this.props.deleteFavePodcast(idx);
      this.props.favoriteUnclicked(this.props.favePodcastList[idx].ep_name);
    }
    return (
      <View style={styles.container}>
      <Text style={styles.title} testID="title">
        Your Favorite Podcasts
      </Text>
      <FlatList
        data={this.props.favePodcastList}
        testID="list"
        renderItem={({ item }) => (
          <TouchableHighlight
            underlayColor="#ccc"
            style={styles.touchable}
            onPress={() => pressPodcast(item.idx)}
          >
            <View style={styles.browserButton}>
            <Text
              style={styles.textInside}
              testID={item.show_name + ": " + item.ep_name}
            >
              {item.show_name + ": " + item.ep_name}
            </Text>
            <TouchableHighlight
                  underlayColor="#ccc"
                  style={styles.faveTouchable}
                  onPress={() => removeFave(item.idx)}
                >
                  <Ionicons
                    name="trash-outline"
                    size={30}
                    color={"white"}
                  />
                </TouchableHighlight>
                </View>
          </TouchableHighlight>
        )}
      />
    </View>
    );
  }
}

// const FavoritePodcastList = (props: any) => {
//   const pressPodcast = (idx: number) => {
//     //   console.log("favePodcastList: ", props.favePodcastList[idx], " idx: ", idx);
//     if (props.favePodcastList !== undefined){
//     // props.setPodcast(props.favePodcastList[idx].allText);
//     // props.showFaveTranscript(true);
//     // props.setRssUrl(props.favePodcastList[idx].rss_url);
//     // props.setImageUrl(props.favePodcastList[idx].image_url);
//     // props.setStreamingUrl(props.favePodcastList[idx].streaming_url);
//     // props.setAuthors(props.favePodcastList[idx].authors);
//     // props.setEpisodeName(props.favePodcastList[idx].ep_name);
//     // props.setFaveIdx(idx);
//       queryPodcast(idx, props.favePodcastList[idx]);
//     }
//   };
//   const count = 0;
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title} testID="title">
//         Your Favorite Podcasts
//       </Text>
//       <FlatList
//         data={props.favePodcastList}
//         testID="list"
//         renderItem={({ item }) => (
//           <TouchableHighlight
//             underlayColor="#ccc"
//             style={styles.touchable}
//             onPress={() => pressPodcast(item.idx)}
//           >
//             <Text
//               style={styles.textInside}
//               testID={item.show_name + ": " + item.ep_name}
//             >
//               {item.show_name + ": " + item.ep_name}
//             </Text>
//           </TouchableHighlight>
//         )}
//       />
//     </View>
//   );
// };

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
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  title: {
    fontSize: 30,
    paddingBottom: 10,
    fontWeight: "bold",
    letterSpacing: 1,
    color: greenColors.deep
  },
  textInside: {
    fontSize: 20,
    //color: "#0074FF",
    color: "#FFFFFF", 
    width: "90%",
  },
  faveTouchable: {
    backgroundColor: greenColors.deep,
    // borderColor: "#FFFFFF",
    // borderWidth: 1,
    width: "10%",
    alignItems: "center",
    justifyContent: "center"
  },
  touchable: {
    //borderColor: "#DEDEDE",
    backgroundColor: greenColors.deep,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    padding: 10,
    width: "100%"
  }
});

const mapStateToProps = (state: any) => {
  return {
    favePodcastList: state.favePodcasts.favoritePodcasts
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setFaveIdx: (idx: number) => dispatch(setFaveIdx(idx)),
    showFaveTranscript: (show: boolean) => dispatch(showFaveTranscript(show)),
    setPodcast: (podcast: any) => dispatch(setPodcast(podcast)),
    setRssUrl: (rss_url: any) => dispatch(setRssUrl(rss_url)),
    setImageUrl: (image_url: any) => dispatch(setImageUrl(image_url)),
    setStreamingUrl: (streaming_url: any) =>
      dispatch(setStreamingUrl(streaming_url)),
    setAuthors: (authors: any) => dispatch(setAuthors(authors)), 
    setEpisodeName: (ep: string) => dispatch(setEpisodeName(ep)),
    deleteFavePodcast: (idx : number) => dispatch(deleteFavePodcast(idx)),
    favoriteUnclicked: (ep_name: string) => dispatch(favoriteUnclicked(ep_name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritePodcastList);
