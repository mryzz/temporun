import React from "react";
import {View, Text, StyleSheet} from "react-native"; 
import { useTheme } from 'react-native-paper';

export default function PLayer() {
  const theme = useTheme();
  return <View style={[styles.container, theme]}>
    <Text>player</Text>
  </View>
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:'center',
    alignItems: 'center'
  }
})