import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/ActivityCardStyles';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Detail: { type: string; data: any };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Detail'>;

interface ActivityCardProps {
  title: string;
  date?: string;
  description?: string;
  category?: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ title, date, description, category }) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Detail', {
          type: 'activity',
          data: { title, date, description, category },
        })
      }
    >
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{title}</Text>
        {date && <Text style={styles.cardDate}>{date}</Text>}
        {description && <Text style={styles.cardDescription}>{description}</Text>}
        {category && <Text style={styles.cardCategory}>{category}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default ActivityCard;