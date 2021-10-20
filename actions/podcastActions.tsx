/**
 * action types
 */

export const SET_PODCAST = "SET_PODCAST";
export const SET_RSS_URL = "SET_RSS_URL";
export const SET_IMAGE_URL = "SET_IMAGE_URL";
export const SET_STREAMING_URL = "SET_STREAMING_URL";
export const SET_AUTHORS = "SET_AUTHORS";

/**
 * functions for action types
 */

export function setPodcast(podcast: any) {
  return { type: SET_PODCAST, podcast };
}

export function setRssUrl(rss_url: string) {
  return { type: SET_RSS_URL, rss_url };
}

export function setImageUrl(image_url: string) {
  return { type: SET_IMAGE_URL, image_url };
}

export function setStreamingUrl(streaming_url: string) {
  return { type: SET_STREAMING_URL, streaming_url };
}

export function setAuthors(authors: string) {
  return { type: SET_AUTHORS, authors };
}
