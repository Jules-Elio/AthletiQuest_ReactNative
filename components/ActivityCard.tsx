import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Calendar, MapPin, Users, Euro } from 'lucide-react-native';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  type: string;
  price: number;
  image: string;
}

interface ActivityCardProps {
  event: Event;
}

export function ActivityCard({ event }: ActivityCardProps) {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: event.image }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{event.title}</Text>
          <View style={styles.typeContainer}>
            <Text style={styles.type}>{event.type}</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Calendar size={16} color="#6B7280" />
            <Text style={styles.infoText}>{event.date} à {event.time}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <MapPin size={16} color="#6B7280" />
            <Text style={styles.infoText}>{event.location}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Users size={16} color="#6B7280" />
            <Text style={styles.infoText}>{event.participants.toLocaleString()} participants</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Euro size={16} color="#10B981" />
            <Text style={styles.price}>{event.price}€</Text>
          </View>
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinText}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginVertical: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  typeContainer: {
    backgroundColor: '#F0E68C',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  type: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666600',
  },
  infoContainer: {
    gap: 6,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
  },
  joinButton: {
    backgroundColor: '#FF5733',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
  },
  joinText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});