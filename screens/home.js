import React, { useState } from "react"; 
import { View, Text, StyleSheet } from "react-native";
import { useTheme, Chip } from 'react-native-paper';

export default function Home() {
  const theme = useTheme();
  const [selectedChip, setSelectedChip] = useState(null);

  const handleChipPress = (chip) => {
    setSelectedChip(chip);
    console.log(chip);
  };

  return (
    <>
      <View style={[styles.container, theme]}>
        <Text>Welcome, Yong Ze</Text>
      </View>
      <View style={[styles.container, theme]}>
        <Chip
          mode="outlined"
          selected={selectedChip === 'Running'}
          onPress={() => handleChipPress('Running')}
        >
          Running
        </Chip>
        <Chip
          mode="outlined"
          selected={selectedChip === 'Walking'}
          onPress={() => handleChipPress('Walking')}
        >
          Walking
        </Chip>
        <Chip
          mode="outlined"
          selected={selectedChip === 'Cycling'}
          onPress={() => handleChipPress('Cycling')}
        >
          Cycling
        </Chip>
      </View>
      <View style={styles.bottomContainer}>
        {/* Render your music cards here */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    flexDirection: "row", // Change this line
    justifyContent: 'center',
    alignItems: 'center',
  },
  sub: {
sub: {
  flex: 1,
  justifyContent: 'flex-start',
  // Remove or change the flexDirection property
},
  }
});