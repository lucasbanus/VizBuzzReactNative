import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './store/store';

import PodcastListContainer from './components/podcasts/PodcastListContainer';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <PodcastListContainer />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width : '100%'
  },
});
