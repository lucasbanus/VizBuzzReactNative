// The format used to display
export type PodcastInfo = {
  key: string;
  allText: string;
  name: string;
  color: string;
  idx: number;
};

// The format used to display the words in rigged demo
export type PodcastInfoR = {
  key: string;
  allText: Array<WordContainer>;
  ep_name: string;
  show_name: string;
  idx: number;
  rss_url: string;
  image_url: string;
  streaming_url: string;
  authors: string;
  isFave: boolean;
  transcript_bucket_id: string;
  transcript_file_id: string;
  podcast_id: string;
};
export type WordContainer = {
  word: string;
  color: string;
  size: number;
  weight: string;
};

// The format used to display
export type PodcastInfo2 = {
  key: string;
  allText: string;
  name: string;
  color: string;
  idx: number;
  authors: string;
};

// what is returned from the get request
export type PodcastItems = {
  name: string;
  color: string;
  all_text: string;
  alias: string;
  authors: string;
};

// For the rigged demo
export type PodcastJson = {
  audio_bucket_id: string;
  audio_file_id: string;
  author: string;
  duration: number;
  episode_number: number;
  id: string;
  name: string;
  publish_date: string;
  rss_url: string;
  transcript_bucket_id: string;
  transcript_file_id: string;
  word_info: PodcastWordInfoJson;
};

export type PodcastWordsArrayObject = {
  Duration: number;
  Offset: number;
  Word: string;
  display: string;
  index: number;
  Polarity: number;
};

export type PodcastWordInfoJson = {
  words: Array<PodcastWordsArrayObject>;
};

// For each podcast SHOW from itunes query
export type ItunesPodcastJson = {
  collectionName: string;
  artistName: string;
  feedUrl: string;
  artworkUrl30: string;
};

export type iTunesJson = {
  resultCount: number;
  results: Array<ItunesPodcastJson>;
};

export type EpisodeInfo = {
  authors: string,
  streaming_url: string,
  ep_name: string,
  publish_date: string,
  image: string,
  episode_number: number,
  duration: number,
  rss_url: string,
};

export type PodcastPostRequest = {
  streaming_url: string, // done
  audio_bucket_id: string, //test
  audio_file_id: string, //test
  transcript_bucket_id: string, 
  transcript_file_id: string, //test
  name: string, //the name of the podcast done
  episode_number: number, //done 
  author: string, // done
  publish_date: string, //done
  rss_url: string, //done
  duration: number, //done
};

// For each podcast SHOW from itunes query
export type ItunesPodcastInfo = {
  show_name: string;
  artist: string;
  rss_url: string;
  image_url: string;
};
