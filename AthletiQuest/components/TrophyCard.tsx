import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/TrophyCardStyles';
import fallbackImage from '../assets/trophy-placeholder.png';
import { useNavigation } from '@react-navigation/native';

interface TrophyCardProps {
  name: string;
  description: string;
  image: string;
}

const TrophyCard: React.FC<TrophyCardProps> = ({ name, description, image }) => {
  const navigation = useNavigation();
  const [imageError, setImageError] = useState(false);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Detail', {
          type: 'trophy',
          data: { name, description, image },
        })
      }
    >
      <View style={styles.trophyCard}>
        <Image
          source={image && !imageError ? { uri: image } : fallbackImage}
          style={styles.trophyImage}
          onError={() => setImageError(true)}
        />
        <View style={styles.trophyInfo}>
          <Text style={styles.cardTitle}>{name}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TrophyCard;