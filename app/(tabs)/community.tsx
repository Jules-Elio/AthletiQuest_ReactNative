import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {UserPlus, Users} from 'lucide-react-native';

export default function CommunityScreen() {
    const [activeTab, setActiveTab] = useState<'friends' | 'groups'>('friends');

    const friends = [{
        id: 1, name: 'Marie Dubois', status: 'En ligne', lastRun: '5K - il y a 2h', weeklyKm: 25,
    }, {
        id: 2, name: 'Thomas Martin', status: 'Hors ligne', lastRun: '10K - hier', weeklyKm: 32,
    }, {
        id: 3, name: 'Sarah Johnson', status: 'En course', lastRun: 'Marathon - en cours', weeklyKm: 45,
    },];

    const groups = [{
        id: 1,
        name: 'Runners de Paris',
        members: 1247,
        description: 'Groupe de coureurs passionnés de la capitale',
        nextEvent: '10K du Trocadéro - 15 Mars',
    }, {
        id: 2,
        name: 'Marathon Club',
        members: 856,
        description: 'Préparation marathon et conseils',
        nextEvent: 'Sortie longue 25K - 18 Mars',
    },];

    const renderFriends = () => (<ScrollView showsVerticalScrollIndicator={false}>
        {friends.map((friend) => (<View key={friend.id} style={styles.friendCard}>
            <View style={styles.friendInfo}>
                <View style={styles.friendHeader}>
                    <Text style={styles.friendName}>{friend.name}</Text>
                </View>
                <Text style={styles.lastRun}>{friend.lastRun}</Text>
                <Text style={styles.weeklyKm}>{friend.weeklyKm}km cette semaine</Text>
            </View>
        </View>))}
    </ScrollView>);

    const renderGroups = () => (<ScrollView showsVerticalScrollIndicator={false}>
        {groups.map((group) => (<View key={group.id} style={styles.groupCard}>
            <View style={styles.groupInfo}>
                <Text style={styles.groupName}>{group.name}</Text>
                <Text style={styles.groupDescription}>{group.description}</Text>
                <View style={styles.groupStats}>
                    <View style={styles.statItem}>
                        <Users size={16} color="#6B7280"/>
                        <Text style={styles.statText}>{group.members} membres</Text>
                    </View>
                </View>
                <Text style={styles.nextEvent}>Prochain: {group.nextEvent}</Text>
            </View>
        </View>))}
    </ScrollView>);

    return (<View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>Communauté</Text>
            <TouchableOpacity style={styles.addButton}>
                <UserPlus size={20} color="#000"/>
            </TouchableOpacity>
        </View>

        <View style={styles.tabContainer}>
            <TouchableOpacity
                style={[styles.tab, activeTab === 'friends' && styles.activeTab]}
                onPress={() => setActiveTab('friends')}
            >
                <Text style={[styles.tabText, activeTab === 'friends' && styles.activeTabText]}>
                    Amis ({friends.length})
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tab, activeTab === 'groups' && styles.activeTab]}
                onPress={() => setActiveTab('groups')}
            >
                <Text style={[styles.tabText, activeTab === 'groups' && styles.activeTabText]}>
                    Groupes ({groups.length})
                </Text>
            </TouchableOpacity>
        </View>

        <View style={styles.content}>
            {activeTab === 'friends' ? renderFriends() : renderGroups()}
        </View>
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
        fontSize: 28, fontWeight: 'bold', color: '#000',
    }, addButton: {
        backgroundColor: '#F5F5F5', padding: 8, borderRadius: 8,
    }, tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginTop: 16,
        borderRadius: 12,
        padding: 4,
    }, tab: {
        flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 8,
    }, activeTab: {
        backgroundColor: '#ff6600',
    }, tabText: {
        fontSize: 16, fontWeight: '500', color: '#333',
    }, activeTabText: {
        color: '#000',
    }, content: {
        flex: 1, paddingHorizontal: 20, paddingTop: 16,
    }, friendCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0, height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 2,
    }, avatar: {
        width: 50, height: 50, borderRadius: 25, marginRight: 12,
    }, friendInfo: {
        flex: 1,
    }, friendHeader: {
        flexDirection: 'row', alignItems: 'center', marginBottom: 4,
    }, friendName: {
        fontSize: 16, fontWeight: '600', color: '#1F2937', marginRight: 8,
    }, statusIndicator: {
        width: 8, height: 8, borderRadius: 4,
    }, lastRun: {
        fontSize: 14, color: '#6B7280', marginBottom: 2,
    }, weeklyKm: {
        fontSize: 12, color: '#10B981', fontWeight: '500',
    }, messageButton: {
        padding: 8,
    }, groupCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0, height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    }, groupImage: {
        width: '100%', height: 120,
    }, groupInfo: {
        padding: 16,
    }, groupName: {
        fontSize: 18, fontWeight: '600', color: '#1F2937', marginBottom: 4,
    }, groupDescription: {
        fontSize: 14, color: '#6B7280', marginBottom: 12,
    }, groupStats: {
        flexDirection: 'row', alignItems: 'center', marginBottom: 8,
    }, statItem: {
        flexDirection: 'row', alignItems: 'center',
    }, statText: {
        fontSize: 14, color: '#6B7280', marginLeft: 4,
    }, nextEvent: {
        fontSize: 14, color: '#2563EB', fontWeight: '500',
    },
});
