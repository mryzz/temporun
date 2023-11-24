import React, { useEffect, useState, useMemo } from "react";
import { ImageBackground, StyleSheet, Dimensions, Text } from "react-native";
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";

const MusicCard = ({ songs }) => {
  const [imageSources, setImageSources] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const images = await Promise.all(songs.map((song) => song.artwork));
      setImageSources(images);
    };

    loadImages();
  }, [songs]);

  const dataProvider = useMemo(() => new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(songs), [songs]);

const layoutProvider = useMemo(() => new LayoutProvider(
  (index) => index,
  (_, dim) => {
    const { width } = Dimensions.get('window');
    const originalHeight = 200; // Original height of the image
    const aspectRatio = width / originalHeight; // Calculate aspect ratio
    dim.width = width; // Set the width to the window width
    dim.height = originalHeight; // Set a fixed height for each item
    dim.width = dim.height * aspectRatio; // Calculate the corresponding width based on the aspect ratio
  }
), []);


    const rowRenderer = (_, song) => {
      const imageSource = typeof song.artwork === 'string' ? { uri: song.artwork } : song.artwork;

      return (
        <ImageBackground
          source={imageSource}
          style={styles.musicCover}
          resizeMode="stretch"
        >
          <Text style={styles.imageText}>{song.title}</Text>
        </ImageBackground>
      );
    };

  return (
    <RecyclerListView
      dataProvider={dataProvider}
      layoutProvider={layoutProvider}
      rowRenderer={rowRenderer}
      contentContainerStyle={styles.listViewContainer}
      initialRenderIndex={0}
      pageSize={3}
    />
  );
};

const styles = StyleSheet.create({
  musicCover: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "left",
    marginBottom: 0, // Remove marginBottom to eliminate the gap
  },
  imageText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    padding: 20,
    marginBottom: 40,
  },
  listViewContainer: {
    paddingBottom: 0, // Remove paddingBottom to eliminate extra spacing between items
  },
});

export default MusicCard;
