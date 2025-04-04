import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/ProfileHeaderStyles';

const ProfileHeader = () => {
  return (
    <View style={styles.profileHeader}>
      <View style={styles.profileImage}></View>
      <Text style={styles.userName}>Nom D'utilisateur</Text>
      <View style={styles.locationContainer}>
        <Icon name="location-sharp" size={14} color="#FF5733" style={styles.locationIcon} />
        <Text style={styles.locationText}>Localisation</Text>
      </View>
      <Text style={styles.bio}>Biographie</Text>
    </View>
  );
};

export default ProfileHeader;
