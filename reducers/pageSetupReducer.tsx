import {
  LOADING_PODCASTS,
  SET_PODCAST_LIST,
  SHOW_TRANSCRIPT,
  SET_TRANSCRIPT_INDEX,
  SET_VOLUME_ENABLED,
  SET_SENTIMENT_ENABLED,
  SET_PITCH_ENABLED,
  FAVORITE_CLICKED
} from "../actions/pageSetupActions";

export const pageSetupInitialState = {
  isLoading: true,
  podcastList: [],
  isShowingTranscript: false,
  transcriptIdx: 0,
  volumeEnabled: false,
  sentimentEnabled: true,
  pitchEnabled: false
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
    case SET_VOLUME_ENABLED:
      return { ...state, volumeEnabled: action.volume };
    case SET_SENTIMENT_ENABLED:
      return { ...state, sentimentEnabled: action.sentiment };
    case SET_PITCH_ENABLED:
      return { ...state, pitchEnabled: action.pitch };
    case FAVORITE_CLICKED:
      let newP = [];
      for (let i = 0; i < action.idx; i++) {
        newP.push(state.podcastList[i]);
      }
      newP.push({ ...state.podcastList[action.idx], isFave: action.fave });
      for (let j = action.idx + 1; j < state.podcastList.length; j++) {
        newP.push(state.podcastList[j]);
      }
      console.log("New List: ", newP);
      return { ...state, podcastList: newP };
    default:
      return state;
  }
  return state;
}
