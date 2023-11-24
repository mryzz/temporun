import React, { useState, useCallback } from "react"; 
import { View, Text, StyleSheet } from "react-native";
import { useTheme, Chip } from 'react-native-paper';
import MusicCard from "../components/music_cards";
import { SafeAreaView } from 'react-native-safe-area-context';
import songs from '../assets/data.js';

const chipNames = ['Running', 'Walking', 'Cycling'];

export default function Home() {
  const theme = useTheme();
  const [selectedChip, setSelectedChip] = useState(null);
  const [userName, setUserName] = useState('Yong Ze');

  const handleChipPress = useCallback((chip) => {
    setSelectedChip(chip);
  }, []);

  return (
    <>
      <SafeAreaView style={[styles.topContainer, theme]}>
        <View>
          <Text style={styles.title}>Welcome back, {userName}</Text>
        </View>
        <View style={[styles.subContainer, theme]}>
          {chipNames.map(chipName => (
            <Chip
              key={chipName}
              mode="outlined"
              selected={selectedChip === chipName}
              onPress={() => handleChipPress(chipName)}
            >
              {chipName}
            </Chip>
          ))}
        </View>
      </SafeAreaView>
      <View style={styles.bottomContainer}>
        <MusicCard songs={songs} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: 'flex-start',
    paddingLeft: '5%',
    paddingBottom: 5
  },
  bottomContainer: {
    flex: 7,
    height: '100%', 
    width: "100%",
  },
  title: {
    fontSize: 30, 
    fontWeight: 'bold',
    padding: '5%',
  }
});