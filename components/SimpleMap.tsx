import React from 'react';
import MapView, {
  Marker as MapMarker,
  Polyline as MapPolyline,
  MapPressEvent,
  Region,
} from 'react-native-maps';
import { StyleProp, ViewStyle, StyleSheet, View } from 'react-native';

interface SimpleMapProps {
  style?: StyleProp<ViewStyle>;
  initialRegion: Region;
  showsUserLocation?: boolean;
  showsMyLocationButton?: boolean;
  onPress?: (event: MapPressEvent) => void;
  children?: React.ReactNode;
}

export function SimpleMap({
  style,
  initialRegion,
  showsUserLocation = true,
  showsMyLocationButton = true,
  onPress,
  children,
}: SimpleMapProps) {
  return (
    <View style={[styles.mapContainer, style]}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={initialRegion}
        showsUserLocation={showsUserLocation}
        showsMyLocationButton={showsMyLocationButton}
        onPress={onPress}
      >
        {children}
      </MapView>
    </View>
  );
}

interface MarkerProps {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export function Marker({ coordinate, title, description, children }: MarkerProps) {
  return (
    <MapMarker coordinate={coordinate} title={title} description={description}>
      {children}
    </MapMarker>
  );
}

interface PolylineProps {
  coordinates: {
    latitude: number;
    longitude: number;
  }[];
  strokeColor?: string;
  strokeWidth?: number;
  lineDashPattern?: number[];
}

export function Polyline({
  coordinates,
  strokeColor = '#2563EB',
  strokeWidth = 4,
  lineDashPattern,
}: PolylineProps) {
  return (
    <MapPolyline
      coordinates={coordinates}
      strokeColor={strokeColor}
      strokeWidth={strokeWidth}
      lineDashPattern={lineDashPattern}
    />
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    overflow: 'hidden',
  },
});