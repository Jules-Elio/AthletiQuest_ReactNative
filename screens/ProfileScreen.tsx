import React, { useState } from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import ProfileHeader from '../components/ProfileHeader';
import TabNavigator from '../components/TabNavigator';
import ActivityCard from '../components/ActivityCard';
import TrophyCard from '../components/TrophyCard';
import PublicationCard from '../components/PublicationCard';
import SubscriptionCard from '../components/SubscriptionCard';
import styles from '../styles/ProfileScreenStyles';
import communityData from '../data/community.json';

const activities = communityData.activities.filter(a => a.userId === 'me');
const trophies = communityData.trophies.filter(t => t.userId === 'me');
const subscriptions = communityData.subscriptions.filter(s => s.userId === 'me');
const publications = communityData.publications.filter(p => p.userId === 'me');
const groups = communityData.groups.filter(g => g.userId === 'me');

const ProfileScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Aperçu');
  const [refreshing, setRefreshing] = useState(false);

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
    <View style={styles.headerWrapper}>
      <ProfileHeader />
    </View>

    <TabNavigator selectedTab={selectedTab} onTabChange={setSelectedTab} />
    <View style={styles.contentContainer}>{renderContent()}</View>
  </ScrollView>
  );
};

export default ProfileScreen;