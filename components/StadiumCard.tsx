import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {MapPin} from 'lucide-react-native';

interface Coordinate {
    coordinates: number[];
    type: string;
    x: number;
    y: number;
}

export interface Stadium {
    id: string;
    name: string;
    city: string;
    codeInsee: string;
    coordinates: Coordinate;
    description: string;
    freeAccess: string;
    postalCode: string;
}

interface StadiumCardProps {
    stadium: Stadium;
    onPress: () => void;
}

export function StadiumCard({stadium, onPress}: Readonly<StadiumCardProps>) {
    return (<TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <MapPin size={20} color="#10B981"/>
                </View>
                <View style={styles.headerInfo}>
                    <Text style={styles.title}>{stadium.name}</Text>
                    <Text style={styles.address}>{stadium.city}</Text>
                </View>
            </View>

            <View style={styles.info}>
                <Text style={styles.distance}>{stadium.coordinates.x} {stadium.coordinates.y}</Text>
                <View style={styles.facilities}>
                    <Text style={styles.facility}>
                        • {stadium.description}
                    </Text>
                    <Text style={styles.facility}>
                        • Accès libre : {stadium.freeAccess == "true" ? "Oui" : "Non"}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>);
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginRight: 16,
        width: 280,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0, height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    }, header: {
        flexDirection: 'row', alignItems: 'center', marginBottom: 12,
    }, iconContainer: {
        backgroundColor: '#ECFDF5', padding: 8, borderRadius: 8, marginRight: 12,
    }, headerInfo: {
        flex: 1,
    }, title: {
        fontSize: 16, fontWeight: '600', color: '#1F2937',
    }, address: {
        fontSize: 14, color: '#6B7280', marginTop: 2,
    }, info: {
        gap: 8,
    }, distance: {
        fontSize: 14, color: '#2563EB', fontWeight: '500',
    }, facilities: {
        gap: 2,
    }, facility: {
        fontSize: 12, color: '#6B7280',
    },
});
