import React, {RefObject, useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import * as Location from 'expo-location';
import {PermissionStatus} from 'expo-location';
import {Search} from 'lucide-react-native';
import {FilterModal} from '@/components/FilterModal';
import MapView, {Marker} from 'react-native-maps';
import {Stadium, StadiumCard} from "@/components/StadiumCard";
import {URL_API} from "@/auth/context";

export interface StadiumSearch {
    name?: string,
    description?: string,
    freeAccess?: boolean,
    city?: string,
    postalCode?: string,
    latitude?: number | null,
    longitude?: number | null,
    searchRadius?: number | null,
    resultsLimit?: number
}

let stadiumRequest: StadiumSearch = {searchRadius: 50000, resultsLimit: 200};

export function getStadiumRequest(): StadiumSearch {
    return stadiumRequest;
}

export function setStadiumRequest(newStadiumRequest: StadiumSearch): void {
    stadiumRequest = newStadiumRequest;
}

export default function HomeScreen() {
    const [showFilters, setShowFilters] = useState(false);
    const [stadiums, setStadiums] = useState<Stadium[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchStadiums = async () => {
        try {
            const response = await fetch(`${URL_API}/stadiums`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(getStadiumRequest()),
            });
            if (response.ok){
                const json = await response.json();
                setStadiums(json.stadiums);
                setErrorMessage(null);
            }
            else {
                stadiumServiceError();
            }
        } catch (error) {
            console.error(error);
            stadiumServiceError();
        }
    }

    const stadiumServiceError = () => {
        setStadiums([]);
        setErrorMessage("Erreur avec le service, réessayer plus tard.");
    }

    useEffect(() => {
        const getLocPerm = async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            let location: Location.LocationObject | null = null;
            if (status === PermissionStatus.GRANTED) {
                await Location.enableNetworkProviderAsync().then(async () => {
                    location = await Location.getCurrentPositionAsync({});
                    animateToRegion(location.coords.latitude, location.coords.longitude, 20);
                    setStadiumRequest({
                        ...getStadiumRequest(), latitude: location.coords.latitude, longitude: location.coords.longitude
                    });
                }).catch(() => {
                    console.info("Geolocalization not activated, proceeding with default value");
                });
            }
        };

        getLocPerm().then(async () => await fetchStadiums());
    }, []);

    const mapRef: RefObject<any> = useRef("prout");
    const animateToRegion = (lat: number, lon: number, zoom: number) => {
        let newRegion = {
            latitude: lat, longitude: lon, latitudeDelta: zoom / 100, longitudeDelta: zoom / 100,
        }
        mapRef.current.animateToRegion(newRegion, 1000)
    };

    useEffect(() => {
        mapRef.current.fitToCoordinates([
            { latitude: 51, longitude: 2 },   // Nord
            { latitude: 43, longitude: 3 },   // Sud
            { latitude: 49, longitude: -4.5 },  // Ouest
            { latitude: 49, longitude: 7.5 },   // Est
        ], {
            edgePadding: { top: 20, bottom: 20, left: 30, right: 50 },
            animated: false,
        });
    }, []);

    return (<View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>AthletiQuest</Text>
            <TouchableOpacity
                style={styles.filterButton}
                onPress={() => setShowFilters(true)}
            >
                <Search size={20} color="#000"/>
            </TouchableOpacity>
        </View>

        <View style={styles.mapContainer}>
            <MapView
                ref={mapRef}
                style={styles.map}
                showsUserLocation={true}
                showsMyLocationButton={true}
            >
                {stadiums.map((stadium) => (<Marker
                    key={stadium.id}
                    coordinate={{
                        latitude: stadium.coordinates.y, longitude: stadium.coordinates.x,
                    }}
                    title={stadium.name}
                    description={stadium.description}
                />))}
            </MapView>
        </View>

        <View style={styles.listContainer}>
            {stadiums.length > 0 ? <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {stadiums.map((stadium) => (<StadiumCard
                    key={stadium.id}
                    stadium={stadium}
                    onPress={() => {
                        animateToRegion(stadium.coordinates.y, stadium.coordinates.x, 0.5)
                    }}/>))}
            </ScrollView> : <Text style={{
                fontSize: 24, justifyContent: "center", alignSelf: "center"
            }}>{errorMessage || "Aucun résultats"}</Text>}
        </View>

        <FilterModal
            visible={showFilters}
            onClose={() => setShowFilters(false)}
            onFilterChanged={() => fetchStadiums()}
        />
    </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#F5F5F5',
    }, header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: '#ff6600',
    }, title: {
        fontSize: 24, fontWeight: 'bold', color: '#000',
    }, filterButton: {
        backgroundColor: '#F5F5F5', padding: 8, borderRadius: 8,
    }, mapContainer: {
        flex: 1,
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0, height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        position: 'relative',
    }, map: {
        width: '100%', height: '100%',
    }, markersOverlay: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none',
    }, stadiumMarker: {
        backgroundColor: '#10B981', padding: 8, borderRadius: 20, borderWidth: 2, borderColor: '#FFFFFF',
    }, eventMarker: {
        backgroundColor: '#F97316', padding: 8, borderRadius: 20, borderWidth: 2, borderColor: '#FFFFFF',
    }, listContainer: {
        paddingVertical: 16, paddingLeft: 16,
    },
});
