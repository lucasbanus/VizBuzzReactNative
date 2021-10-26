import {
  SET_PODCAST,
  SET_RSS_URL,
  SET_IMAGE_URL,
  SET_STREAMING_URL,
  SET_AUTHORS,
  SET_EPISODE_NAME, 
  SET_WORD_DISPLAY, 
  ADD_WORD_DISPLAY, 
  SET_COMPUTE_WORD_DISPLAY
} from "../actions/podcastActions";
import { WordContainer } from "../types/types";

export const podcastInitialState = {
  podcast: [],
  rss_url: "",
  image_url: "",
  streaming_url: "",
  authors: "", 
  ep_name: "",
  wordDisplay : [],
  shouldComputeWordDisplay: true,
};

export function changePodcast(state = podcastInitialState, action: any) {
  switch (action.type) {
    case SET_PODCAST:
      return { ...state, podcast: action.podcast };
    case SET_RSS_URL:
      return { ...state, rss_url: action.rss_url };
    case SET_IMAGE_URL:
      return { ...state, image_url: action.image_url };
    case SET_STREAMING_URL:
      return { ...state, streaming_url: action.streaming_url };
    case SET_AUTHORS:
      return { ...state, authors: action.authors };
    case SET_EPISODE_NAME:
      return {... state, ep_name : action.ep};
    case SET_WORD_DISPLAY:
      return {...state, wordDisplay: action.words};
    case ADD_WORD_DISPLAY: 
      let newWords = [];
      for (let i = 0; i < state.wordDisplay.length; i++){
        newWords.push(state.wordDisplay[i]);
      }
      newWords.push(action.word);
      return {...state, wordDisplay: newWords, shouldComputeWordDisplay: false};
    case SET_COMPUTE_WORD_DISPLAY:
      return {...state, shouldComputeWordDisplay: action.should};
  }
  return state;
}
