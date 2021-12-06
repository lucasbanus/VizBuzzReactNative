import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import App from "./../App";
import {
  getPodcastsInitialWrapperR,
  getRss,
  formatTime,
  fromPolarityToColor,
  formatSearchQuery
} from "../dataManager/dataManager";

const test_time_1 = 5900000000;
const test_time_1_str = "[9:50]";
const test_time_2 = 9999999999999;
const test_time_2_str = "[16666:40]";
const test_time_3 = 0;
const test_time_3_str = "[0:00]";

test("Test format Time", async () => {
  //expect(dataManager.formatTime(123).length).toBe(1);
  expect(formatTime(test_time_1)).toBe(test_time_1_str);
  expect(formatTime(test_time_2)).toBe(test_time_2_str);
  expect(formatTime(test_time_3)).toBe(test_time_3_str);
});

test("Test polarity to color", async () => {
  expect(fromPolarityToColor(undefined)).toBe("black");
  expect(fromPolarityToColor(1)).toBe("green");
  expect(fromPolarityToColor(1.0)).toBe("green");
  expect(fromPolarityToColor(-1.0)).toBe("red");
  expect(fromPolarityToColor(-2)).toBe("red");
});

test("Test format search query", async () => {
  expect(formatSearchQuery("smoking tire")).toBe("smoking+tire");
});
