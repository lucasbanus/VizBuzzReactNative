import * as rssParser from "react-native-rss-parser";

import { PodcastItems, PodcastInfo, PodcastJson, PodcastWordInfoJson, PodcastWordsArrayObject } from "../types/types";
import { useEffect } from "react";

// Constants used for initial fetching
const URL_Back2 = "http://vizbuzz-backend-dev.herokuapp.com/podcasts/";
const key_to_transcripts2 = "transcripts";
const offsetMultiple = 10000000;

const formatTime = (time: number) => {
    const seconds = Math.round(time/offsetMultiple);
    const minutes = Math.floor(seconds/60);
    var remainder = seconds % 60;
    const tens = Math.floor(remainder/10);
    remainder = remainder % 10;
    const timestr = "("+minutes.toString() + ":"+tens.toString()+remainder.toString()+")";
    return timestr;
}

// Functions used for getting the initial podcasts used for testing
const getPodcastsInitial2 = async (setPodcastNames : ((podcasts : Array<PodcastInfo>) => void)) => {
    try {
        // Initial get request needed for testing
        const response = await fetch(URL_Back2);
        const json = await response.json();
        const items: Array<PodcastJson> = await json;
        const transcripts : Array<string> = items.map(pod => {
            var finalString : string = "";
            for(var i = 0; i < pod.word_info.words.length; i++){
                const wordInfo : PodcastWordsArrayObject = pod.word_info.words[i];
                if (i !== 0 && i % 20 === 0){
                    finalString =  finalString + "\n" +formatTime(wordInfo.Offset)+"\n"+wordInfo.display;
                } else {
                    finalString =  finalString + " " +wordInfo.display;
                }
            }
            return finalString;
        });
        const formattedItems : Array<PodcastInfo> = items.map((pod, idx) => {
            return {
                key: pod.id,
                allText: transcripts[idx], 
                name: pod.name,
                color: "black", 
                idx: idx,
            };
        });
        setPodcastNames(formattedItems);
    } catch (error){
        // how should we handle 
    }
};

export const getPodcastsInitialWrapper2 = (setPodcastNames : ((podcasts : Array<PodcastInfo>) => void)) => {
    getPodcastsInitial2(setPodcastNames);
    
    // Its really important so we wait for it
    useEffect(() => {
        getPodcastsInitial2(setPodcastNames);
    }, []);
};

// Constants used to fetch data from rss
const URL_rss = "https://feeds.simplecast.com/c2RzTGta";

// Functions used to parse rss
const parseRss = async () => {
    // Parse RSS
      try {
        fetch(URL_rss)
          .then(response => response.text())
          .then(responseData => rssParser.parse(responseData))
          .then(rss => {
            //console.log(rss);
            const pod_name = rss.title;
            const pod_authors = rss.authors;
            // TODO: For rigged demo only, rename podcasts
            // formattedItems[0].name = rss.title + ": Daniel Osborne";
            // formattedItems[1].name = rss.title + ": John Temerian";
            // formattedItems[2].name = rss.title + ": Taylor Hull";
          });
      } finally {
        // console.log("Fetch completed");
      }
      // End parse RSS
};

export const parseRssWrapper = async () => {
    parseRss();

    useEffect(() => {
        parseRss()
    }, []);
};

// Constants used for initial fetching
const URL_Back = "https://vizbuzz-backend.herokuapp.com/view-transcripts";
const key_to_transcripts = "transcripts";

// Functions used for getting the initial podcasts used for testing
const getPodcastsInitial = async (setPodcastNames : ((podcasts : Array<PodcastInfo>) => void)) => {
    try {
      // Initial get request needed for testing
      const response = await fetch(URL_Back);
      const json = await response.json();
      const items: Array<PodcastItems> = await json[key_to_transcripts];
      const formattedItems = items.map((pod, idx) => {
        return {
          key: pod.alias,
          allText: pod.all_text,
          name: pod.name,
          color: pod.color,
          idx: idx
        };
      });
      setPodcastNames(formattedItems);
    } catch (error){
        // how should we handle 
    }
};

export const getPodcastsInitialWrapper = (setPodcastNames : ((podcasts : Array<PodcastInfo>) => void)) => {
    getPodcastsInitial(setPodcastNames);
    
    // Its really important so we wait for it
    useEffect(() => {
        getPodcastsInitial(setPodcastNames);
    }, []);
};