import React from 'react';
import { View, Text } from 'react-native';
import Button from '../components/Button';

const HomeScreen = () => {
  return (
    <View>
      <Text>Bienvenue sur AthletiQuest !</Text>
      <Button title="Clique ici" onPress={() => alert('Bouton cliqué !')} />
    </View>
  );
};

export default HomeScreen;