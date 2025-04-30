import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import CustomMarkerIcon from '../assets/Vector.svg';

const MapScreen = () => {
  const mapRef = useRef<MapView | null>(null);
  const [addresses, setAddresses] = useState({});

  const events = [
    { id: 1, title: 'Event 1', description: 'Description de l\'événement 1', latitude: 48.8876, longitude: 2.3822 },
    { id: 2, title: 'Event 2', description: 'Description de l\'événement 2', latitude: 48.8370, longitude: 2.3130 },
    { id: 3, title: 'Event 3', description: 'Description de l\'événement 3', latitude: 48.8562, longitude: 2.3515 },
  ];

  useEffect(() => {
    // Récupérer les adresses pour chaque événement
    events.forEach((event) => {
      fetchAddress(event.latitude, event.longitude, event.id);
    });
  }, []);

  const fetchAddress = async (latitude: number, longitude: number, id: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
      );
      const data = await response.json();
      const address = data.display_name || 'Adresse non disponible';
      setAddresses((prevAddresses) => ({
        ...prevAddresses,
        [id]: address,
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'adresse :', error);
    }
  };

  const handleMarkerPress = (latitude: number, longitude: number) => {
    mapRef.current.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000
    );
  };

  const handleEventButtonPress = (eventId: number) => {
    console.log(`Button pressed for event ${eventId}`);
    // Ajoutez ici l'action souhaitée pour le bouton
  };

  const zoomMap = (direction: 'in' | 'out') => {
    const factor = direction === 'in' ? 0.5 : 2;
    const newRegion = {
      ...region,
      latitudeDelta: region.latitudeDelta * factor,
      longitudeDelta: region.longitudeDelta * factor,
    };
  
    setRegion(newRegion); // met à jour l'état
    mapRef.current?.animateToRegion(newRegion, 500); // anime la carte
  };

  const [region, setRegion] = useState({
    latitude: 48.8566,
    longitude: 2.3522,
    latitudeDelta: 0.10,
    longitudeDelta: 0.10,
  });

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        {events.map((event) => (
          <Marker
            key={event.id}
            coordinate={{
              latitude: event.latitude,
              longitude: event.longitude,
            }}
            onPress={() => handleMarkerPress(event.latitude, event.longitude)}
          >
            <CustomMarkerIcon width={30} height={30} />
            {/* Callout personnalisé */}
            <Callout tooltip>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{event.title}</Text>
                <Text style={styles.calloutDescription}>{event.description}</Text>
                <Text style={styles.calloutAddress}>
                  {addresses[event.id] || 'Chargement de l\'adresse...'}
                </Text>
                <TouchableOpacity
                  style={styles.calloutButton}
                  onPress={() => handleEventButtonPress(event.id)}
                >
                  <Text style={styles.calloutButtonText}>Voir plus</Text>
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.zoomControls}>
      <TouchableOpacity style={styles.zoomButton} onPress={() => zoomMap('in')}>
        <Text style={styles.zoomText}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.zoomButton} onPress={() => zoomMap('out')}>
        <Text style={styles.zoomText}>-</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  calloutContainer: {
    width: 200,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  calloutDescription: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  calloutAddress: {
    fontSize: 12,
    marginBottom: 10,
    color: 'gray',
    textAlign: 'center',
  },
  calloutButton: {
    backgroundColor: '#FF6720',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  calloutButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  zoomControls: {
    position: 'absolute',
    left: 10,
    bottom: 40,
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 5,
  },
  zoomButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default MapScreen;