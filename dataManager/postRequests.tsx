import { loadingPodcasts, setAccessToken, setPodcastList, setRefreshToken } from "../actions/pageSetupActions";
import store from "../store/store";
import { EpisodeInfo, PodcastPostRequest } from "../types/types";

const URL_Back2 = "http://vizbuzz-backend-dev.herokuapp.com";

//{method: "POST", body: JSON.stringify(payload)}

export const cookieBuild = (access: string, refr: string) => "access="+access+"; refresh="+refr;

export const verifyLogin = async (username: string, password: string, navigation: any) => {
  let payload = { username: username, password: password};
  console.log("Trying to login: ", payload);
  fetch(URL_Back2+"/login", {
    method: "POST", 
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(payload),
  })
    .then(r => {
      return r.json();
    }
    ).then(r => {
      console.log("Loggen In with: ", r);
      let access = r.access;
      let refresh = r.refresh;
      store.dispatch(setAccessToken(access));
      setInterval(refreshAccessToken, 1000*60*30);
      store.dispatch(setRefreshToken(refresh));
      navigation.navigate("MainApp");
    })
    .catch(e => {
      alert("Either username or password is incorrect.");
      console.log("Post Request: ", e)
    });
  return false;
};

export const createAccount = async(username: string, password: string, navigation: any) => {
  let payload = {
    name: username,
    username: username,
    password: password,
    favorites:[],
    google_login_info:"__"
};

fetch(URL_Back2+"/user", {
  method: "POST", 
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
}).then(r => r.json()).then(r => {
  console.log("Registration: ", r);
  verifyLogin(username, password, navigation);
}).catch(e => console.log("Post Requests: Error creating the user: ", e));

}

export const logout = async() => {
  let access = store.getState().pageSetup.access;
  let refresh = store.getState().pageSetup.refresh;
  fetch(URL_Back2+"/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Cookie": cookieBuild(access, refresh)}
  }).then(r => r.json()).then(r => {
    console.log("Logged out: ", r);
  }).catch(e => console.log("Post Request: Error Logging Out: ", e));
};

export const refreshAccessToken = async() => {
  let refresh = store.getState().pageSetup.refresh;
  let access = store.getState().pageSetup.access;
  fetch(URL_Back2+"/refresh", {
    method: "POST",
    headers: {"Cookie": cookieBuild(access, refresh)}
  }).then (r => r.json()).then (r => {
    store.dispatch(setAccessToken(r.access));
  }).catch(e => console.log("Post Request, Unable to refresh: ", e));
}

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
    headers: { "Content-Type": "application/json", "Cookie": cookieBuild(store.getState().pageSetup.access, store.getState().pageSetup.refresh)},
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

export const clearState = () => {
  store.dispatch(loadingPodcasts(true));
  store.dispatch(setPodcastList([]));
  store.dispatch(setPodcastList([]));
};
