import * as rssParser from "react-native-rss-parser";

import {
  PodcastItems,
  PodcastInfo,
  PodcastJson,
  PodcastWordInfoJson,
  PodcastWordsArrayObject,
  PodcastInfoR,
  WordContainer
} from "../types/types";
import { useEffect } from "react";
import store from "../store/store";
import { setPodcastList, loadingPodcasts } from "../actions/pageSetupActions";

// Constants used for initial fetching
const URL_Back2 = "http://vizbuzz-backend-dev.herokuapp.com/podcasts/";
const key_to_transcripts2 = "transcripts";
const offsetMultiple = 10000000;

const formatTime = (time: number) => {
  const seconds = Math.round(time / offsetMultiple);
  const minutes = Math.floor(seconds / 60);
  var remainder = seconds % 60;
  const tens = Math.floor(remainder / 10);
  remainder = remainder % 10;
  const timestr =
    "[" +
    minutes.toString() +
    ":" +
    tens.toString() +
    remainder.toString() +
    "]";
  return timestr;
};

// Functions used for getting the initial podcasts used for testing
const getPodcastsInitial2 = async (
  setPodcastNames: (podcasts: Array<PodcastInfo>) => void
) => {
  try {
    // Initial get request needed for testing
    const response = await fetch(URL_Back2);
    const json = await response.json();
    const items: Array<PodcastJson> = await json;
    const transcripts: Array<string> = items.map(pod => {
      var finalString: string = "";
      for (var i = 0; i < pod.word_info.words.length; i++) {
        const wordInfo: PodcastWordsArrayObject = pod.word_info.words[i];
        if (i !== 0 && i % 20 === 0) {
          finalString =
            finalString +
            "\n" +
            formatTime(wordInfo.Offset) +
            "\n" +
            wordInfo.display;
        } else {
          finalString = finalString + " " + wordInfo.display;
        }
      }
      return finalString;
    });
    const formattedItems: Array<PodcastInfo> = items.map((pod, idx) => {
      return {
        key: pod.id,
        allText: transcripts[idx],
        name: pod.name,
        color: "black",
        idx: idx
      };
    });
    setPodcastNames(formattedItems);
    store.dispatch(setPodcastList(formattedItems));
  } catch (error) {
    // how should we handle
  }
};

export const getPodcastsInitialWrapper2 = (
  setPodcastNames: (podcasts: Array<PodcastInfo>) => void
) => {
  getPodcastsInitial2(setPodcastNames);

  // Its really important so we wait for it
  useEffect(() => {
    getPodcastsInitial2(setPodcastNames);
  }, []);
};

