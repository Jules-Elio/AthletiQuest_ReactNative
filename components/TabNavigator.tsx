import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/TabNavigatorStyles';

interface TabNavigatorProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigator: React.FC<TabNavigatorProps> = ({ selectedTab, onTabChange }) => {
  const tabs = ['Aperçu', 'Trophées', 'Abonnements', 'Publications'];

  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => onTabChange(tab)}
          style={[styles.tabButton, selectedTab === tab && styles.tabButtonActive]}
        >
          <Text style={styles.tabText}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TabNavigator;
