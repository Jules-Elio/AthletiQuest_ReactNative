import React, { useState } from 'react';
import { ScrollView, View, RefreshControl, Text } from 'react-native';
import PublicationCard from '../components/PublicationCard';
import SubscriptionCard from '../components/SubscriptionCard';
import TabNavigator from '../components/TabNavigator';
import styles from '../styles/ProfileScreenStyles';
import communityData from '../data/community.json'; // JSON local
import { SafeAreaProvider } from 'react-native-safe-area-context';

const CommunityScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Aperçu');
  const [refreshing, setRefreshing] = useState(false);

  const { groups, publications } = communityData;

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'Aperçu':
        return (
          <>
            {groups.map((group) => (
              <SubscriptionCard key={group.id} {...group} />
            ))}
            {publications.map((pub) => (
              <PublicationCard key={pub.id} {...pub} />
            ))}
          </>
        );
      case 'Groupes':
        return groups.map((group) => (
          <SubscriptionCard key={group.id} {...group} />
        ));
      case 'Publications':
        return publications.map((pub) => (
          <PublicationCard key={pub.id} {...pub} />
        ));
      default:
        return <Text>Aucun contenu</Text>;
    }
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <TabNavigator
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        tabs={['Aperçu', 'Groupes', 'Publications']}
      />
      <View style={styles.contentContainer}>{renderContent()}</View>
    </ScrollView>
  );
};

export default CommunityScreen;