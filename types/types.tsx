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
};
export type WordContainer = {
  word: string;
  color: string;
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
