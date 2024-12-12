import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../styles/SubscriptionCardStyles';

interface SubscriptionCardProps {
  name: string;
  type: 'Personne' | 'Course';
  profileImage?: string;
}

const defaultProfileImage = 'https://via.placeholder.com/40';

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ name, type, profileImage }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: profileImage || defaultProfileImage }} style={styles.profileImage} />
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{name}</Text>
        <Text style={styles.cardType}>{type}</Text>
      </View>
    </View>
  );
};

export default SubscriptionCard;
