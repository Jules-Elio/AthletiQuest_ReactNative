import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/ActivityCardStyles';

interface ActivityCardProps {
  title: string;
  category: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ title, category }) => {
  return (
    <View style={styles.activityCard}>
      <Text style={styles.activityTitle}>{title}</Text>
      <Text style={styles.activityCategory}>{category}</Text>
    </View>
  );
};

export default ActivityCard;