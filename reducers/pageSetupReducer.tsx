import {
  LOADING_PODCASTS,
  SET_PODCAST_LIST,
  SHOW_TRANSCRIPT,
  SET_TRANSCRIPT_INDEX,
  SET_VOLUME_ENABLED,
  SET_SENTIMENT_ENABLED,
  SET_PITCH_ENABLED,
  FAVORITE_CLICKED, 
  SET_ALL_TEXT, 
  FAVORITE_UNCLICKED,
  SET_LANGUAGE,
  SET_IS_UPLOADING,
  SET_ACCESS_TOKEN,
  SET_REFRESH_TOKEN
} from "../actions/pageSetupActions";
import * as Localization from "expo-localization";
import i18n from "i18n-js";

export const pageSetupInitialState = {
  isLoading: true,
  //isLoading:  false,
  podcastList: [],
  isShowingTranscript: false,
  transcriptIdx: 0,
  volumeEnabled: true,
  sentimentEnabled: true,
  pitchEnabled: true,
  languageCode: Localization.locale,
  isUploading:  false,
  access: "", 
  refresh: "",
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
      let newP2 = [];
      for (let i = 0; i < action.idx; i++) {
        newP2.push(state.podcastList[i]);
      }
      newP2.push({ ...state.podcastList[action.idx], isFave: action.fave });
      for (let j = action.idx + 1; j < state.podcastList.length; j++) {
        newP2.push(state.podcastList[j]);
      }
      return { ...state, podcastList: newP2 };
    case SET_ALL_TEXT:
        let newP = [];
        for (let i = 0; i < action.idx; i++) {
          newP.push(state.podcastList[i]);
        }
        newP.push({ ...state.podcastList[action.idx], allText: action.words});
        for (let j = action.idx + 1; j < state.podcastList.length; j++) {
          newP.push(state.podcastList[j]);
        }
      return { ...state, podcastList: newP };
    case FAVORITE_UNCLICKED:
      let newP3 = [];
      for (let i = 0; i < state.podcastList.length; i++){
        let p = state.podcastList[i];
        if (p.ep_name === action.ep_name){
          newP3.push({...p, isFave: false});
        } else {
          newP3.push(state.podcastList[i]);
        }
      }
      return {...state, podcastList: newP3};
    case SET_LANGUAGE:
      // i18n.locale = action.lan;
      // console.log("Changing Language: ", i18n.locale);
      return {...state, languageCode: action.lan};
    case SET_IS_UPLOADING:
      return {...state, isUploading: action.bool};
    case SET_ACCESS_TOKEN:
      return {...state, access: action.token};
    case SET_REFRESH_TOKEN: 
      return {...state, refresh: action.token};
    default:
      return state;
  }
  return state;
}
