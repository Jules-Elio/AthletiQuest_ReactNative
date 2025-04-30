// FooterTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ActivityScreen from '../screens/ActivityScreen';
import MapScreen from '../screens/MapScreen';
import DetailScreen from '../screens/DetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DetailStack = ({ component }: { component: React.ComponentType }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Main"
      component={component}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Detail"
      component={DetailScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const FooterTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          const iconSize = focused ? size + 6 : size;
          switch (route.name) {
            case 'Home':
              iconName = 'globe-outline';
              break;
            case 'Profile':
              iconName = 'person-outline';
              break;
            case 'Community':
              iconName = 'people-outline';
              break;
            case 'Activity':
              iconName = 'clipboard-outline';
              break;
            case 'Map':
              iconName = 'map-outline';
              break;
            default:
              iconName = 'ellipse-outline';
              break;
          }

          return (
            <View style={styles.iconWrapper}>
              {route.name === 'Home' && <View style={styles.centerBackground} />}
              <Ionicons name={iconName} size={iconSize} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#D3D3D3' },
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Profile" children={() => <DetailStack component={ProfileScreen} />} />
      <Tab.Screen name="Community" children={() => <DetailStack component={CommunityScreen} />} />
      <Tab.Screen name="Home" children={() => <DetailStack component={HomeScreen} />} />
      <Tab.Screen name="Activity" children={() => <DetailStack component={ActivityScreen} />} />
      <Tab.Screen name="Map" children={() => <DetailStack component={MapScreen} />} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerBackground: {
    position: 'absolute',
    top: -20,
    width: 85,
    height: 80,
    backgroundColor: '#D3D3D3',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    zIndex: -1,
  },
});

export default FooterTabNavigator;