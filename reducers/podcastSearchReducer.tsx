import { CLEAR_PODCAST_SEARCH, NO_MORE_SEARCH, SEARCH_NEW_PODCAST, SET_SEARCH_RESULT } from "../actions/podcastSearchActions";

export const podcastSearchInitialState = {
    podcastSearchResults  : [],
    searchQuery: "",
    shouldSearch: false,
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
        default:
            return state;
    }
}