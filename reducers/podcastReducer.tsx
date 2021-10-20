import {
  SET_PODCAST,
  SET_RSS_URL,
  SET_IMAGE_URL,
  SET_STREAMING_URL,
  SET_AUTHORS
} from "../actions/podcastActions";
import { WordContainer } from "../types/types";

export const podcastInitialState = {
  podcast: [],
  rss_url: "",
  image_url: "",
  streaming_url: "",
  authors: ""
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
  }
  return state;
}
