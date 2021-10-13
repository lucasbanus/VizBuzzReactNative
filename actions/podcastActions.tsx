/**
 * action types
 */

export const SET_PODCAST = "SET_PODCAST";


/**
 * functions for action types
 */

export function setPodcast(podcast : any){
    return {type: SET_PODCAST, podcast};
}