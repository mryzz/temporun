import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView, Dimensions } from "react-native";
// import { AudioContext } from "../context/AudioProvider";
import { RecyclerListView, LayoutProvider } from "recyclerlistview";
import AudioListItem from "../components/audio_items";
import Screen from "../components/screen";
import OptionModal from "../components/option_modal";
import { Audio } from "expo-av";
import { play, pause, resume, playNext } from "../misc/audio_controller";

/**
 * Class representing an AudioList component.
 *
 * This class is used to display a list of audio items. It handles playing, pausing, and resuming audio, as well as selecting different audio items. It also includes an option modal for additional actions on the audio items.
 *
 * Example Usage:
 *
 * import { AudioList } from "./AudioList";
 *
 * // Create an instance of AudioList component
 * const audioList = new AudioList();
 *
 * // Render the component
 * audioList.render();
 *
 * Main functionalities:
 * - Handles playing, pausing, and resuming audio
 * - Selects different audio items
 * - Displays a list of audio items using RecyclerListView
 * - Shows an option modal for additional actions on the audio items
 *
 * Methods:
 * - handleAudioPress(audio): Handles the logic for playing, pausing, resuming, and selecting audio items.
 * - rowRenderer(type, item, index, extendedState): Renders each row in the RecyclerListView with the AudioListItem component.
 * - render(): Renders the AudioList component with the RecyclerListView and OptionModal components.
 *
 * Fields:
 * - layoutProvider: Defines the layout for each row in the RecyclerListView.
 * - currentItem: Stores the currently selected audio item.
 * - state.optionModalVisible: Controls the visibility of the option modal.
 */

export class AudioList extends Component {
  // static contextType = AudioContext;

  constructor(props) {
    super(props);
    this.state = {
      optionModalVisible: false,
    };

    this.currentItem = {};
  }

  layoutProvider = new LayoutProvider(
    (i) => "audio",
    (type, dim) => {
      switch (type) {
        case "audio":
          dim.width = Dimensions.get("window").width;
          dim.height = 70;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    }
  );

  handleAudioPress = async (audio) => {
    const { soundObj, playbackObj, currentAudio, updateState, audioFiles } =
      this.context;
    // playing audio for the first time.
    if (soundObj === null) {
      const playbackObj = new Audio.Sound();
      const status = await play(playbackObj, audio.uri);
      const index = audioFiles.indexOf(audio);
      return updateState(this.context, {
        currentAudio: audio,
        playbackObj: playbackObj,
        soundObj: status,
        isPlaying: true,
        currentAudioIndex: index,
      });
    }

    // pause audio
    if (
      soundObj.isLoaded &&
      soundObj.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await pause(playbackObj);
      return updateState(this.context, { soundObj: status, isPlaying: false });
    }

    // resume audio
    if (
      soundObj.isLoaded &&
      !soundObj.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await resume(playbackObj);
      return updateState(this.context, { soundObj: status, isPlaying: true });
    }

    // select another audio
    if (soundObj.isLoaded && currentAudio.id !== audio.id) {
      const status = await playNext(playbackObj, audio.uri);
      const index = audioFiles.indexOf(audio);
      return updateState(this.context, {
        currentAudio: audio,
        soundObj: status,
        isPlaying: true,
        currentAudioIndex: index,
      });
    }
  };

  rowRenderer = (type, item, index, extendedState) => {
    return (
      <AudioListItem
        title={item.filename}
        isPlaying={extendedState.isPlaying}
        activeListItem={this.context.currentAudioIndex === index}
        duration={item.duration}
        onAudioPress={() => this.handleAudioPress(item)}
        onOptionPress={() => {
          this.currentItem = item;
          this.setState({ ...this.state, optionModalVisible: true });
        }}
      />
    );
  };

  render() {
    return (
      // <AudioContext.Consumer>
      <>
        {({ dataProvider, isPlaying }) => {
          return (
            <Screen>
              <RecyclerListView
                dataProvider={dataProvider}
                layoutProvider={this.layoutProvider}
                rowRenderer={this.rowRenderer}
                extendedState={{ isPlaying }}
              />
              <OptionModal
                onPlayPress={() => console.log("Playig audio")}
                onPlayListPress={() => console.log("adding to the playlist")}
                currentItem={this.currentItem}
                onClose={() =>
                  this.setState({ ...this.state, optionModalVisible: false })
                }
                visible={this.state.optionModalVisible}
              />
            </Screen>
          );
        }}
        {/* </AudioContext.Consumer> */}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AudioList;
