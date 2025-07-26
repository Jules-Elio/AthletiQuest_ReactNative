import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {Calendar, MapPin, Users} from 'lucide-react-native';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  type: string;
}

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: Readonly<EventCardProps>) {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Calendar size={20} color="#F97316" />
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.type}>{event.type}</Text>
        </View>
      </View>
      
      <View style={styles.info}>
        <View style={styles.infoRow}>
          <Calendar size={14} color="#6B7280" />
          <Text style={styles.infoText}>{event.date} à {event.time}</Text>
        </View>
        <View style={styles.infoRow}>
          <MapPin size={14} color="#6B7280" />
          <Text style={styles.infoText}>{event.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <Users size={14} color="#6B7280" />
          <Text style={styles.infoText}>{event.participants} participants</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    width: 280,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    backgroundColor: '#FFF7ED',
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  type: {
    fontSize: 12,
    color: '#F97316',
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  info: {
    gap: 6,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
  },
});