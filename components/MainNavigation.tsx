import { StatusBar } from "expo-status-bar";
import React from "react";
import { I18nManager, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer, StackActions } from "@react-navigation/native";

import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { strings } from "../constants/strings";
import { getHeader } from "../constants/headerStyles";
i18n.translations = strings;

import PodcastListContainer from "./podcasts/PodcastListContainer";
import SettingsTab from "./SettingsTab";
import LanguagePage from "./LanguagePage";
import PodcastSearchPage from "./browsingPodcast/PodcastSearchPage";
import BrowseEpisodesPage from "./browsingPodcast/BrowseEpisodesPage";
import { UserLogin } from "./UserLogin";
import { CreateAccount } from "./CreateAccount";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoritePodcastListContainer from "./favoritePage/FavoritePodcastListContainer";
import MainPage from "./homepage/TabComponents";

i18n.fallbacks = true;

export const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={UserLogin}
          options={{ headerTitle: () => getHeader("login") }}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{ headerTitle: () => getHeader("create_account") }}
        />
        <Stack.Screen
          name="MainApp"
          component={MainPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Language"
          component={LanguagePage}
          options={({ route }) => {
            return {
              title: route.params.name,
              headerTitle: () => getHeader("language")
            };
          }}
        />
        <Stack.Screen
          name="Search Podcasts"
          component={PodcastSearchPage}
          options={({ route }) => {
            return {
              title: route.params.name,
              headerTitle: () => getHeader("search_podcasts")
            };
          }}
        />
        <Stack.Screen
          name="Browse Episodes"
          component={BrowseEpisodesPage}
          options={({ route }) => {
            return {
              title: route.params.name,
              headerTitle: () => getHeader("browse_episodes")
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
