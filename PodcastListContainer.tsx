import * as React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import PodcastList from './PodcastList';

// View -> UIView
// Android -> IView

const URL_Back = "https://vizbuzz-backend.herokuapp.com/view-transcripts";
const key_to_transcripts = "transcripts";

export default function PodcastListContainer():React.ReactElement{

    // Perform the get operation
    const podcastNames = [{key: 'Podcast 1'}, {key: 'Podcast 2'}, {key: 'Podcast 3'}];

    let transcripts = fetch(URL_Back).then(res => res.json()).then(jso => jso[key_to_transcripts]).catch(error => console.log(error));
    
    return (
        <View>
            <PodcastList 
            podcastNames={podcastNames}
            />
        </View>
    );
}