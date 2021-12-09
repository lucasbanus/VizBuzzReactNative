import { StatusBar } from "expo-status-bar";
import React from "react";
import { I18nManager, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer, StackActions } from "@react-navigation/native";

import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { strings } from "../constants/strings";
import {getHeader} from "../constants/headerStyles";
//console.log(strings);
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

//Localization.locale;
i18n.fallbacks = true;
// Set language to this phone's language
//console.log("LOCAL: ", store.getState().pageSetup.languageCode);

export const Stack = createNativeStackNavigator();

export default function MainNavigation() {

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={UserLogin} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} />
          <Stack.Screen
            name="MainApp"
            //component={actualApp}
            component={MainPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Language" component={LanguagePage} options={({route}) => {
              return {title: route.params.name, headerTitle: () => getHeader("language")};}}/>
          <Stack.Screen name="Search Podcasts" component={PodcastSearchPage} options={({route}) => ({title: route.params.name})}/>
          <Stack.Screen name="Browse Episodes" component={BrowseEpisodesPage} options={({route}) => ({title: route.params.name})}/>
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
