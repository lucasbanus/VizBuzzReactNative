import {
CLEAR_PODCAST_SEARCH,
NO_MORE_SEARCH, 
SEARCH_NEW_PODCAST, 
SET_EPISODE_PODCAST_IMAGE, 
SET_LOADING_EPISODES, 
SET_PODCAST_EPISODES, 
SET_PODCAST_NAME, 
SET_SEARCH_RESULT 
} from "../actions/podcastSearchActions";

export const podcastSearchInitialState = {
    podcastSearchResults  : [],
    searchQuery: "",
    shouldSearch: false,
    podcastEpisodes: [],
    image: "",
    podcastChosenName: "",
    loadingEpisodes: true, 
};


export function searchPodcasts(state = podcastSearchInitialState, action: any){
    switch(action.type){
        case SEARCH_NEW_PODCAST:
            return {...state, searchQuery: action.queryString, shouldSearch: true};
        case CLEAR_PODCAST_SEARCH:
            return {...state, podcastSearchResults: [], shouldSearch: false};
        case NO_MORE_SEARCH:
            return {...state, shouldSearch: false};
        case SET_SEARCH_RESULT: 
            return {...state, podcastSearchResults: action.searchResult};
        case SET_PODCAST_EPISODES: 
            return {...state, podcastEpisodes: action.episodes};
        case SET_EPISODE_PODCAST_IMAGE:
            return {...state, image: action.image};
        case SET_PODCAST_NAME:
            return {...state, podcastChosenName: action.name};
        case SET_LOADING_EPISODES:
            return {...state, loadingEpisodes: action.loading};
        default:
            return state;
    }
}