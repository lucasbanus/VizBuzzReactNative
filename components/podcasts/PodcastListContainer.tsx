import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import PodcastList from "./PodcastList";
import PodcastTranscriptR from "./PodcastTranscriptR";
import {
  getPodcastsInitialWrapperR,
  getRss,
  getPodcastsFromItunes
} from "../../dataManager/dataManager";
import { greenColors } from "../../constants/colors";
import { connect } from "react-redux";
import i18n from "i18n-js";
import UploadPodcast from "../browsingPodcast/UploadPodcast";

// TODO For rigged demo: retrieving json from local data
const localData = require("./data.json");

export type Props = {
  isLoading: boolean;
  isTranscript: boolean;
  isUploading: boolean;
};

class PodcastListContainer extends React.Component<Props> {
  render() {
    if (this.props.isLoading) {
      getPodcastsInitialWrapperR();
    } else {
    }
    //TODO delete this
    let mainComponent;
    if (this.props.isLoading) {
      mainComponent = <Text>{i18n.t("loading")}</Text>;
    } else if (this.props.isTranscript) {
      mainComponent = <PodcastTranscriptR />;
    } else if (this.props.isUploading) {
      mainComponent = <UploadPodcast />;
    } else {
      mainComponent = <PodcastList />;
    }
    return <View style={styles.container}>{mainComponent}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: greenColors.background,
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  }
});

const mapStateToProps = (state: any) => {
  return {
    isLoading: state.pageSetup.isLoading,
    isTranscript: state.pageSetup.isShowingTranscript,
    isUploading: state.pageSetup.isUploading
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PodcastListContainer);
