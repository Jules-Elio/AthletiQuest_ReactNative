import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from '../styles/FilterButtonStyles';

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.filterButton, isActive && styles.filterButtonActive]}
      onPress={onPress}
    >
      <Text style={styles.filterText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default FilterButton;
