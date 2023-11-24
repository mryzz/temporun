import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";

const Library = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <View style={styles.thumbnail}>
            <Text style={styles.thumbnailText}>A</Text>
          </View>
          <View style={styles.titleContainer}>
            <Text numberOfLines={1} style={styles.title}>
              Long song title, very very very very long text here!
            </Text>
            <Text style={styles.timeText}> 03:59 </Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <Entypo
            name="dots-three-vertical"
            size={24}
            color={color.FONT_MEDIUM}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
