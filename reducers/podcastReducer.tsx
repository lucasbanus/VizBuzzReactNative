import {SET_PODCAST} from '../actions/podcastActions';
import { WordContainer } from '../types/types';

export const podcastInitialState = {
    podcast: [], 
};

export function changePodcast(state = podcastInitialState, action : any){
    switch(action.type){
        case SET_PODCAST:
            return {...state, podcast: action.podcast};
    }
    return state;
}