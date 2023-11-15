import React, { createContext, Component } from "react";
import { View, Text, Alert, Linking, Permissions } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { getAll, getAlbums, searchSongs } from "react-native-get-music-files";

export const AudioContext = createContext();

export class AudioProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioFiles: [],
      permissionError: false,
    };
  }

  // If the user doesnt grant permission when the app first ask, display warning.
  // TODO: Change to diabling the function for the user. Only allow again once user grant the setting.
  // Continue: The Audio_list page will now tell the user to allow permission to use the function
  // I want to make it a music streaming app, but the user can upload their own music files to the app
  permissionAlert = () => {
    Alert.alert(
      "Permission required",
      "You are required to grant permission to use this function!",
      [
        {
          text: "I'm ready ",
          onPress: () => {
            this.getPermission();
          },
        },
        {
          text: "Do not grant permission",
          onPress: () => {
            this.permissionAlert();
          },
        },
      ]
    );
  };

  // Get audio files
  getAudioFiles = async () => {
    const audio = await getAll({
      limit: 20,
      offset: 0,
      coverQuality: 50,
      minSongDuration: 1000,
    });
    console.log(audio);
  };

  // 2. // Async is used when expect long wait by the user to grant permission, concurrently running other task of the program
  getPermission = async () => {
    const permission = await MediaLibrary.requestPermissionsAsync();
    MediaLibrary.getPermissionsAsync();
    if (permission.granted) {
      // get all the audio files
      this.getAudioFiles();
    }

    if (!permission.granted && permission.canAskAgain) {
      const { canAskAgain, status } = await MediaLibrary.getPermissionsAsync();
      if ((status = "denied" && canAskAgain)) {
        // Display alert to the user he needs to grant permission to use this function
        permission.Alert();
      }
      if ((status = "granted")) {
        this.getAudioFiles();
        // get all the audio files
      }

      if ((status = "denied" && !canAskAgain)) {
        // Display error to the user he needs to grant permission to use this function
        this.setState({ ...this.state, permissionError: true });
      }
    }

    if (!permission.granted && !permission.canAskAgain) {
      //If the user press do not ask again, prompt them to setting and get them to allow
      Alert.alert(
        "Permission required",
        "You are now redirected to setting to allow permission",
        [
          {
            text: "I'm ready ",
            onPress: () => {
              Linking.openSettings();
            },
          },
          {
            text: "Do not grant permission",
          },
        ]
      );
    }
  };

  // 1. Ask for permission from user to get their audio data after page is loaded.
  componentDidMount() {
    this.getPermission();
  }

  render() {
    // If the user do not give permission, show them this error message
    if (this.state.permissionError) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text> You need to grant permission to use this function</Text>
        </View>
      );
    }
    // Give this "magical box" containing the request for the audio data to app.js
    return (
      <AudioContext.Provider value={this.getAudioFiles.name}>
        {this.props.children}
      </AudioContext.Provider>
    );
  }
}
