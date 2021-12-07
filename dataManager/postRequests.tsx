import { EpisodeInfo, PodcastPostRequest } from "../types/types";

const URL_Back2 = "http://vizbuzz-backend-dev.herokuapp.com/login/";

//{method: "POST", body: JSON.stringify(payload)}

export const verifyLogin = async (username: string, password: string) => {
  let payload = { username: username };
  //console.log("payload: ", payload);
  fetch(URL_Back2, { method: "GET/login", body: JSON.stringify(payload) })
    .then(r => r.json())
    .then(r => {
      console.log("Rat: ", r);
    }).catch(e => console.log("Post Request: ", e));
  return false;
};

export const requestEpisode = async (ep: EpisodeInfo) => {
  // Send a fetch request to add this podcast to the repository
  console.log("Episode to add: ", ep);
  let bodyRequest : PodcastPostRequest ={
    streaming_url: ep.streaming_url,
    audio_bucket_id: "",
    audio_file_id: "",
    transcript_bucket_id: "I dont know",
    transcript_file_id: "",
    name: ep.ep_name,
    episode_number: ep.episode_number,
    author: ep.authors,
    publish_date: ep.publish_date,
    rss_url: ep.publish_date,
    duration: ep.duration
  };
  
}
