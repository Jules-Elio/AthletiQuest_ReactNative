import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import {Plus, Search} from 'lucide-react-native';
import {EventCard} from '@/components/ActivityCard';
import {User} from "@/app/(tabs)/profile";
import {useSession} from "@/auth/context";

export default function EventsScreen() {
  const [searchText, setSearchText] = useState('');

  const {signOut, sessionToken} = useSession();
  const [user, setUser] = useState<User>();

  const getUser = useCallback(async () => {
    try {
      console.log("token2", sessionToken);
      if (sessionToken != null) {
        const response = await fetch("http://192.168.0.204:8080/users/current", {
          method: "GET",
          headers: {'Authorization': `Bearer ${sessionToken}`, "Content-Type": "application/json"},
        });
        console.log("response", response);
        if (response.ok) {
          const json = await response.json();
          setUser(json);
        } else {
          signOut();
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [sessionToken, signOut])

  useEffect(() => {
    getUser();
  }, [getUser])

  const events = [
    {
      id: 1,
      name: '10K de Paris',
      description: 'Paris',
      createdAt: new Date(),
      startDate: new Date(),
      address: 'Bois de Boulogne',
      participants: [user!],
      owner: user!,
    },
    {
      id: 2,
      name: 'Marathon de Paris',
      description: 'Paris',
      createdAt: new Date(),
      startDate: new Date(),
      address: 'Champs-Élysées',
      participants: [],
      owner: user!,
    },
    {
      id: 3,
      name: 'Semi-Marathon de Vincennes',
      description: 'Paris',
      createdAt: new Date(),
      startDate: new Date(),
      address: 'Bois de Vincennes',
      participants: [],
      owner: user!,
    },
    {
      id: 4,
      name: '5K Nocturne',
      description: 'Paris',
      createdAt: new Date(),
      startDate: new Date(),
      address: 'Parc des Buttes-Chaumont',
      participants: [],
      owner: user!,
    },
  ];

  const filteredEvents = events.filter(event => {
    return event.name.toLowerCase().includes(searchText.toLowerCase()) ||
        event.address.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Évènements</Text>
          <Text style={styles.subtitle}>{filteredEvents.length} évènements</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color="#000"/>
        </TouchableOpacity>
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
          <EventCard key={event.id} event={event} user={user!} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#ff6600',
  }, headerContent: {
    flexDirection: 'column'
  },
  addButton: {
    backgroundColor: '#F5F5F5', padding: 8, borderRadius: 8,
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