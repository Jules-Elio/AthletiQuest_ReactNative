import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/PublicationCardStyles';
import { useNavigation } from '@react-navigation/native';

interface PublicationCardProps {
  title: string;
  content: string;
}

const PublicationCard: React.FC<PublicationCardProps> = ({ title, content }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Detail', {
          type: 'publication',
          data: { title, content },
        })
      }
    >
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{content}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PublicationCard;