//functions rigged demo
const getPodcastsInitialR = async () => {
  try {
    // Initial get request needed for testing
    const response = await fetch(URL_Back2);
    const json = await response.json();
    const items: Array<PodcastJson> = await json;
    let wordArray = [];
    const transcripts: Array<Array<WordContainer>> = items.map(pod => {
      //var finalString : string = "";
      var wordContArray: Array<WordContainer> = [];
      for (var i = 0; i < pod.word_info.words.length; i++) {
        const wordInfo: PodcastWordsArrayObject = pod.word_info.words[i];
        var wordCont: WordContainer;
        if (wordInfo.Polarity !== undefined) {
          if (wordInfo.Polarity > 0) {
            wordCont = { word: wordInfo.display + " ", color: "green" };
          } else if (wordInfo.Polarity < 0) {
            wordCont = { word: wordInfo.display + " ", color: "red" };
          } else {
            wordCont = { word: wordInfo.display + " ", color: "black" };
          }
        } else {
          wordCont = { word: wordInfo.display + " ", color: "black" };
        }

        wordContArray.push(wordCont);

        if (i !== 0 && i % 20 === 0) {
          wordContArray.push({
            word: "\n" + formatTime(wordInfo.Offset),
            color: "black"
          });
        }
      }
      return wordContArray;
    });
    const formattedItems: Array<PodcastInfoR> = items.map((pod, idx) => {
      let show_name: string = "";
      let ep_name: string = pod.name;
      let pod_authors: string = "";
      let image_url: string = "";
      let streaming_url: string = "";
      //fetch(pod.rss_url)
      fetch(URL_rss) // TODO replace with pod.rss_url
        .then(response => response.text())
        .then(responseData => rssParser.parse(responseData))
        .then(rss => {
          //console.log(rss);
          show_name = rss.title;
          image_url = rss.image.url;
          const x: Array<any> = rss.items; // episodes of this podcast
          //const stripped_ep_title = pod.name.trim().toLowerCase();
          const stripped_ep_title2: string = "49.5: The Laws Of Playboys ft Robert Greene"
            .trim()
            .toLowerCase();
          const stripped_ep_title: string = "Spike Feresten" // TODO replace with pod
            .trim()
            .toLowerCase();
          //const stripped_ep_title: string = pod.name.trim().toLowerCase();
          // Find matching episode to podname by episode title
          let this_ep: any;
          for (let i = 0; i < x.length; i++) {
            this_ep = x[i];
            if (
              this_ep.title
                .trim()
                .toLowerCase()
                .indexOf(stripped_ep_title) >= 0
            ) {
              // This is the episode we are looking for
              if (
                this_ep.itunes !== undefined &&
                this_ep.itunes.authors !== undefined &&
                this_ep.itunes.authors.length > 0
              ) {
                pod_authors = this_ep.itunes.authors[0].name;
              }
              ep_name = this_ep.title;
              if (
                this_ep.enclosures !== undefined &&
                this_ep.enclosures.length > 0
              ) {
                streaming_url = this_ep.enclosures[0].url;
              }
              break;
            }
          }
          console.log("show name" + show_name);
          console.log("authors " + pod_authors);
          console.log("title " + ep_name.toString());
          console.log("streaming_url " + streaming_url.toString());
          console.log("image URL " + image_url.toString());
          //console.log(x.length);
          //console.log(item.id);
          // TODO: For rigged demo only, rename podcasts
          // formattedItems[0].name = rss.title + ": Daniel Osborne";
          // formattedItems[1].name = rss.title + ": John Temerian";
          // formattedItems[2].name = rss.title + ": Taylor Hull";
        });
      console.log("image URL " + image_url.toString());
      return {
        key: pod.id,
        allText: transcripts[idx],
        ep_name: pod.name,
        show_name: show_name,
        idx: idx,
        rss_url: pod.rss_url,
        image_url: image_url,
        streaming_url: streaming_url,
        authors: pod_authors
      };
    });
    //setPodcastNames(formattedItems);
    store.dispatch(setPodcastList(formattedItems));
    store.dispatch(loadingPodcasts(false));
  } catch (error) {
    // how should we handle
  }
};

export const getPodcastsInitialWrapperR = () => {
  getPodcastsInitialR();

  // Its really important so we wait for it
  // useEffect(() => {
  //   getPodcastsInitialR();
  // }, []);
};

// Constants used to fetch data from rss
const URL_rss = "https://feeds.simplecast.com/c2RzTGta";
//const URL_rss = "https://feeds.megaphone.fm/sofia-with-an-f";

// Functions used to parse rss
const parseRss = async () => {
  // Parse RSS
  //console.log("hi");
  try {
    fetch(URL_rss)
      .then(response => response.text())
      .then(responseData => rssParser.parse(responseData))
      .then(rss => {
        //console.log(rss);
        const pod_name = rss.title;
        const pod_authors = rss.authors;
        const x: Array<object> = rss.items;
        const item: any = x[0];
        //console.log(x.length);
        //console.log(item.id);
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
    parseRss();
  }, []);
};

// Constants used for initial fetching
const URL_Back = "https://vizbuzz-backend.herokuapp.com/view-transcripts";
const key_to_transcripts = "transcripts";

// Functions used for getting the initial podcasts used for testing
const getPodcastsInitial = async (
  setPodcastNames: (podcasts: Array<PodcastInfo>) => void
) => {
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
  } catch (error) {
    // how should we handle
  }
};

export const getPodcastsInitialWrapper = (
  setPodcastNames: (podcasts: Array<PodcastInfo>) => void
) => {
  getPodcastsInitial(setPodcastNames);

  // Its really important so we wait for it
  useEffect(() => {
    getPodcastsInitial(setPodcastNames);
  }, []);
};
