import React, { useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import CustomMarkerIcon from '../assets/Vector.svg';

const MapScreen = () => {
  const mapRef = useRef(null); // Référence pour accéder à MapView

  const events = [
    { id: 1, title: 'Event 1', description: 'Description de l\'événement 1', latitude: 48.8876, longitude: 2.3822 },
    { id: 2, title: 'Event 2', description: 'Description de l\'événement 2', latitude: 48.8370, longitude: 2.3130 },
    { id: 3, title: 'Event 3', description: 'Description de l\'événement 3', latitude: 48.8562, longitude: 2.3515 },
  ];

  const handleMarkerPress = (latitude, longitude) => {
    mapRef.current.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: 0.01, // Zoom rapproché
        longitudeDelta: 0.01, // Zoom rapproché
      },
      1000 // Durée de l'animation en millisecondes
    );
  };

  const handleEventButtonPress = (eventId) => {
    console.log(`Button pressed for event ${eventId}`);
    // Ajoutez ici l'action souhaitée pour le bouton
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef} // Référence MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.8566,
          longitude: 2.3522,
          latitudeDelta: 0.10,
          longitudeDelta: 0.10,
        }}
      >
        {events.map((event) => (
          <Marker
            key={event.id}
            coordinate={{
              latitude: event.latitude,
              longitude: event.longitude,
            }}
            onPress={() => handleMarkerPress(event.latitude, event.longitude)} // Gérer le clic
          >
            <CustomMarkerIcon width={30} height={30} />
            {/* Callout personnalisé */}
            <Callout tooltip>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{event.title}</Text>
                <Text style={styles.calloutDescription}>{event.description}</Text>
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
});

export default MapScreen;