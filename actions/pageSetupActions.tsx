/**
 * action types
 */

export const LOADING_PODCASTS = "LOADING_PODCASTS";
export const SET_PODCAST_LIST = "SET_PODCAST_LIST";
export const SHOW_TRANSCRIPT = "SHOW_TRANSCRIPT";
export const SET_TRANSCRIPT_INDEX = "SET_TRANSCRIPT_INDEX";
export const SET_VOLUME_ENABLED = "SET_VOLUME_ENABLED";
export const SET_SENTIMENT_ENABLED = "SET_SENTIMENT_ENABLED";
export const SET_PITCH_ENABLED = "SET_PITCH_ENABLED";
export const FAVORITE_CLICKED = "FAVORITE_CLICKED";
export const FAVORITE_UNCLICKED = "FAVORITE_UNCLICKED";
export const SET_ALL_TEXT = "SET_ALL_TEXT";
export const SET_LANGUAGE = "SET_LANGUAGE";
export const SET_IS_UPLOADING = "SET_IS_UPLOADING";
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const SET_REFRESH_TOKEN = "SET_REFRESH_TOKEN";

/**
 * functions for setup actions
 */

export function loadingPodcasts(isLoading: boolean) {
  return { type: LOADING_PODCASTS, isLoading };
}

export function setPodcastList(podcastList: any) {
  return { type: SET_PODCAST_LIST, podcastList };
}

export function showTranscript(transcript: boolean) {
  return { type: SHOW_TRANSCRIPT, transcript };
}

export function setTranscriptIndex(transcript: number) {
  return { type: SET_TRANSCRIPT_INDEX, transcript };
}

export function setVolumeEnabled(volume: boolean) {
  return { type: SET_VOLUME_ENABLED, volume };
}

export function setSentimentEnabled(sentiment: boolean) {
  return { type: SET_SENTIMENT_ENABLED, sentiment };
}

export function setPitchEnabled(pitch: boolean) {
  return { type: SET_PITCH_ENABLED, pitch };
}

export function favoriteClicked(fave: boolean, idx: number) {
  return { type: FAVORITE_CLICKED, fave, idx };
}

export function favoriteUnclicked(ep_name: string){
  return {type: FAVORITE_UNCLICKED, ep_name};
}

export function setAllText(words: Array<any>, idx: number) {
  return { type: SET_ALL_TEXT, words, idx };
}

export function setLanguage(lan: string){
  return {type: SET_LANGUAGE, lan};
}

export function setIsUploading(bool:  boolean){
  return {type: SET_IS_UPLOADING, bool};
}

export function setAccessToken(token: string){
  return {type: SET_ACCESS_TOKEN, token};
}

export function setRefreshToken(token: string){
  return {type: SET_REFRESH_TOKEN, token};
}