import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import store from "../../store/store";
import { greenColors } from "../../constants/colors";
import { connect } from "react-redux";

import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer, StackActions } from "@react-navigation/native";

import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { strings } from "../../constants/strings";
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

function browseHeader(props: any) {
  return (
    <View style={styles.browseHeader}>
      <Text style={styles.browseHeaderText}>Browse</Text>
      <TouchableHighlight
        style={styles.addButton}
        onPress={() => {
          props.navigation.navigate("Search Podcasts");
          // props.setIsUploading(true);
        }}
      >
        <Ionicons name="add" size={24} color="black" />
      </TouchableHighlight>
    </View>
  );
}

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
        tabBarActiveTintColor: greenColors.deep,
        tabBarInactiveTintColor: "gray"
      })}
      initialRouteName={i18n.t("favorites")}
    >
      <Tab.Screen
        name={i18n.t("browse")}
        component={HomePage}
        options={{ headerTitle: () => browseHeader(props) }}
      />
      <Tab.Screen name={i18n.t("favorites")} component={FavoritePage} />
      <Tab.Screen name={i18n.t("settings")} component={SettingsTab} />
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
  browseHeader: {
    flexDirection: "row"
  },
  browseHeaderText: {
    fontSize: 24
  },
  addButton: {
    justifyContent: "flex-end"
  }
});
