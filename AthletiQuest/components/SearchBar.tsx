import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/SearchBarStyles';

interface SearchBarProps {
  search: string;
  setSearch: (text: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch, onSearch }) => {
  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={styles.searchBar}
        placeholder="Rechercher un événement"
        value={search}
        onChangeText={setSearch}
      />
      <TouchableOpacity onPress={onSearch} style={styles.searchButton}>
        <Ionicons name="search" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
