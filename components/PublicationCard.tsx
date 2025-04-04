import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/PublicationCardStyles';

interface PublicationCardProps {
  title: string;
  content: string;
}

const PublicationCard: React.FC<PublicationCardProps> = ({ title, content }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{content}</Text>
    </View>
  );
};

export default PublicationCard;
