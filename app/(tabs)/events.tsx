import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import {Plus, Search} from 'lucide-react-native';
import {Event, EventCard} from '@/components/EventCard';
import {User} from "@/app/(tabs)/profile";
import {URL_API, useSession} from "@/auth/context";
import {EventModal} from "@/components/EventModal";
import {useFocusEffect} from "@react-navigation/native";

export default function EventsScreen() {
    const [searchText, setSearchText] = useState('');
    const [createEvent, setCreateEvent] = useState(false);


    const {signOut, sessionToken} = useSession();
    const [user, setUser] = useState<User>();
    const [events, setEvents] = useState<Event[]>([]);

    const getUser = useCallback(async () => {
        try {
            if (sessionToken != null) {
                const response = await fetch(`${URL_API}/users/current`, {
                    method: "GET",
                    headers: {'Authorization': `Bearer ${sessionToken}`, "Content-Type": "application/json"},
                });
                if (response.ok) {
                    const json = await response.json();
                    setUser(json);
                } else {
                    signOut();
                }
            }
        } catch (error) {
            console.error(error);
        }
    }, [sessionToken, signOut])

    const getEvents = useCallback(async () => {
        try {
            const response = await fetch(`${URL_API}/events`, {
                method: "Post", headers: {"Content-Type": "application/json"}, body: JSON.stringify({
                    startDate: new Date(new Date().toDateString())
                })
            });
            if (response.ok) {
                const json = await response.json();
                console.log(json);
                setEvents(json);
            }

        } catch (error) {
            console.error(error);
        }
    }, [sessionToken])

    const handleEventUpdated = (updated: Event) => {
        setEvents(prev => prev.map(ev => ev.id === updated.id ? updated : ev));
    };

    useFocusEffect(useCallback(() => {
        getEvents();
    }, [getEvents]))

    useEffect(() => {
        getUser();
    }, [getUser, signOut])

    const filteredEvents = events.filter(event => {
        return event.name.toLowerCase().includes(searchText.toLowerCase()) || event.address.toLowerCase().includes(searchText.toLowerCase());
    });

    return (<View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.headerContent}>
                <Text style={styles.title}>Évènements</Text>
                <Text style={styles.subtitle}>{filteredEvents.length} évènements</Text>
            </View>
            {sessionToken && (<TouchableOpacity style={styles.addButton} onPress={() => {
                setCreateEvent(true)
            }}>
                <Plus size={20} color="#000"/>
            </TouchableOpacity>)}
        </View>

        <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
                <Search size={20} color="#6B7280" style={styles.searchIcon}/>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Rechercher un événement..."
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholderTextColor="#9CA3AF"
                />
            </View>
        </View>
        <ScrollView
            style={styles.eventsContainer}
            showsVerticalScrollIndicator={false}
        >
            {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} user={user} onEventUpdated={handleEventUpdated}/>))}
        </ScrollView>
        {sessionToken && <EventModal visible={createEvent} onClose={() => {
            setCreateEvent(false);
            getEvents();
        }} user={user!}/>}
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
    }, headerContent: {
        flexDirection: 'column'
    }, addButton: {
        backgroundColor: '#F5F5F5', padding: 8, borderRadius: 8,
    }, title: {
        fontSize: 28, fontWeight: 'bold', color: '#000',
    }, subtitle: {
        fontSize: 16, color: '#000', marginTop: 4,
    }, searchContainer: {
        paddingHorizontal: 20, paddingVertical: 16,
    }, searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0, height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 2,
    }, searchIcon: {
        marginRight: 12,
    }, searchInput: {
        flex: 1, fontSize: 16, color: '#333',
    }, filtersContainer: {
        paddingLeft: 20, marginBottom: 16, maxHeight: 40,
    }, filtersContent: {
        paddingRight: 20,
    }, filterChip: {
        paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 12, backgroundColor: '#E0E0E0'
    }, activeFilterChip: {
        backgroundColor: '#ff6600',
    }, filterText: {
        fontSize: 14, fontWeight: '500', color: '#333',
    }, activeFilterText: {
        color: '#000000',
    }, eventsContainer: {
        flex: 1, paddingHorizontal: 20,
    },
});
