import * as React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import PodcastList from './PodcastList';

// View -> UIView
// Android -> IView

export default function PodcastListContainer():React.ReactElement{

    // Perform the get operation
    const podcastNames = [{key: 'Podcast 1'}, {key: 'Podcast 2'}, {key: 'Podcast 3'}];
    
    return (
        <View>
            <PodcastList 
            podcastNames={podcastNames}
            />
        </View>
    );
}