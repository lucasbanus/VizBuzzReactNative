
// The format used to display
export type PodcastInfo = {
    key : string,
    allText : string, 
    name : string, 
    color : string, 
    idx : number,
  }

// what is returned from the get request
export type PodcastItems = {
    name : string, 
    color : string, 
    all_text : string, 
    alias : string,
}