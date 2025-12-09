import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {UserCheck} from 'lucide-react-native';

interface Subscription {
    id: number;
    name: string;
    mutual: boolean;
}

interface SubscriptionCardProps {
    subscription: Subscription;
}

export function SubscriptionCard({subscription}: Readonly<SubscriptionCardProps>) {
    return (<View style={styles.card}>

            <View style={styles.content}>
                <Text style={styles.name}>{subscription.name}</Text>
                <View style={styles.statusContainer}>
                    <UserCheck size={14} color={subscription.mutual ? '#10B981' : '#6B7280'}/>
                    <Text style={styles.status}>
                        {subscription.mutual ? 'Amis' : 'Abonné'}
                    </Text>
                </View>
            </View>

            <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followText}>
                    {subscription.mutual ? 'Amis' : 'Suivi'}
                </Text>
            </TouchableOpacity>
        </View>);
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0, height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
    }, avatar: {
        width: 40, height: 40, borderRadius: 20, marginRight: 12,
    }, content: {
        flex: 1,
    }, name: {
        fontSize: 16, fontWeight: '500', color: '#1F2937', marginBottom: 2,
    }, statusContainer: {
        flexDirection: 'row', alignItems: 'center', gap: 4,
    }, status: {
        fontSize: 12, color: '#6B7280',
    }, followButton: {
        backgroundColor: '#EFF6FF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ff6600',
    }, followText: {
        fontSize: 12, color: '#ff6600', fontWeight: '500',
    },
});
