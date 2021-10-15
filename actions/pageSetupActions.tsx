/**
 * action types
 */

export const LOADING_PODCASTS = "LOADING_PODCASTS";
export const SET_PODCAST_LIST = "SET_PODCAST_LIST";
export const SHOW_TRANSCRIPT = "SHOW_TRANSCRIPT";
export const SET_TRANSCRIPT_INDEX = "SET_TRANSCRIPT_INDEX";
export const SET_ANALYSIS_ENABLED = "SET_ANALYSIS_ENABLED";
export const SET_COLOR_ENABLED = "SET_COLOR_ENABLED";

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

export function setAnalysisEnabled(analysis: boolean) {
  return { type: SET_ANALYSIS_ENABLED, analysis };
}

export function setColorEnabled(color: boolean) {
  return { type: SET_COLOR_ENABLED, color };
}
