
import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { headerFontSize } from "./sizes";
import i18n from "i18n-js";


export function getHeader(screen_name: string) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{i18n.t(screen_name)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
   
    header: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    headerText: {
      fontSize: headerFontSize
    },
  });