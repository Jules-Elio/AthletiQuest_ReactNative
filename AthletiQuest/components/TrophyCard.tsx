import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../styles/TrophyCardStyles';

interface TrophyCardProps {
  name: string;
  description: string;
  image: string;
}

const TrophyCard: React.FC<TrophyCardProps> = ({ name, description, image }) => {
  return (
    <View style={styles.trophyCard}>
      <Image source={{ uri: image }} style={styles.trophyImage} />
      <View style={styles.trophyInfo}>
        <Text style={styles.cardTitle}>{name}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </View>
  );
};

export default TrophyCard;
