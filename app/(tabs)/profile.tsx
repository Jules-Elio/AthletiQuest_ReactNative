import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Settings, Award, FileText, Users, ChartBar as BarChart3 } from 'lucide-react-native';
import { TrophyCard } from '@/components/TrophyCard';
import { PublicationCard } from '@/components/PublicationCard';
import { SubscriptionCard } from '@/components/SubscriptionCard';

export default function ProfileScreen() {
  const user = {
    name: 'Alex Runner',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
    totalKm: 2847,
    totalRuns: 156,
    avgPace: '4:32',
    level: 'Habitué de course à pied\nCourir fait du bien',
  };

  const trophies = [
    {
      id: 1,
      title: 'Premier Marathon',
      description: 'Terminer votre premier marathon',
      date: '15 Oct 2024',
      icon: 'marathon',
    },
    {
      id: 2,
      title: '100 courses',
      description: 'Compléter 100 courses',
      date: '3 Nov 2024',
      icon: 'runs',
    },
    {
      id: 3,
      title: '1000km Total',
      description: 'Courir 1000km au total',
      date: '20 Déc 2024',
      icon: 'distance',
    },
  ];

  const publications = [
    {
      id: 1,
      title: 'Super sortie longue !',
      description: '25km dans le bois de Boulogne ce matin',
      date: '2 heures',
      image: 'https://images.pexels.com/photos/2803158/pexels-photo-2803158.jpeg?auto=compress&cs=tinysrgb&w=300',
      likes: 24,
      comments: 5,
    },
    {
      id: 2,
      title: 'Nouveau record personnel',
      description: '10K en 42:15 ! Objectif sub-40 en vue',
      date: '1 jour',
      image: 'https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=300',
      likes: 38,
      comments: 12,
    },
  ];

  const subscriptions = [
    {
      id: 1,
      name: 'Marie Dubois',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=100',
      mutual: true,
    },
    {
      id: 2,
      name: 'Runners de Paris',
      avatar: 'https://images.pexels.com/photos/2803158/pexels-photo-2803158.jpeg?auto=compress&cs=tinysrgb&w=100',
      mutual: false,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image source={{ uri: user.avatar }} style={styles.profileImage} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userLevel}>{user.level}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.totalKm}</Text>
          <Text style={styles.statLabel}>km total</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.totalRuns}</Text>
          <Text style={styles.statLabel}>courses</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.avgPace}</Text>
          <Text style={styles.statLabel}>allure moy.</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Award size={20} color="#2563EB" />
            <Text style={styles.sectionTitle}>Trophées récents</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {trophies.map((trophy) => (
              <TrophyCard key={trophy.id} trophy={trophy} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FileText size={20} color="#2563EB" />
            <Text style={styles.sectionTitle}>Publications récentes</Text>
          </View>
          {publications.map((publication) => (
            <PublicationCard key={publication.id} publication={publication} />
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Users size={20} color="#2563EB" />
            <Text style={styles.sectionTitle}>Abonnements</Text>
          </View>
          {subscriptions.map((subscription) => (
            <SubscriptionCard key={subscription.id} subscription={subscription} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#ff6600',
  },
  headerContent: {
    flexDirection: 'row'
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  userLevel: {
    fontSize: 16,
    color: '#00000099',
    marginTop: 2,
  },
  settingsButton: {
    marginRight: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -10,
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  stravaConnect: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FC4C02',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 32,
  },
  stravaText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});