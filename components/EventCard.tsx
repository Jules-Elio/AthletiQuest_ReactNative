import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {Calendar, MapPin, NotepadText, Users} from 'lucide-react-native';
import {User} from "@/app/(tabs)/profile";
import {URL_API, useSession} from "@/auth/context";

export interface Event {
    id: number;
    name: string;
    description: string;
    address: string;
    startDate: Date;
    createdAt: Date;
    owner: User;
    participants: User[];
}

interface EventCardProps {
    event: Event;
    user?: User;
    onEventUpdated?: (updatedEvent: Event) => void;
}

export function EventCard({event, user, onEventUpdated}: Readonly<EventCardProps>) {

    const {sessionToken} = useSession();
    console.log(event);
    console.log(user);
    const [isSignedUp, setIsSignedUp] = useState(event.participants.some(p => p.id === user?.id));
    useEffect(() => {
        setIsSignedUp(event.participants.some(p => p.id === user?.id));
    }, [event.participants, user?.id]);

    const buttonPressed = async (event: Event, user: User) => {
        let url = `${URL_API}/events/${event.id}/`;
        if (isSignedUp) {
            url += "signout";
        } else {
            url += "signup";
        }
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {'Authorization': `Bearer ${sessionToken}`, "Content-Type": "application/json"},
            });
            console.log("response", response);
            if (response.ok) {
                const refreshEventResponse = await response.json();
                onEventUpdated?.(refreshEventResponse);
                setIsSignedUp(!isSignedUp);
            } else {
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (<TouchableOpacity style={styles.card}>

        <View style={styles.content}>
            <View style={styles.header}>
                <Text style={styles.title}>{event.name}</Text>
                {sessionToken && user && <TouchableOpacity style={isSignedUp ? styles.joinedButton : styles.joinButton}
                                                           onPress={() => buttonPressed(event, user)}>
                    {isSignedUp ? <Text style={styles.buttonText}>Inscrit</Text> :
                        <Text style={styles.buttonText}>S'inscrire</Text>}
                </TouchableOpacity>}
            </View>

            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <Calendar size={16} color="#6B7280"/>
                    <Text style={styles.infoText}>{new Date(event.startDate).toLocaleDateString()}</Text>
                </View>

                <View style={styles.infoRow}>
                    <NotepadText size={16} color="#6B7280"/>
                    <Text style={styles.infoText}>{event.description}</Text>
                </View>

                <View style={styles.infoRow}>
                    <MapPin size={16} color="#6B7280"/>
                    <Text style={styles.infoText}>{event.address}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Users size={16} color="#6B7280"/>
                    <Text style={styles.infoText}>{event.participants.length.toLocaleString()} participants</Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>);
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginVertical: 10,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0, height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 2,
    }, image: {
        width: '100%', height: 160,
    }, content: {
        padding: 16,
    }, header: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12,
    }, title: {
        fontSize: 18, fontWeight: 'bold', color: '#333', flex: 1, marginRight: 8,
    }, typeContainer: {
        backgroundColor: '#F0E68C', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10,
    }, type: {
        fontSize: 12, fontWeight: '600', color: '#666600',
    }, infoContainer: {
        gap: 6, marginBottom: 16,
    }, infoRow: {
        flexDirection: 'row', alignItems: 'center', gap: 6,
    }, infoText: {
        fontSize: 14, color: '#555',
    }, footer: {
        flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center',
    }, joinedButton: {
        backgroundColor: '#fff',
        borderColor: '#ff6600',
        borderWidth: 2,
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 8,
    }, joinButton: {
        backgroundColor: '#ff6600',
        borderColor: '#ff6600',
        borderWidth: 2,
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 8,
    }, buttonText: {
        color: '#000', fontSize: 14, fontWeight: '500',
    },
});
