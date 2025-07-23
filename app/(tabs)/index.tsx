import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import * as Location from 'expo-location';
import { Filter, MapPin, Calendar } from 'lucide-react-native';
import { FilterModal } from '@/components/FilterModal';
import { StadiumCard } from '@/components/StadiumCard';
import { EventCard } from '@/components/EventCard';
import { SimpleMap, Marker } from '@/components/SimpleMap';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'stadiums' | 'events'>('all');
  const [stadiums, setStadiums] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    // Mock data - replace with actual API calls
    setStadiums([
      {
        id: 1,
        name: 'Stade Jean Bouin',
        address: 'Paris 16e',
        distance: '2.1 km',
        facilities: ['Piste 400m', 'Vestiaires', 'Tribunes'],
        latitude: 48.8584,
        longitude: 2.2945,
      },
      {
        id: 2,
        name: 'Stade Charléty',
        address: 'Paris 13e',
        distance: '4.7 km',
        facilities: ['Piste 400m', 'Saut en longueur', 'Lancer'],
        latitude: 48.8186,
        longitude: 2.3448,
      },
    ]);

    setEvents([
      {
        id: 1,
        title: '10K de Paris',
        date: '15 Mars 2025',
        time: '09:00',
        location: 'Bois de Boulogne',
        participants: 2500,
        type: '10K',
        latitude: 48.8620,
        longitude: 2.2640,
      },
      {
        id: 2,
        title: 'Marathon de Paris',
        date: '20 Avril 2025',
        time: '08:00',
        location: 'Champs-Élysées',
        participants: 50000,
        type: 'Marathon',
        latitude: 48.8738,
        longitude: 2.2950,
      },
    ]);
  }, []);

  const filteredStadiums = activeFilter === 'events' ? [] : stadiums;
  const filteredEvents = activeFilter === 'stadiums' ? [] : events;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Athlétisme</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Filter size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.mapContainer}>
        <SimpleMap
          style={styles.map}
          initialRegion={{
            latitude: location?.coords.latitude || 48.8566,
            longitude: location?.coords.longitude || 2.3522,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
        />
        <View style={styles.markersOverlay}>
          {filteredStadiums.map((stadium) => (
            <Marker
              key={`stadium-${stadium.id}`}
              coordinate={{
                latitude: stadium.latitude,
                longitude: stadium.longitude,
              }}
              title={stadium.name}
              description={stadium.address}
            >
              <View style={styles.stadiumMarker}>
                <MapPin size={20} color="#FFFFFF" />
              </View>
            </Marker>
          ))}
          
          {filteredEvents.map((event) => (
            <Marker
              key={`event-${event.id}`}
              coordinate={{
                latitude: event.latitude,
                longitude: event.longitude,
              }}
              title={event.title}
              description={event.date}
            >
              <View style={styles.eventMarker}>
                <Calendar size={20} color="#FFFFFF" />
              </View>
            </Marker>
          ))}
        </View>
      </View>

      <View style={styles.listContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {activeFilter !== 'events' && filteredStadiums.map((stadium) => (
            <StadiumCard key={stadium.id} stadium={stadium} />
          ))}
          
          {activeFilter !== 'stadiums' && filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </ScrollView>
      </View>

      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
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
    backgroundColor: '#FF5733',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  filterButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 8,
    borderRadius: 8,
  },
  mapContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  markersOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  stadiumMarker: {
    backgroundColor: '#10B981',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  eventMarker: {
    backgroundColor: '#F97316',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  listContainer: {
    paddingVertical: 16,
    paddingLeft: 16,
  },
});