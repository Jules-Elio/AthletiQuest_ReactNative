import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ActivityScreen from '../screens/ActivityScreen';
import MapScreen from '../screens/MapScreen';

const Tab = createBottomTabNavigator();

const FooterTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconSize = route.name === 'Home' ? size + 20 : focused ? size + 6 : size;

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
              {route.name === 'Home' && (
                <View style={styles.centerBackground} />
              )}
              <Ionicons name={iconName} size={iconSize} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#D3D3D3' },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
      <Tab.Screen name="Community" component={CommunityScreen} options={{ title: 'Communauté' }} />
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="Activity" component={ActivityScreen} options={{ title: 'Activité' }} />
      <Tab.Screen name="Map" component={MapScreen} options={{ title: 'Map' }} />
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