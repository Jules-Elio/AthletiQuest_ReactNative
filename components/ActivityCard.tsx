import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {Calendar, MapPin, Users} from 'lucide-react-native';
import {User} from "@/app/(tabs)/profile";
import {useSession} from "@/auth/context";

interface Event {
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
    user: User;
}

export function EventCard({event, user}: Readonly<EventCardProps>) {

    const {sessionToken} = useSession();
    const [isSignedUp, setIsSignedUp] = useState(event.participants.indexOf(user) >= 0);

    const buttonPressed = async (event: Event, user: User) => {
        let url = `http://192.168.0.204:8080/events/${event.id}/`;
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
                setIsSignedUp(!isSignedUp);
            } else {
                setIsSignedUp(!isSignedUp);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (<TouchableOpacity style={styles.card} onPress={() => openEvent(event)}>

            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>{event.name}</Text>
                    <TouchableOpacity style={isSignedUp ? styles.joinButton : styles.joinedButton}
                                      onPress={() => buttonPressed(event, user)}>
                        {isSignedUp ? <Text style={styles.joinedText}>Inscrit</Text> :
                            <Text style={styles.joinText}>S'inscrire</Text>}
                    </TouchableOpacity>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Calendar size={16} color="#6B7280"/>
                        <Text style={styles.infoText}>{event.startDate.toLocaleString()}</Text>
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
    }, joinButton: {
        backgroundColor: '#fff',
        borderColor: '#ff6600',
        borderWidth: 2,
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 8,
    }, joinedButton: {
        backgroundColor: '#ff6600',
        borderColor: '#ff6600',
        borderWidth: 2,
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 8,
    }, joinText: {
        color: '#000', fontSize: 14, fontWeight: '500',
    }, joinedText: {
        color: '#000', fontSize: 14, fontWeight: '500',
    },
});
