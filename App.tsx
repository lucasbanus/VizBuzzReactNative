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
import { strings } from "./constants/strings.tsx";
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

//Localization.locale;
i18n.fallbacks = true;
// Set language to this phone's language
//i18n.locale = Localization.locale;
i18n.locale = store.getState().pageSetup.languageCode;
//console.log("LOCAL: ", store.getState().pageSetup.languageCode);

// function HomePage() {
//   return (
//     <View style={styles.container}>
//       <PodcastListContainer />
//     </View>
//   );
// }

// function FavoritePage() {
//   return (
//     <View style={styles.container}>
//       <FavoritePodcastListContainer />
//     </View>
//   );
// }

// function Login() {
//   return (
//     <View style={styles.container}>
//       <UserLogin />
//     </View>
//   );
// }

// const Tab = createBottomTabNavigator();

// function actualApp() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }: { route: any }) => ({
//         tabBarIcon: ({ color, size }: { color: string; size: any }) => {
//           //(i18n.locale);
//           if (route.name === i18n.t("browse")) {
//             return <Ionicons name="ios-search" size={size} color={color} />;
//           } else if (route.name === "Settings") {
//             return <Ionicons name="settings" size={size} color={color} />;
//           } else if (route.name == "Favorites") {
//             return <Ionicons name="heart" size={size} color={color} />;
//           }
//         },
//         tabBarActiveTintColor: greenColors.deep,
//         tabBarInactiveTintColor: "gray"
//       })}
//       initialRouteName="Favorites"
//     >
//       <Tab.Screen name={i18n.t("browse")} component={HomePage} />
//       <Tab.Screen name="Favorites" component={FavoritePage} />
//       <Tab.Screen name="Settings" component={SettingsTab} />
//     </Tab.Navigator>
//   );
// }

export const Stack = createNativeStackNavigator();

export default function App() {
  i18n.locale = store.getState().pageSetup.languageCode;
  //console.log("Locales App.tsx: ", i18n.locale);
  return (
    <Provider store={store}>
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
          <Stack.Screen name="Language" component={LanguagePage} />
          <Stack.Screen name="Search Podcasts" component={PodcastSearchPage} />
          <Stack.Screen name="Browse Episodes" component={BrowseEpisodesPage} />
        </Stack.Navigator>
      </NavigationContainer>
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
