import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FooterTabNavigator from './navigation/FooterTabNavigator';
import GlobalFAB from './components/GlobalFAB';
import DetailScreen from './screens/DetailScreen';
import { View, SafeAreaView, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.appContainer}>
      <SafeAreaView style={styles.safeTop} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={FooterTabNavigator} />
          <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
        <GlobalFAB />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#D3D3D3', // bas par défaut
  },
  safeTop: {
    backgroundColor: '#F5F5F5', // haut
    paddingTop: 40, // ou StatusBar.currentHeight pour Android
  },
});