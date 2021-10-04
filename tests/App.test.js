import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import App from "./../App";
import PodcastList from "../components/podcasts/PodcastList";
import PodcastListContainer from "../components/podcasts/PodcastListContainer";

const names = ["hello1", "hello2", "hello3"];
const open = () => true;
const selectPodcast = () => 0;

// export type Props = {
//   podcastNames: Array<PodcastInfo>;
//   openPodcast: () => void;
//   selectPodcast: (idx: number) => void;
// };

test("test the PodcastListContainer", async () => {
  const { getAllByText, queryByTestId, getByTestId } = render(
    <PodcastList
      podcastNames={names}
      openPodcast={open}
      selectPodcast={selectPodcast}
    />
    // <PodcastListContainer />
  );
  expect(getAllByText("Your Podcasts").length).toBe(1);
  expect(getByTestId("list"));
  // expect(getByTestId("hello1"));
  // expect(key).toEqual("hello1");
  await waitFor(() => {
    expect(getAllByText("hello1"));
    // expect(getByTestId("hello1"));
  });

  // expect(getByTestId('hello1'));
  // expect(getAllByText("hello1").length).toBe(1);
  // expect(getAllByText("hello2").length).toBe(1);
  // expect(getAllByText("hello3").length).toBe(1);
  // expect.stringContaining("Your Podcasts");
  // // expect.stringContaining("blah blahs");
  // // expect.stringContaining("Podcast 2");
  // // expect.stringContaining("Podcast 3");
  // fireEvent.press(getByText("Podcast 1"));
  // expect.stringContaining("Hello1");
});
