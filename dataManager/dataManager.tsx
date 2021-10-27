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
import {
  setFavePodcasts,
  loadingFavePodcasts
} from "../actions/userFavoritePodcastActions";

// Constants used for initial fetching
const URL_backend = "http://vizbuzz-backend-dev.herokuapp.com/podcasts/";
const key_to_transcripts2 = "transcripts";
const offsetMultiple = 10000000;
const TAG = "dataManager.tsx";
let rss_mapping = new Map();

let defaultColor = "black";
let defaultSize = 25;
let defaultWeight = "normal";

export const formatTime = (time: number) => {
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

/* Convert polarity to a string representing the color the text should be, default is black */
export const fromPolarityToColor = (polarity: number) => {
  if (polarity === undefined) {
    return defaultColor;
  }
  let color: string = defaultColor;
  if (polarity > 0) {
    color = "green";
  } else if (polarity < 0) {
    color = "red";
  }
  return color;
};

/* Return string version of time stamp for this wordInfo object */
export const getTimeStamp = (wordInfo: PodcastWordsArrayObject) => {
  return {
    word: "\n" + formatTime(wordInfo.Offset),
    color: "black",
    size: defaultSize,
    weight: defaultWeight
  };
};

// Retrieve podcasts from JSON and parse their RSS URL's
const getPodcastsInitialR = async () => {
  try {
    let {
      pitchEnabled,
      sentimentEnabled,
      volumeEnabled
    } = store.getState().pageSetup;
    // Initial get request for JSON from backend

    const response = await fetch(URL_backend);
    const json: JSON = await response.json();
    const items: Array<PodcastJson> = JSON.parse(JSON.stringify(json));

    const transcripts: Array<Array<WordContainer>> = items.map(pod => {
      //var finalString : string = "";
      var wordContArray: Array<WordContainer> = [];
      if (pod.word_info != undefined) {
        for (var i = 0; i < pod.word_info.words.length; i++) {
          const wordInfo: PodcastWordsArrayObject = pod.word_info.words[i];
          var wordCont: WordContainer;
          let color = defaultColor;
          let weight = defaultWeight;
          let size = defaultSize;
          if (sentimentEnabled) {
            color = fromPolarityToColor(wordInfo.Polarity);
          }

          if (pitchEnabled) {
            // change the weight according to scale
          }

          if (volumeEnabled) {
            // change the size according to scale
          }
          // if (wordInfo.Polarity !== undefined) {
          //   if (wordInfo.Polarity > 0) {
          //     wordCont = { word: wordInfo.display + " ", color: "green", size: defaultSize, weight: defaultWeight };
          //   } else if (wordInfo.Polarity < 0) {
          //     wordCont = { word: wordInfo.display + " ", color: "red", size: defaultSize, weight: defaultWeight };
          //   } else {
          //     wordCont = { word: wordInfo.display + " ", color: "black", size: defaultSize, weight: defaultWeight };
          //   }
          // } else {
          //   wordCont = { word: wordInfo.display + " ", color: "black" , size: defaultSize, weight: defaultWeight};
          // }

          //wordContArray.push(wordCont);
          wordCont = { word: wordInfo.display + " ", color, size, weight };
          wordContArray.push(wordCont);

          if (i !== 0 && i % 20 === 0) {
            wordContArray.push(getTimeStamp(wordInfo));
          }
        }
      }
      return wordContArray;
    });
    const formattedItems2: Array<Promise<PodcastInfoR>> = items.map(
      async (pod, idx) => await processPJSON(pod, idx, transcripts)
    );
    let fom: Array<PodcastInfoR> = [];
    let fom2 = force(formattedItems2);
    let fom3 = await fom2;

    //setPodcastNames(formattedItems);
    store.dispatch(setPodcastList(fom3)); //formattedItems));
    store.dispatch(loadingPodcasts(false));
  } catch (error) {
    // how should we handle
    console.log(TAG + " Error" + error + "\n");
  }
};

/* Find episode authors name fom this RSS, otherwise returns default val */
export const getEpisodeAuthors = (episode_rss: any) => {
  if (episode_rss === undefined) {
    return "";
  }
  if (
    episode_rss.itunes !== undefined &&
    episode_rss.itunes.authors !== undefined &&
    episode_rss.itunes.authors.length > 0
  ) {
    // Get this episode's authors
    return episode_rss.itunes.authors[0].name;
  } else {
    return "";
  }
};

export const getStreamingUrlFromRss = (episode_rss: any) => {
  // Get streaming URL.
  if (
    episode_rss !== undefined &&
    episode_rss.enclosures !== undefined &&
    episode_rss.enclosures.length > 0
  ) {
    return episode_rss.enclosures[0].url;
  } else {
    return "";
  }
};

export const findEpisode = (episodes_array: any, episode_title: string) => {
  let this_ep: any;
  let stripped_ep_title = episode_title.trim().toLowerCase();
  for (let i = 0; i < episodes_array.length; i++) {
    this_ep = episodes_array[i];
    if (
      this_ep.title
        .trim()
        .toLowerCase()
        .indexOf(stripped_ep_title) >= 0
    ) {
      // This is the episode we are looking for
      return this_ep;
    }
  }
  return undefined;
};

const processPJSON = async (
  pod: PodcastJson,
  idx: number,
  transcripts: Array<Array<WordContainer>>
) => {
  let show_name: string = "";
  let ep_name: string = pod.name;
  let pod_authors: string = "";
  let image_url: string = "";
  let streaming_url: string = "";
  //console.log(TAG + " rss url from JSON " + pod.rss_url);
  let rss_response = await fetch(pod.rss_url);
  let rss_text = await rss_response.text();
  console.log("PJSON \n" + rss_text);
  let rss_json = await rssParser.parse(rss_text);
  // Get the pre-fetched rss response for this podcast show

  // // Get real show name and cover art from the show's RSS URL
  show_name = rss_json.title;
  image_url = rss_json.image.url;
  // // FIND this specific episode withing the show's rss feed.
  // console.log("rss: ", rss);
  const x: Array<any> = rss_json.items; // all episodes of this podcast

  // // Find matching episode to podname by episode title
  let this_ep = findEpisode(x, pod.name);
  pod_authors = getEpisodeAuthors(this_ep);
  streaming_url = getStreamingUrlFromRss(this_ep);
  if (this_ep !== undefined) {
    ep_name = this_ep.title;
  }

  let ret: PodcastInfoR = {
    key: pod.id,
    allText: transcripts[idx],
    ep_name: ep_name,
    show_name: show_name,
    idx: idx,
    rss_url: pod.rss_url,
    image_url: image_url,
    streaming_url: streaming_url,
    authors: pod_authors,
    isFave: false
  };
  return ret;
};

const URL_GET_TRANSCRIPT =
  "https://vizbuzz-backend-dev.herokuapp.com/view-transcripts/";
// get the podcast info

const hard = [
  {
    Word: "what's",
    Offset: 1800000,
    Duration: 4500000,
    Display: "what's",
    Index: 0,
    Pitch: 1,
    Volume: 0.2
  },
  {
    Word: "up",
    Offset: 6400000,
    Duration: 1900000,
    Display: "up",
    Index: 1,
    Pitch: 0,
    Volume: 0.1
  },
  {
    Word: "folks",
    Offset: 8400000,
    Duration: 4500000,
    Display: "folks",
    Index: 2,
    Pitch: 1,
    Volume: 0.9
  },
  {
    Word: "welcome",
    Offset: 13000000,
    Duration: 3000000,
    Display: "welcome",
    Index: 3,
    Polarity: 0,
    Subjective: 0.9,
    Pitch: 1,
    Volume: 0.2
  }
];
export const queryPodcast = async (idx: number) => {
  let podcast = store.getState().pageSetup.podcastList;
  let {
    pitchEnabled,
    sentimentEnabled,
    volumeEnabled
  } = store.getState().pageSetup;
  let wordContArray = [];
  hardcoded.map((word, i) => {
    var wordCont: WordContainer;
    let color = defaultColor;
    let weight = defaultWeight;
    let size = defaultSize;

    if (sentimentEnabled) {
      color = fromPolarityToColor(wordInfo.Polarity);
    }

    if (pitchEnabled) {
      // change the weight according to scale
    }

    if (volumeEnabled) {
      // change the size according to scale
    }
    wordCont = { word: wordInfo.display + " ", color, size, weight };
    wordContArray.push(wordCont);
    if (i !== 0 && i % 20 === 0) {
      wordContArray.push(getTimeStamp(wordInfo));
    }
  });
  // console.log("QUETYING PODCAST\n");
  // let payload = {
  //   transcript_bucket_id: "vizbuzz-podcast-metadata",
  //   transcript_file_id:
  //     "John Temerian (Curated, Exotic Car Dealer)c2RzTGta.json"
  // };
  // var url = new URL(URL_GET_TRANSCRIPT);
  // console.log("Created url");
  // url.search = new URLSearchParams(payload).toString();
  // console.log("Added search parameters");
  // let fetchT = await fetch(URL_GET_TRANSCRIPT, {
  //   method: "POST",
  //   body: JSON.stringify(payload)
  // });
  // let respJson = await fetchT.json();
  // //let json = await JSON.parse(JSON.stringify(respJson));
  // console.log("Response Trans: ", respJson);
  //console.log(JSON.stringify(payload));
  // fetch(
  //   `https://vizbuzz-backend-dev.herokuapp.com/view-transcripts?transcript_bucket_id=${encodeURIComponent(
  //     payload.transcript_bucket_id
  //   )}&transcript_file_id=${encodeURIComponent(payload.transcript_file_id)}`,
  //   {
  //     method: "GET"
  //   }
  // )
  //   .then(r => r.text())
  //  .then(r => console.log(r));
  //.then(r => console.log(r));
  //.then(res => console.log(res));
};

const force = async (f: Array<Promise<PodcastInfoR>>) => {
  let f2: Array<PodcastInfoR> = [];
  for (let i = 0; i < f.length; i++) {
    f2.push(await f[i]);
  }
  // TODO DELETE THIS: Add hardcoded titles for demos

  return f2;
};

export const getPodcastsInitialWrapperR = () => {
  getPodcastsInitialR();
  //getRss();
};

const URL_rss = "https://feeds.megaphone.fm/sofia-with-an-f";
export const getRss = async () => {
  try {
    console.log("hello parsing");
    const response = await fetch(URL_rss);
    const responseText = await response.text();
    console.log("got response", responseText);
    const respJson = await rssParser.parse(responseText);
    console.log("json: ", respJson);
  } catch (e) {}
};

// get the favorite podcasts
export const getFavoritePodcasts = () => {
  store.dispatch(setFavePodcasts([])); //formattedItems));
  store.dispatch(loadingFavePodcasts(false));
};

// Constants used to fetch data from rss
//const URL_rss = "https://feeds.simplecast.com/c2RzTGta";

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
