import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {Activity, Award, Target} from 'lucide-react-native';

interface Trophy {
    id: number;
    title: string;
    description: string;
    date: string;
    icon: string;
}

export interface Achievement {
    id: string;
    name: string;
    description: string;
}

interface TrophyCardProps {
    trophy: Trophy;
}

export function TrophyCard({trophy}: Readonly<TrophyCardProps>) {
    const getIcon = () => {
        switch (trophy.icon) {
            case 'marathon':
                return <Target size={24} color="#F97316"/>;
            case 'runs':
                return <Activity size={24} color="#10B981"/>;
            case 'distance':
                return <Award size={24} color="#2563EB"/>;
            default:
                return <Award size={24} color="#6B7280"/>;
        }
    };

    const getIconBackgroundColor = () => {
        switch (trophy.icon) {
            case 'marathon':
                return '#FFF7ED';
            case 'runs':
                return '#ECFDF5';
            case 'distance':
                return '#EFF6FF';
            default:
                return '#F3F4F6';
        }
    };

    return (<TouchableOpacity style={styles.card}>
            <View style={[styles.iconContainer, {backgroundColor: getIconBackgroundColor()}]}>
                {getIcon()}
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>{trophy.title}</Text>
                <Text style={styles.description}>{trophy.description}</Text>
                <Text style={styles.date}>{trophy.date}</Text>
            </View>
        </TouchableOpacity>);
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginRight: 16, width: 200, elevation: 2,

    }, iconContainer: {
        width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 12,
    }, content: {
        gap: 4,
    }, title: {
        fontSize: 16, fontWeight: '600', color: '#1F2937',
    }, description: {
        fontSize: 12, color: '#6B7280', lineHeight: 16,
    }, date: {
        fontSize: 12, color: '#10B981', fontWeight: '500', marginTop: 4,
    },
});
