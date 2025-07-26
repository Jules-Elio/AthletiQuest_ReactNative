import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {Calendar, MapPin, Users} from 'lucide-react-native';
import * as http from "node:http";

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

interface User {
  id: number;
  name: string;
  email: string;
  isRegistered: boolean;
}

interface EventCardProps {
  event: Event;
  user: User;
}

export function EventCard({ event, user }: Readonly<EventCardProps>) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => openEvent(event)}>
      <Image source={{ uri: event.image }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{event.title}</Text>
          <TouchableOpacity style={styles.joinButton} onPress={() => buttonPressed(event, user)}>
          { user.isRegistered ?
            <Text style={styles.joinedText}>Inscrit</Text> :
            <Text style={styles.joinText}>S'inscrire</Text>
          }
          </TouchableOpacity>
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
      </View>
    </TouchableOpacity>
  );
}

function buttonPressed(event: Event, user: User) {
  let url = `http://localhost:8080/events/${event.id}/`;
  if (user.isRegistered) {
    url += "signout";
  }
  else {
    url += "signup";
  }
  http.request(url, {
    headers: { "Content-Type": "application/json" },
  })
}

function openEvent(event: Event) {

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
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  joinButton: {
    backgroundColor: '#fff',
    borderColor: '#ff6600',
    borderWidth: 2,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
  },
  joinText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  joinedText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
});