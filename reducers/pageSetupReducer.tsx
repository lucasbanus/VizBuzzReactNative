import {
  LOADING_PODCASTS,
  SET_PODCAST_LIST,
  SHOW_TRANSCRIPT,
  SET_TRANSCRIPT_INDEX,
  SET_ANALYSIS_ENABLED,
  SET_COLOR_ENABLED
} from "../actions/pageSetupActions";

export const pageSetupInitialState = {
  isLoading: true,
  podcastList: [],
  isShowingTranscript: false,
  transcriptIdx: 0,
  analysisEnabled: false,
  colorEnabled: false
};

export function changePageSetup(state = pageSetupInitialState, action: any) {
  switch (action.type) {
    case LOADING_PODCASTS:
      return { ...state, isLoading: action.isLoading };
    case SET_PODCAST_LIST:
      return { ...state, podcastList: action.podcastList, isLoading: false };
    case SHOW_TRANSCRIPT:
      return { ...state, isShowingTranscript: action.transcript };
    case SET_TRANSCRIPT_INDEX:
      return { ...state, transcriptIdx: action.transcript };
    case SET_ANALYSIS_ENABLED:
      return { ...state, analysisEnabled: action.analysis };
    case SET_COLOR_ENABLED:
      return { ...state, colorEnabled: action.color };
    default:
      return state;
  }
  return state;
}
