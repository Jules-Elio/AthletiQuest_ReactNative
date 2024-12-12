import React, { useState } from 'react';
import { View, ScrollView, FlatList, RefreshControl } from 'react-native';
import SearchBar from '../components/SearchBar';
import FilterButton from '../components/FilterButton';
import ActivityCard from '../components/ActivityCard';
import styles from '../styles/ActivityScreenStyles';

const ActivityScreen = () => {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Tous');
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filters = ['Tous', '<5km', '5km', '10km', '15km', 'Semi-Marathon', 'Marathon'];
  const activities = [
    { id: '1', title: 'Petite course balade', category: '<5km' },
    { id: '2', title: 'Miaou course', category: 'Semi-Marathon' },
    { id: '3', title: 'Délirant wow', category: 'Marathon' },
    { id: '4', title: 'Petit 15km le long du lac', category: '15km' },
    { id: '5', title: 'Randonnée', category: '10km' },
    { id: '6', title: 'Prépa physique', category: '5km' },
    { id: '7', title: 'Prépa physique miaou', category: 'Semi-Marathon' },
  ];

  const onSearch = () => {
    const filtered = activities.filter(activity => {
      const isInCategory = selectedFilter === 'Tous' || activity.category === selectedFilter;
      const isInSearch = 
        activity.title.toLowerCase().includes(search.toLowerCase()) ||
        activity.category.toLowerCase().includes(search.toLowerCase());
      return isInCategory && isInSearch;
    });
    setFilteredActivities(filtered);
  };

  const onFilterSelect = (filter) => {
    setSelectedFilter(filter);
    const filtered = activities.filter(activity => {
      const isInCategory = filter === 'Tous' || activity.category === filter;
      const isInSearch = 
        activity.title.toLowerCase().includes(search.toLowerCase()) ||
        activity.category.toLowerCase().includes(search.toLowerCase());
      return isInCategory && isInSearch;
    });
    setFilteredActivities(filtered);
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    // Simule un rafraîchissement des données, par exemple recharger les activités
    setTimeout(() => {
      setFilteredActivities(activities);
      setIsRefreshing(false);
    }, 1000); // Attente simulée de 1 seconde avant d'arrêter le rafraîchissement
  };

  return (
    <View style={styles.container}>
      <SearchBar search={search} setSearch={setSearch} onSearch={onSearch} />
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar}>
        {filters.map((filter, index) => (
          <FilterButton
            key={index}
            label={filter}
            isActive={selectedFilter === filter}
            onPress={() => onFilterSelect(filter)}
          />
        ))}
      </ScrollView>

      <FlatList
        data={filteredActivities}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ActivityCard title={item.title} category={item.category} />
        )}
        contentContainerStyle={styles.activityList}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default ActivityScreen;
