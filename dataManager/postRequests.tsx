import { setPodcastList } from "../actions/pageSetupActions";
import store from "../store/store";
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
    })
    .catch(e => console.log("Post Request: ", e));
  return false;
};

export const requestEpisode = async (ep: EpisodeInfo, showName: string) => {
  // Send a fetch request to add this podcast to the repository
  console.log("Episode to add: ", ep);
  let bodyRequest: PodcastPostRequest = {
    streaming_url: ep.streaming_url,
    audio_bucket_id: "",
    audio_file_id: "",
    transcript_bucket_id: "vizbuzz-podcast-metadata",
    transcript_file_id: "",
    name: ep.ep_name,
    episode_number: ep.episode_number,
    author: ep.authors,
    publish_date: ep.publish_date,
    rss_url: ep.publish_date,
    duration: ep.duration
  };

  fetch("http://127.0.0.1:4000/transcribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyRequest)
  }).then(res => res.json()).then(res => {
    console.log("Result of getting: ", res);
    let newPodcastInfoR = {
      key: res["saved podcast id"],
      allText: [],
      ep_name: bodyRequest.name,
      show_name: showName,
      idx: 0,
      rss_url: bodyRequest.rss_url,
      image_url: ep.image,
      streaming_url: ep.streaming_url,
      authors: ep.authors,
      isFave: false,
      transcript_bucket_id: bodyRequest.transcript_bucket_id, 
      transcript_file_id: bodyRequest.transcript_file_id,
      podcast_id: res["saved podcast id"],
    };
    let newPods = [];
    newPods.push(newPodcastInfoR);
    store.getState().pageSetup.podcastList.forEach((pod : any, idx: number) => {
      newPods.push({...pod, idx: idx + 1});
    });
    store.dispatch(setPodcastList(newPods));
  }).catch(e => console.log("Uploading the podcast Failed: ", e));
};
