import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { X, MapPin, Calendar } from 'lucide-react-native';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  activeFilter: 'all' | 'stadiums' | 'events';
  onFilterChange: (filter: 'all' | 'stadiums' | 'events') => void;
}

export function FilterModal({ visible, onClose, activeFilter, onFilterChange }: FilterModalProps) {
  const filters = [
    { id: 'all', label: 'Tout afficher', icon: null },
    { id: 'stadiums', label: 'Stades uniquement', icon: MapPin },
    { id: 'events', label: 'Événements uniquement', icon: Calendar },
  ];

  const handleFilterSelect = (filterId: 'all' | 'stadiums' | 'events') => {
    onFilterChange(filterId);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Filtres</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <X size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>

              <View style={styles.filtersContainer}>
                {filters.map((filter) => {
                  const IconComponent = filter.icon;
                  const isActive = activeFilter === filter.id;
                  
                  return (
                    <TouchableOpacity
                      key={filter.id}
                      style={[styles.filterOption, isActive && styles.activeFilterOption]}
                      onPress={() => handleFilterSelect(filter.id as 'all' | 'stadiums' | 'events')}
                    >
                      {IconComponent && (
                        <IconComponent 
                          size={20} 
                          color={isActive ? '#FFFFFF' : '#6B7280'} 
                          style={styles.filterIcon}
                        />
                      )}
                      <Text style={[styles.filterLabel, isActive && styles.activeFilterLabel]}>
                        {filter.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxWidth: 300,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  filtersContainer: {
    gap: 12,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
  },
  activeFilterOption: {
    backgroundColor: '#FF5733',
  },
  filterIcon: {
    marginRight: 12,
  },
  filterLabel: {
    fontSize: 16,
    color: '#333',
  },
  activeFilterLabel: {
    color: '#FFFFFF',
  },
});