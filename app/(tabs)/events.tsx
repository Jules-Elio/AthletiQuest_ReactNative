import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Search, Filter, MapPin, Users, Clock } from 'lucide-react-native';
import { ActivityCard } from '@/components/ActivityCard';

export default function EventsScreen() {
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const events = [
    {
      id: 1,
      title: '10K de Paris',
      date: '15 Mars 2025',
      time: '09:00',
      location: 'Bois de Boulogne',
      participants: 2500,
      image: 'https://images.pexels.com/photos/2803158/pexels-photo-2803158.jpeg?auto=compress&cs=tinysrgb&w=500',
    },
    {
      id: 2,
      title: 'Marathon de Paris',
      date: '20 Avril 2025',
      time: '08:00',
      location: 'Champs-Élysées',
      participants: 50000,
      image: 'https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=500',
    },
    {
      id: 3,
      title: 'Semi-Marathon de Vincennes',
      date: '5 Mai 2025',
      time: '08:30',
      location: 'Bois de Vincennes',
      participants: 8000,
      image: 'https://images.pexels.com/photos/2803158/pexels-photo-2803158.jpeg?auto=compress&cs=tinysrgb&w=500',
    },
    {
      id: 4,
      title: '5K Nocturne',
      date: '12 Juin 2025',
      time: '20:00',
      location: 'Parc des Buttes-Chaumont',
      participants: 1200,
      image: 'https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=500',
    },
  ];

  const filters = [
    { id: 'all', label: 'Tous' },
    { id: '5K', label: '5K' },
    { id: '10K', label: '10K' },
    { id: 'Semi-Marathon', label: 'Semi' },
    { id: 'Marathon', label: 'Marathon' },
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchText.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchText.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || event.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Évènements</Text>
        <Text style={styles.subtitle}>{filteredEvents.length} évènements</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un événement..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>
      <ScrollView 
        style={styles.eventsContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredEvents.map((event) => (
          <ActivityCard key={event.id} event={event} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#ff6600',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    marginTop: 4,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filtersContainer: {
    paddingLeft: 20,
    marginBottom: 16,
    maxHeight: 40,
  },
  filtersContent: {
    paddingRight: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#E0E0E0'
  },
  activeFilterChip: {
    backgroundColor: '#ff6600',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  activeFilterText: {
    color: '#000000',
  },
  eventsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});