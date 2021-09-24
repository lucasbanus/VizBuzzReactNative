import * as React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import {useState} from 'react';
import PodcastList from './PodcastList';
import PodcastTranscript from './PodcastTranscript';

// View -> UIView
// Android -> IView

const URL_Back = "https://vizbuzz-backend.herokuapp.com/view-transcripts";
const key_to_transcripts = "transcripts";

export default function PodcastListContainer():React.ReactElement{
    const [isTranscript, setTranscript] = useState(false);

    const closePodcast = () => {
        setTranscript(false);
    }

    const openPodcast = () => {
        setTranscript(true);
    }

    // Perform the get operation
    const podcastNames = [{key: 'Podcast 1'}, {key: 'Podcast 2'}, {key: 'Podcast 3'}];

    let transcripts = fetch(URL_Back).then(res => res.json()).then(jso => jso[key_to_transcripts]).catch(error => console.log(error));
    
    let mainComponent;
    if (isTranscript){
        mainComponent = <PodcastTranscript 
            transcript="helllo there everyone this is alot of text and im trying to fill up everyting in here. helllo there everyone this is alot of text and im trying to fill up everyting in here. helllo there everyone this is alot of text and im trying to fill up everyting in here. helllo there everyone this is alot of text and im trying to fill up everyting in here. helllo there everyone this is alot of text and im trying to fill up everyting in here. helllo there everyone this is alot of text and im trying to fill up everyting in here. helllo there everyone this is alot of text and im trying to fill up everyting in here. "
            visible={isTranscript}
            closePodcast={closePodcast}
        />
    } else {
        mainComponent = <PodcastList 
            podcastNames={podcastNames}
            openPodcast={openPodcast}
        />
    }
    
    return (
        <View>
            {mainComponent}
        </View>
    );
}