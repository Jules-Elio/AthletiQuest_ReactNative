import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Heart, MessageCircle, Share } from 'lucide-react-native';

interface Publication {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  likes: number;
  comments: number;
}

interface PublicationCardProps {
  publication: Publication;
}

export function PublicationCard({ publication }: PublicationCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: publication.image }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.title}>{publication.title}</Text>
        <Text style={styles.description}>{publication.description}</Text>
        <Text style={styles.date}>Il y a {publication.date}</Text>
        
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Heart size={18} color="#EF4444" />
            <Text style={styles.actionText}>{publication.likes}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle size={18} color="#6B7280" />
            <Text style={styles.actionText}>{publication.comments}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Share size={18} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 14,
    color: '#6B7280',
  },
});