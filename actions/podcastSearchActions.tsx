import { ItunesPodcastInfo } from "../types/types";

export const SEARCH_NEW_PODCAST = "SEARCH_NEW_PODCAST";
export const CLEAR_PODCAST_SEARCH = "CLEAR_PODCAST_SEARCH";
export const NO_MORE_SEARCH = "NO_MORE_SEARCH";
export const SET_SEARCH_RESULT = "SET_SEARCH_RESULT";
export const SET_PODCAST_EPISODES = "SET_PODCAST_EPISODES";
export const SET_EPISODE_PODCAST_IMAGE = "SET_EPISODE_PODCAST_IMAGE";
export const SET_PODCAST_NAME = "SET_PODCAST_NAME";
export const SET_LOADING_EPISODES = "SET_LOADING_EPISODES";


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

export function setPodcastEpisodes(episodes: Array<any>){
    return {type: SET_PODCAST_EPISODES, episodes};
}

export function setEpisodeImage(image: string) {
    return {type: SET_EPISODE_PODCAST_IMAGE, image};
}

export function setPodcastName(name: string) {
    return {type: SET_PODCAST_NAME, name};
}

export function setLoadingEpisodes(loading: boolean){
    return {type: SET_LOADING_EPISODES, loading};
}