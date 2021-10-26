import React from "react";
import * as rssParser from "react-native-rss-parser";

import {
  getEpisodeAuthors,
  getStreamingUrlFromRss,
  findEpisode
} from "../dataManager/dataManager";
const test_time_1 = 5900000000;
const test_time_1_str = "[9:50]";
const test_time_2 = 9999999999999;
const test_time_2_str = "[16666:40]";
const test_time_3 = 0;
const test_time_3_str = "[0:00]";
const TEST_RSS_URL_1 = "https://feeds.megaphone.fm/sofia-with-an-f";
const test_rss = require("./rss_response_test.json");

test("Test find episode by title", async () => {
  let rss_text = JSON.stringify(test_rss);
  let rss_json = rssParser.parse(rss_text);
});
