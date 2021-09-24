import * as React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableHighlight } from 'react-native';

// View -> UIView
// Android -> IView

export type Props = {
  podcastNames: Array<PodcastInfo>,
  openPodcast: () => void, 
  selectPodcast : (idx : number) => void, 
};

export type PodcastInfo = {
  key : string,
  allText : string, 
  name : string, 
  color : string, 
  idx : number,
}

const PodcastList = (props: Props) => {

  const pressPodcast = (idx : number) => {
    props.selectPodcast(idx);
    props.openPodcast();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Podcasts</Text>
       <FlatList 
        data={props.podcastNames}
        renderItem={({item}) => 
        <TouchableHighlight underlayColor = '#ccc' style={styles.touchable} onPress={() => pressPodcast(item.idx)}>
          <Text style={styles.textInside}>{item.name}</Text>
        </TouchableHighlight>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex : 0.5, 
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%", 
  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  title: {
    fontSize: 30, 
  }, 
  textInside: {
    fontSize: 20, 
    color: "#0074FF"
  }, 
  touchable : {
    borderColor : "#DEDEDE", 
    borderBottomWidth : 1, 
    padding: 10,
    width : "100%"
  }
});

export default PodcastList;
