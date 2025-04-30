import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const DetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  type DetailParams =
  | { type: 'activity'; data: { title: string; date?: string; description?: string; category?: string } }
  | { type: 'trophy'; data: { name: string; description: string } }
  | { type: 'subscription'; data: { name: string; type: string } };

  const { type, data } = route.params as DetailParams;

  const renderContent = () => {
    switch (type) {
      case 'activity':
        return (
          <>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.date}>{data.date}</Text>
            <Text style={styles.description}>{data.description}</Text>
            <Text style={styles.category}>Catégorie : {data.category}</Text>
          </>
        );
      case 'trophy':
        return (
          <>
            <Text style={styles.title}>{data.name}</Text>
            <Text style={styles.description}>{data.description}</Text>
          </>
        );
      case 'subscription':
        return (
          <>
            <Text style={styles.title}>{data.name}</Text>
            <Text style={styles.description}>Type : {data.type}</Text>
          </>
        );
      default:
        return <Text>Type non reconnu</Text>;
    }
  };

  return (
    <View style={styles.container}>
      {/* Flèche retour */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>← Retour</Text>
      </TouchableOpacity>

      {/* Contenu centré */}
      <View style={styles.contentWrapper}>{renderContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60, // espace pour le FAB
  },
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 10,
  },
  backText: {
    fontSize: 18,
    color: '#FF5733',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  date: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
});

export default DetailScreen;