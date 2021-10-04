// The format used to display
export type PodcastInfo = {
  key: string;
  allText: string;
  name: string;
  color: string;
  idx: number;
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
