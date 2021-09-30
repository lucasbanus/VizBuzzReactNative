import * as React from 'react';
import { StyleSheet, Text, View, Button, FlatList, unstable_batchedUpdates } from 'react-native';
import {useState, useEffect} from 'react';
import PodcastList from './PodcastList';
import PodcastTranscript from './PodcastTranscript';


import {PodcastItems, PodcastInfo} from '../../types/types';

const URL_Back = "https://vizbuzz-backend.herokuapp.com/view-transcripts";
const key_to_transcripts = "transcripts";

export default function PodcastListContainer():React.ReactElement{
    const [isTranscript, setTranscript] = useState(false);
    const [podcastNames, setPodcastNames] = useState<PodcastInfo[] | []>([]);
    const [currentPodcast, setCurrentPodcast] = useState(0);

    const closePodcast = () => {
        setTranscript(false);
    }

    const openPodcast = () => {
        setTranscript(true);
    }

    const getPodcasts = async () => {
        try {
            const response = await fetch(URL_Back);
            const json = await response.json();
            const items : Array<PodcastItems> = await json[key_to_transcripts];
            const formattedItems = items.map((pod, idx) => {
                return { key: pod.alias, allText: pod.all_text, name: pod.name, color: pod.color, idx: idx};
            });
            setPodcastNames(formattedItems);
        } catch (error) {

        }
    }

    useEffect(() => {
        getPodcasts();
    }, []);

    // function append(list : Array<PodcastItems>, child : PodcastItems){
    //     // console.log(child);
    //     list.push(child);
    //     // console.log("Rat");
    //     console.log(list);
    //     return list
    // }

    // var a : Array<p> = [];

    // Perform the get operation
    //var podcastNames = [{key: 'Podcast 1'}, {key: 'Podcast 2'}, {key: 'Podcast 3'}];
    //var podcastNames : Array<PodcastTitle> = [];

    // let transcripts = fetch(URL_Back).then(res => res.json()).then(jso => {
    //     // console.log(jso[key_to_transcripts]);
    //     return jso[key_to_transcripts].forEach((o : p) => {
    //         a = append(a, o);
    //     });
    // }).catch(error => console.log(error));

    // fetch(URL_Back).then(res => res.json()).then(jso => {
    //     jso[key_to_transcripts].forEach((o : PodcastItems) => {
    //         //a = append(a, o);
    //         let c = {key: o.alias, allText: o.all_text, name : o.name, color: o.color};
    //         podcastNames.push(c);
    //     });
    // }).catch(error => console.log(error));
    
    let mainComponent;
    if (isTranscript){
        mainComponent = <PodcastTranscript 
            transcript={podcastNames[currentPodcast].allText}
            visible={isTranscript}
            closePodcast={closePodcast}
            color={podcastNames[currentPodcast].color}
        />
    } else {
        mainComponent = <PodcastList 
            podcastNames={podcastNames}
            openPodcast={openPodcast}
            selectPodcast={setCurrentPodcast}
        />
    }
    
    return (
        <View style={styles.container}>
            {mainComponent}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex : 1, 
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%', 
    }
  });