/**
 * action types
 */

export const LOAD_FAVE_PODCASTS = "LOAD_FAVE_PODCASTS";
export const SET_FAVE_PODCASTS = "SET_FAVE_PODCASTS";
export const ADD_FAVE_PODCAST = "ADD_FAVE_PODCAST";
export const SHOW_FAVE_TRANSCRIPT = "SHOW_FAVE_TRANSCRIPT";
export const SET_FAVE_IDX = "SET_FAVE_IDX";
// export const SET_VOLUME_ENABLED = "SET_VOLUME_ENABLED";
// export const SET_SENTIMENT_ENABLED = "SET_SENTIMENT_ENABLED";
// export const SET_PITCH_ENABLED = "SET_PITCH_ENABLED";

/**
 * functions for setup actions
 */

export function loadingFavePodcasts(isLoading: boolean) {
  return { type: LOAD_FAVE_PODCASTS, isLoading };
}

export function setFavePodcasts(podcastList: any) {
  return { type: SET_FAVE_PODCASTS, podcastList };
}

export function addFavePodcast(podcast: any) {
    return { type: ADD_FAVE_PODCAST, podcast };
  }

export function showFaveTranscript(transcript: boolean) {
  return { type: SHOW_FAVE_TRANSCRIPT, transcript };
}

export function setFaveIdx(transcript: number) {
  return { type: SET_FAVE_IDX, transcript };
}

// export function setVolumeEnabled(volume: boolean) {
//   return { type: SET_VOLUME_ENABLED, volume };
// }

// export function setSentimentEnabled(sentiment: boolean) {
//   return { type: SET_SENTIMENT_ENABLED, sentiment };
// }

// export function setPitchEnabled(pitch: boolean) {
//   return { type: SET_PITCH_ENABLED, pitch };
// }
