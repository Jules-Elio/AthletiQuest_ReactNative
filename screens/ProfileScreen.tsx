import React, { useState } from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import ProfileHeader from '../components/ProfileHeader';
import TabNavigator from '../components/TabNavigator';
import ActivityCard from '../components/ActivityCard';
import TrophyCard from '../components/TrophyCard';
import PublicationCard from '../components/PublicationCard';
import SubscriptionCard from '../components/SubscriptionCard';
import styles from '../styles/ProfileScreenStyles';

const ProfileScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Aperçu');
  const [refreshing, setRefreshing] = useState(false);

  const activities = [
    { id: '1', title: 'Course à pied', date: '2024-10-30', description: '5km en 25 minutes' },
    { id: '2', title: 'Randonnée', date: '2024-10-28', description: '15km de marche' },
  ];

  const trophies = [
    { 
      id: '1', 
      name: 'Trophée du Marathon', 
      description: 'Obtenu en terminant un marathon en moins de 4 heures.', 
      image: 'https://example.com/trophy-marathon.png' 
    },
  ];

  const subscriptions = [
    { id: '1', name: 'Course des Montagnes' },
    { id: '2', name: 'John Doe' },
  ];

  const publications = [
    { id: '1', title: 'Premier Marathon', content: 'Mon expérience incroyable lors de mon premier marathon !' },
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case 'Aperçu':
        return (
          <>
            {activities.map((activity) => (
              <ActivityCard key={activity.id} {...activity} />
            ))}
            {trophies.map((trophy) => (
              <TrophyCard key={trophy.id} {...trophy} />
            ))}
            {subscriptions.map((subscription) => (
              <SubscriptionCard key={subscription.id} {...subscription} />
            ))}
            {publications.map((publication) => (
              <PublicationCard key={publication.id} {...publication} />
            ))}
          </>
        );
      case 'Trophées':
        return trophies.map((trophy) => <TrophyCard key={trophy.id} {...trophy} />);
      case 'Abonnements':
        return subscriptions.map((subscription) => (
          <SubscriptionCard key={subscription.id} {...subscription} />
        ));
      case 'Publications':
        return (
          <>
            {activities.map((activity) => (
              <ActivityCard key={activity.id} {...activity} />
            ))}
            {publications.map((publication) => (
              <PublicationCard key={publication.id} {...publication} />
            ))}
          </>
        );
      default:
        return null;
    }
  };

  // Fonction de rafraîchissement
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <ProfileHeader />
      <TabNavigator selectedTab={selectedTab} onTabChange={setSelectedTab} />
      <View style={styles.contentContainer}>{renderContent()}</View>
    </ScrollView>
  );
};

export default ProfileScreen;
