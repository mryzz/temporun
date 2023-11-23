import React, { useEffect, useState, useMemo } from "react";
import { ImageBackground, StyleSheet, Dimensions, Text } from "react-native";
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";



  const MusicCard = ({ text, imageFiles, imageMapping }) => {
    const [imageSources, setImageSources] = useState([]);

    useEffect(() => {
      const loadImages = async () => {
        const images = await Promise.all(imageFiles.map((file) => imageMapping[file]));
        setImageSources(images);
      };

      loadImages();
    }, []);

    const dataProvider = useMemo(() => new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(imageSources), [imageSources]);

    const layoutProvider = useMemo(() => new LayoutProvider(
      (index) => index,
      (_, dim) => {
        const { width } = Dimensions.get('window');
        const aspectRatio = 16 / 9;
        dim.width = width;
        dim.height = width / aspectRatio;
      }
    ), []);

    const rowRenderer = (_, data) => (
      <ImageBackground source={data} style={styles.musicCover} resizeMode="stretch">
        <Text style={styles.imageText}>{text}</Text>
      </ImageBackground>
    );

    return (
      <RecyclerListView
        dataProvider={dataProvider}
        layoutProvider={layoutProvider}
        rowRenderer={rowRenderer}
      />
    );
  };


const styles = StyleSheet.create({
  musicCover: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "left",
  },
  imageText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    padding: 20,
    marginBottom: 40,
  },
});

export default MusicCard;