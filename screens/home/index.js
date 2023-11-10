import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Favorite from "../favorite/favorite";
import Feed from "../feed/feed";
import Library from "../library/library";
import Player from "../player/player";
import Trending from "../trending/trending";
import styles from "./home_style";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const Home = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Library} />
          <Stack.Screen name="Feed" component={Feed} />
          <Stack.Screen name="Player" component={Player} />
          <Stack.Screen name="Favorite" component={Favorite} />
          <Stack.Screen name="Trending" component={Trending} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default Home;

//   return (
//     <>
//       <SafeAreaView style={styles.wrapper}>
//         <View style={styles.container}>
//           <FontAwesome5 name="running" size={24} color="black" />
//           <Text>TempoRun</Text>
//           <Text style={styles.welcome}>Welcome</Text>
//           <Text style={styles.description}>Discover Music on Your Feet</Text>
//         </View>
//       </SafeAreaView>
//     </>
//   );

//   const styles = StyleSheet.create({
//     container: {
//       backgroundColor: "pink",
//       flex: 1,
//       alignItems: "center",
//     },
//     wrapper: {
//       flex: 1,
//     },
//     welcome: {
//       fontSize: 48,
//       color: "black",
//     },
//     description: {
//       fontSize: 30,
//       color: "black",
//     },
//   });
// }
