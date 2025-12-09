import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {Calendar, FileText, LogOut, Users} from 'lucide-react-native';
import {Achievement} from '@/components/TrophyCard';
import {PublicationCard} from '@/components/PublicationCard';
import {SubscriptionCard} from '@/components/SubscriptionCard';
import {useSession} from "@/auth/context";
import {Event, EventCard} from "@/components/EventCard";
import {useFocusEffect} from "@react-navigation/native";

export interface User {
    id: string;
    username: string;
    email: string;
    joinDate: Date;
    bio: string;
    follows: User[];
    achievements: Achievement[];
}


export default function ProfileScreen() {

    const {signOut, sessionToken} = useSession();
    const [user, setUser] = useState<User>();
    const [userEvents, setUsersEvents] = useState<Event[]>([]);

    const getUser = useCallback(async () => {
        try {
            if (sessionToken != null) {
                const response = await fetch("http://192.168.0.204:8080/users/current", {
                    method: "GET",
                    headers: {'Authorization': `Bearer ${sessionToken}`, "Content-Type": "application/json"},
                });
                console.log("response", response);
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

    useEffect(() => {
        getUser();
    }, [getUser])

    const publications: any[] = [
    //     {
    //     id: 1,
    //     title: 'Super sortie longue !',
    //     description: '25km dans le bois de Boulogne ce matin',
    //     date: '2 heures',
    //     likes: 24,
    //     comments: 5,
    // }, {
    //     id: 2,
    //     title: 'Nouveau record personnel',
    //     description: '10K en 42:15 ! Objectif sub-40 en vue',
    //     date: '1 jour',
    //     likes: 38,
    //     comments: 12,
    // },
    ];

    const subscriptions: any[] = [
    //     {
    //     id: 1, name: 'Marie Dubois', mutual: true,
    // }, {
    //     id: 2, name: 'Runners de Paris', mutual: false,
    // },
    ];

    const getUserEvents = useCallback(async () => {
        try {
            if (sessionToken != null) {
                const response = await fetch("http://192.168.0.204:8080/events/currentUser/signedin", {
                    method: "GET",
                    headers: {'Authorization': `Bearer ${sessionToken}`, "Content-Type": "application/json"},
                });
                if (response.ok) {
                    const json = await response.json();
                    setUsersEvents(json);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }, [sessionToken])

    const handleEventUpdated = (updated: Event) => {
        setUsersEvents(prev =>
            prev.map(ev => ev.id === updated.id ? updated : ev)
        );
    };

    useFocusEffect(
        useCallback(() => {
            getUserEvents();
        }, [getUserEvents])
    )


    return (<View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.headerContent}>
                <Text style={styles.userName}>{user?.username}</Text>
                <Text style={styles.userBio}>{user?.bio}</Text>
            </View>
            <TouchableOpacity style={styles.settingsButton} onPress={signOut}>
                <LogOut size={20} color="#000"/>
            </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Calendar size={20} color="#2563EB"/>
                    <Text style={styles.sectionTitle}>Mes évènements à venir</Text>
                </View>
                {userEvents.length > 0 ? userEvents.map((event) => (<EventCard key={event.id} event={event} user={user!} onEventUpdated={handleEventUpdated}/>))
                : <Text>Vous n'êtes inscrit à aucun évènement à venir</Text>}
            </View>

            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <FileText size={20} color="#2563EB"/>
                    <Text style={styles.sectionTitle}>Publications récentes</Text>
                </View>
                {publications.length > 0 ? publications.map((publication) => (<PublicationCard key={publication.id} publication={publication}/>))
                    : <Text>Vous n'avez créé aucune publications</Text>}
            </View>

            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Users size={20} color="#2563EB"/>
                    <Text style={styles.sectionTitle}>Abonnements</Text>
                </View>
                {subscriptions.length > 0 ? subscriptions.map((subscription) => (
                    <SubscriptionCard key={subscription.id} subscription={subscription}/>)) : <Text>Vous n'êtes abonné à personne pour le moment</Text>
                 }
            </View>
        </ScrollView>
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
    }, profileImage: {
        width: 60, height: 60, borderRadius: 30, marginRight: 16, borderWidth: 3, borderColor: '#FFFFFF',
    }, userName: {
        fontSize: 24, fontWeight: 'bold', color: '#000',
    }, userBio: {
        fontSize: 16, color: '#00000099', marginTop: 2,
    }, settingsButton: {
        backgroundColor: '#F5F5F5', padding: 8, borderRadius: 8,
    }, statsContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginTop: -10,
        borderRadius: 12,
        padding: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0, height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 2,
    }, statItem: {
        flex: 1, alignItems: 'center',
    }, statValue: {
        fontSize: 24, fontWeight: 'bold', color: '#333',
    }, statLabel: {
        fontSize: 12, color: '#777', marginTop: 4, textAlign: 'center',
    }, content: {
        flex: 1, paddingHorizontal: 20, paddingTop: 24,
    }, section: {
        marginBottom: 32,
    }, sectionHeader: {
        flexDirection: 'row', alignItems: 'center', marginBottom: 16,
    }, sectionTitle: {
        fontSize: 18, fontWeight: '600', color: '#333', marginLeft: 8,
    }
});
