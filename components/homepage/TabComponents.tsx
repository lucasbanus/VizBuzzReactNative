import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import store from "../../store/store";
import { primaryColors, grayColors } from "../../constants/colors";
import { connect } from "react-redux";

import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer, StackActions } from "@react-navigation/native";

import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { strings } from "../../constants/strings";
import { headerFontSize } from "../../constants/sizes";
import {getHeader} from "../../constants/headerStyles";
//console.log(strings);
i18n.translations = strings;

import PodcastListContainer from "../podcasts/PodcastListContainer";
import SettingsTab from "../SettingsTab";
import LanguagePage from "../LanguagePage";
import { UserLogin } from "../UserLogin";
import { CreateAccount } from "../CreateAccount";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoritePodcastListContainer from "../favoritePage/FavoritePodcastListContainer";
import { setIsUploading, setLanguage } from "../../actions/pageSetupActions";
import {
  getEpisodesInfo,
  getPodcastsFromItunes
} from "../../dataManager/dataManager";

export function HomePage() {
  return (
    <View style={styles.container}>
      <PodcastListContainer />
    </View>
  );
}

export function FavoritePage() {
  return (
    <View style={styles.container}>
      <FavoritePodcastListContainer />
    </View>
  );
}

export function Login() {
  return (
    <View style={styles.container}>
      <UserLogin />
    </View>
  );
}

function addPodcast() {
  return <Text>Hello</Text>;
}

// function browseHeader(props: any) {
//   return (
//     <View style={styles.browseHeader}>
//       <Text style={styles.browseHeaderText}>{i18n.t("browse")}</Text>
//       {/* <TouchableHighlight style={styles.addButton} onPress={() => props.setIsUploading(true)}> */}
//       {/* <Text style={styles.browseHeaderText}>Browse</Text> */}
//     </View>
//   );
// }

const Tab = createBottomTabNavigator();

function MainPage(props: any) {
  i18n.locale = props.language;
  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: any }) => ({
        tabBarIcon: ({ color, size }: { color: string; size: any }) => {
          //(i18n.locale);
          if (route.name === i18n.t("browse")) {
            return <Ionicons name="ios-search" size={size} color={color} />;
          } else if (route.name === i18n.t("settings")) {
            return <Ionicons name="settings" size={size} color={color} />;
          } else if (route.name == i18n.t("favorites")) {
            return <Ionicons name="heart" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: primaryColors.highlights,
        tabBarInactiveTintColor: "gray"
      })}
      initialRouteName={i18n.t("favorites")}
    >
      <Tab.Screen
        name={i18n.t("browse")}
        component={HomePage}
        options={{
          headerTitle: () => getHeader("browse"),
          headerRight: () => (
            <TouchableHighlight
              style={styles.addButton}
              underlayColor={grayColors.light}
              onPress={() => {
                getPodcastsFromItunes("podcast&explicit=no");
                props.navigation.navigate("Search Podcasts", {name: i18n.t("search_podcasts")});
                // props.setIsUploading(true);
              }}
            >
              <Ionicons
                name="add-circle"
                size={30}
                color={primaryColors.highlights}
              />
            </TouchableHighlight>
          )
        }}
      />
      <Tab.Screen name={i18n.t("favorites")} component={FavoritePage} options={{headerTitle: () => getHeader("favorites")}} />
      <Tab.Screen name={i18n.t("settings")} component={SettingsTab} options={{headerTitle: () => getHeader("settings")}} />
    </Tab.Navigator>
  );
}

const mapStateToProps = (state: any) => {
  return {
    language: state.pageSetup.languageCode,
    isUploading: state.pageSetup.isUploading
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setLanguage: (lan: string) => dispatch(setLanguage(lan)),
    setIsUploading: (bool: boolean) => dispatch(setIsUploading(bool))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  // browseHeader: {
  //   flexDirection: "row",
  //   justifyContent: "space-between"
  // },
  // browseHeaderText: {
  //   fontSize: headerFontSize
  // },
  addButton: {
    marginRight: 20,
    justifyContent: "flex-end"
  }
});
