import * as React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

// View -> UIView
// Android -> IView

export type Props = {
  podcastNames: Array<PodcastTitle>,
  openPodcast: () => void
};

export type PodcastTitle = {
  key : string,
}

export default class PodcastList extends React.Component<Props>{

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Your Podcasts</Text>
        <FlatList 
          data={this.props.podcastNames}
          renderItem={({item}) => <Button 
            title={item.key}
            onPress={this.props.openPodcast}
          />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  title: {
    fontSize: 30, 
  }
});
