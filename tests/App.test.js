import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react-native";

import App from "./../App";
import { tsExternalModuleReference, exportAllDeclaration } from "@babel/types";

// describe("<App />", () => {
//   it("has 1 child", () => {
//     const tree = renderer.create(<App />).toJSON();
//     expect(tree.children.length).toBe(1);
//   });
// });

test("test the PodcastListContainer", () => {
  render(<PodcastListContainer />);
  // fireEvent.press(getByText('Podcast 1'));

  expect.stringContaining("Your Podcasts");
});
