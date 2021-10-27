import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import store from "./store/store";
import { greenColors } from "./constants/colors";

import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer, StackActions } from "@react-navigation/native";

import PodcastListContainer from "./components/podcasts/PodcastListContainer";
import SettingsTab from "./components/SettingsTab";
import { UserLogin } from "./components/UserLogin";
import { CreateAccount } from "./components/CreateAccount";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoritePodcastListContainer from "./components/favoritePage/FavoritePodcastListContainer";

// import { createAppContainer } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";

function HomePage() {
  return (
    <View style={styles.container}>
      <PodcastListContainer />
      {/* <UserLogin /> */}
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

function FavoritePage() {
  return (
    <View style={styles.container}>
      <FavoritePodcastListContainer />
      {/* <PodcastListContainer /> */}
      {/* <UserLogin /> */}
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

function Login() {
  return (
    <View style={styles.container}>
      {/* <PodcastListContainer /> */}
      <UserLogin />
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const Tab = createBottomTabNavigator();

function actualApp() {
  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: any }) => ({
        tabBarIcon: ({ color, size }: { color: string; size: any }) => {
          if (route.name === "Browse") {
            return <Ionicons name="ios-search" size={size} color={color} />;
          } else if (route.name === "Settings") {
            return <Ionicons name="settings" size={size} color={color} />;
          } else if (route.name == "Favorites") {
            return <Ionicons name="heart" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: greenColors.deep,
        tabBarInactiveTintColor: "gray"
      })}
      initialRouteName="Favorites"
    >
      <Tab.Screen name="Browse" component={HomePage} />
      <Tab.Screen name="Favorites" component={FavoritePage}/>
      <Tab.Screen name="Settings" component={SettingsTab} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

// const Navigator = createAppContainer(AppNavigator);

// const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      {/* <Navigator> */}
      {/* <UserLogin /> */}
      {/* </Navigator> */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={UserLogin} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} />
          <Stack.Screen
            name="MainApp"
            component={actualApp}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        {/* <Tab.Navigator
          screenOptions={({ route }: { route: any }) => ({
            tabBarIcon: ({ color, size }: { color: string; size: any }) => {
              if (route.name === "Browse") {
                return <Ionicons name="ios-search" size={size} color={color} />;
              } else if (route.name === "Settings") {
                return <Ionicons name="settings" size={size} color={color} />;
              } else if (route.name == "Favorites") {
                return <Ionicons name="heart" size={size} color={color} />;
              }
            },
            tabBarActiveTintColor: greenColors.deep,
            tabBarInactiveTintColor: "gray"
          })}
        >
          <Tab.Screen name="Browse" component={HomePage} />
          <Tab.Screen name="Favorites" component={HomePage} />
          <Tab.Screen name="Settings" component={SettingsTab} />
        </Tab.Navigator> */}
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
