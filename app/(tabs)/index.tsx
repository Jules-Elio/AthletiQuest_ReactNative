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
    latitude?: number,
    longitude?: number,
    searchRadius?: number,
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
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [region, setRegion] = useState({
        latitude: location?.coords.latitude ?? 48.8566,
        longitude: location?.coords.longitude ?? 2.3522,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
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

            const json = await response.json();
            setStadiums(json.stadiums);
            setErrorMessage(null);
        } catch (error) {
            console.error(error);
            setStadiums([]);
            setErrorMessage("Erreur avec le service, réessayer plus tard.");
        }
    }

    useEffect(() => {

        const getLocPerm = async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            let location: Location.LocationObject | null = null;
            if (status === PermissionStatus.GRANTED) {
                location = await Location.getCurrentPositionAsync({});
                setLocation(location);
                animateToRegion(location.coords.latitude, location.coords.longitude, 10);
                setStadiumRequest({
                    ...getStadiumRequest(), latitude: location.coords.latitude, longitude: location.coords.longitude
                });

            }
            await fetchStadiums();
        };

        getLocPerm();
    }, []);

    const mapRef: RefObject<any> = useRef("prout");
    const animateToRegion = (lat: number, lon: number, zoom: number) => {
        let newRegion = {
            latitude: lat, longitude: lon, latitudeDelta: zoom / 100, longitudeDelta: zoom / 100,
        }
        setRegion(newRegion)
        mapRef.current.animateToRegion(newRegion, 1000)
    };

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
                initialRegion={region}
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
