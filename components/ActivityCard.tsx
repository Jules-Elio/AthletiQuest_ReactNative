// app/components/ActivityCard.tsx
import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/ActivityCardStyles';

interface ActivityCardProps {
  title: string;
  date?: string;
  description?: string;
  category?: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ title, date, description, category }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {date && <Text style={styles.cardDate}>{date}</Text>}
      {description && <Text style={styles.cardDescription}>{description}</Text>}
      {category && <Text style={styles.cardCategory}>{category}</Text>}
    </View>
  );
};

export default ActivityCard;
