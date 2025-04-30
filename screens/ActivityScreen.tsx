import React, { useState, useEffect } from 'react';
import { View, ScrollView, FlatList, RefreshControl } from 'react-native';
import SearchBar from '../components/SearchBar';
import FilterButton from '../components/FilterButton';
import ActivityCard from '../components/ActivityCard';
import styles from '../styles/ActivityScreenStyles';
import communityData from '../data/community.json';

const activities = communityData.activities;

const ActivityScreen = () => {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Tous');
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filters = ['Tous', '<5km', '5km', '10km', '15km', 'Semi-Marathon', 'Marathon'];

  useEffect(() => {
    setFilteredActivities(activities);
  }, []);

  const onSearch = () => {
    const filtered = activities.filter(activity => {
      const isInCategory = selectedFilter === 'Tous' || activity.category === selectedFilter;
      const isInSearch =
        activity.title.toLowerCase().includes(search.toLowerCase()) ||
        activity.category?.toLowerCase().includes(search.toLowerCase());
      return isInCategory && isInSearch;
    });
    setFilteredActivities(filtered);
  };

  const onFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    const filtered = activities.filter(activity => {
      const isInCategory = filter === 'Tous' || activity.category === filter;
      const isInSearch =
        activity.title.toLowerCase().includes(search.toLowerCase()) ||
        activity.category?.toLowerCase().includes(search.toLowerCase());
      return isInCategory && isInSearch;
    });
    setFilteredActivities(filtered);
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setFilteredActivities(activities);
      setIsRefreshing(false);
    }, 1000);
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