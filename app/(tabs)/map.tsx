import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as Location from 'expo-location';
import { Route, Share, Navigation } from 'lucide-react-native';
import { SimpleMap, Marker, Polyline } from '@/components/SimpleMap';

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [routePoints, setRoutePoints] = useState<any[]>([]);
  const [isCreatingRoute, setIsCreatingRoute] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleMapPress = (event: any) => {
    if (isCreatingRoute) {
      const { latitude, longitude } = event.nativeEvent.coordinate;
      setRoutePoints([...routePoints, { latitude, longitude }]);
    }
  };

  const clearRoute = () => {
    setRoutePoints([]);
    setIsCreatingRoute(false);
  };

  const shareRoute = () => {
    if (routePoints.length < 2) {
      Alert.alert('Erreur', 'Créez un parcours avec au moins 2 points');
      return;
    }
    Alert.alert('Succès', 'Parcours sauvegardé et prêt à être partagé !');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Navigation libre</Text>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={shareRoute}
          disabled={routePoints.length < 2}
        >
          <Share size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

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
        onPress={handleMapPress}
      />
      <View style={styles.markersOverlay}>
        {routePoints.map((point, index) => (
          <Marker
            key={index}
            coordinate={point}
            title={`Point ${index + 1}`}
          >
            <View style={styles.routeMarker}>
              <Text style={styles.markerText}>{index + 1}</Text>
            </View>
          </Marker>
        ))}
        
        {routePoints.length > 1 && (
          <Polyline
            coordinates={routePoints}
            strokeColor="#2563EB"
            strokeWidth={4}
            lineDashPattern={[5, 5]}
          />
        )}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[
            styles.controlButton,
            isCreatingRoute && styles.activeButton,
          ]}
          onPress={() => setIsCreatingRoute(!isCreatingRoute)}
        >
          <Route size={20} color={isCreatingRoute ? "#FFFFFF" : "#2563EB"} />
          <Text style={[
            styles.controlText,
            isCreatingRoute && styles.activeText,
          ]}>
            {isCreatingRoute ? 'Terminer' : 'Créer parcours'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearRoute}
          disabled={routePoints.length === 0}
        >
          <Text style={styles.clearText}>Effacer</Text>
        </TouchableOpacity>
      </View>

      {routePoints.length > 0 && (
        <View style={styles.routeInfo}>
          <Text style={styles.routeInfoText}>
            Points créés: {routePoints.length}
          </Text>
        </View>
      )}
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  shareButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 8,
    borderRadius: 8,
  },
  map: {
    flex: 1,
  },
  markersOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  routeMarker: {
    backgroundColor: '#ff6600',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  markerText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff6600',
  },
  activeButton: {
    backgroundColor: '#ff6600',
  },
  controlText: {
    marginLeft: 8,
    color: '#ff6600',
    fontWeight: '500',
  },
  activeText: {
    color: '#FFFFFF',
  },
  clearButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#EF4444',
  },
  clearText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  routeInfo: {
    position: 'absolute',
    top: 120,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  routeInfoText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
});