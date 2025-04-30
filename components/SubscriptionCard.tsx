import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/SubscriptionCardStyles';
import defaultProfileImage from '../assets/profile-placeholder.png';
import { useNavigation } from '@react-navigation/native';

interface SubscriptionCardProps {
  name: string;
  type: 'Personne' | 'Course';
  profileImage?: string;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ name, type, profileImage }) => {
  const navigation = useNavigation();
  const [imageError, setImageError] = useState(false);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Detail', {
          type: 'subscription',
          data: { name, type, profileImage },
        })
      }
    >
      <View style={styles.card}>
        <Image
          source={profileImage && !imageError ? { uri: profileImage } : defaultProfileImage}
          style={styles.profileImage}
          onError={() => setImageError(true)}
        />
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{name}</Text>
          <Text style={styles.cardType}>{type}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SubscriptionCard;