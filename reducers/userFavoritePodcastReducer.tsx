import {
    SET_VOLUME_ENABLED,
    SET_SENTIMENT_ENABLED,
    SET_PITCH_ENABLED
  } from "../actions/pageSetupActions";
import { LOAD_FAVE_PODCASTS, SET_FAVE_PODCASTS, ADD_FAVE_PODCAST, SHOW_FAVE_TRANSCRIPT, SET_FAVE_IDX, DELETE_FAVE_PODCAST } from "../actions/userFavoritePodcastActions";
  
  export const favortieInitialState = {
    isLoading: true,
    favoritePodcasts: [],
    isShowingTranscript: false,
    transcriptIdx: 0,
    volumeEnabled: false,
    sentimentEnabled: false,
    pitchEnabled: false
  };
  
  export function changeFavePodcasts(state = favortieInitialState, action: any) {
    switch (action.type) {
        case LOAD_FAVE_PODCASTS:
            return { ...state, isLoading: action.isLoading };
        case SET_FAVE_PODCASTS:
            return { ...state, favoritePodcasts: action.podcastList, isLoading: false };
        case ADD_FAVE_PODCAST:
            let newP = [];
            let notFound = true;
            for (let j = 0; j < state.favoritePodcasts.length; j++){
                let s : any = state.favoritePodcasts[j];
                if (s.ep_name === action.podcast.ep_name){
                    notFound = false;
                    break;
                }
            }
            if (notFound){
                newP.push({...action.podcast, idx: 0});
                for(let i = 0; i < state.favoritePodcasts.length; i++){
                    let p : any = state.favoritePodcasts[i];
                    newP.push({...p, idx: i+1});
                }
            } else {
                for(let i = 0; i < state.favoritePodcasts.length; i++){
                    let p : any = state.favoritePodcasts[i];
                    newP.push({...p, idx: i});
                }
            }
            return {...state, favoritePodcasts: newP};
        case SHOW_FAVE_TRANSCRIPT:
            return { ...state, isShowingTranscript: action.transcript };
        case SET_FAVE_IDX:
            return { ...state, transcriptIdx: action.transcript };
        case SET_VOLUME_ENABLED:
            return { ...state, volumeEnabled: action.volume };
        case SET_SENTIMENT_ENABLED:
            return { ...state, sentimentEnabled: action.sentiment };
        case SET_PITCH_ENABLED:
            return { ...state, pitchEnabled: action.pitch };
        case DELETE_FAVE_PODCAST:
            let newF = [];
            for (let j = 0; j < action.idx; j++){
                newF.push(state.favoritePodcasts[j]);
            }
            for (let i = action.idx + 1; i < state.favoritePodcasts.length; i++){
                let p : any = state.favoritePodcasts[i];
                newF.push({...p, idx: i-1});
            }
            return {...state, favoritePodcasts: newF};
        default:
            return state;
    }
    return state;
  }
  