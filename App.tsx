import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import store from "./store/store";

import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer, StackActions } from "@react-navigation/native";

import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { strings } from "./constants/strings";
//console.log(strings);
i18n.translations = strings;

import PodcastListContainer from "./components/podcasts/PodcastListContainer";
import SettingsTab from "./components/SettingsTab";
import LanguagePage from "./components/LanguagePage";
import PodcastSearchPage from "./components/browsingPodcast/PodcastSearchPage";
import BrowseEpisodesPage from "./components/browsingPodcast/BrowseEpisodesPage";
import { UserLogin } from "./components/UserLogin";
import { CreateAccount } from "./components/CreateAccount";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoritePodcastListContainer from "./components/favoritePage/FavoritePodcastListContainer";
import MainPage from "./components/homepage/TabComponents";
import MainNavigation from "./components/MainNavigation";

//Localization.locale;
i18n.fallbacks = true;
// Set language to this phone's language
i18n.locale = store.getState().pageSetup.languageCode;

export const Stack = createNativeStackNavigator();

export default function App() {
  i18n.locale = store.getState().pageSetup.languageCode;
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  }
});
