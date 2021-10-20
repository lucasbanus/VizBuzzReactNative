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