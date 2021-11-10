import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import store from "../../store/store";
import { greenColors } from "../../constants/colors";
import { connect } from "react-redux";

import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer, StackActions } from "@react-navigation/native";

import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { strings } from "../../constants/strings.tsx";
//console.log(strings);
i18n.translations = strings;

import PodcastListContainer from "../podcasts/PodcastListContainer";
import SettingsTab from "../SettingsTab";
import LanguagePage from "../LanguagePage";
import { UserLogin } from "../UserLogin";
import { CreateAccount } from "../CreateAccount";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoritePodcastListContainer from "../favoritePage/FavoritePodcastListContainer";

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
      <Tab.Screen name={i18n.t("browse")} component={HomePage} />
      <Tab.Screen name={i18n.t("favorites")} component={FavoritePage} />
      <Tab.Screen name={i18n.t("settings")} component={SettingsTab} />
    </Tab.Navigator>
  );
}

const mapStateToProps = (state: any) => {
    return {
      language: state.pageSetup.languageCode,
    };
  };
  
  const mapDispatchToProps = (dispatch: any) => {
    return {
      setLanguage : (lan : string) => dispatch(setLanguage(lan)),
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
    }
  });
  