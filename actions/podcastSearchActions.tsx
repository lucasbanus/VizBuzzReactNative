import { ItunesPodcastInfo } from "../types/types";

export const SEARCH_NEW_PODCAST = "SEARCH_NEW_PODCAST";
export const CLEAR_PODCAST_SEARCH = "CLEAR_PODCAST_SEARCH";
export const NO_MORE_SEARCH = "NO_MORE_SEARCH";
export const SET_SEARCH_RESULT = "SET_SEARCH_RESULT";


/**
 * 
 * Functions used to query the itunes API and manage the podcast searching
 */
export function searchNewPodcast(queryString: string){
    return {type: SEARCH_NEW_PODCAST, queryString};
}

export function clearPodcastSearch(){
    return {type: CLEAR_PODCAST_SEARCH};
}

export function noMoreSearch(){
    return {type: NO_MORE_SEARCH};
}

export function setSearchResult(searchResult: Array<ItunesPodcastInfo>){
    return {type: SET_SEARCH_RESULT, searchResult: searchResult};
}