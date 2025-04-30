import React, { useState, useRef, useEffect } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Animated,
} from 'react-native';

const GlobalFAB = () => {
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
  
    const slideAnim = useRef(new Animated.Value(500)).current; // hors-écran au départ
  
    useEffect(() => {
      if (visible) {
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        slideAnim.setValue(500); // reset rapide quand on ferme
      }
    }, [visible]);
  
    const handleAdd = () => {
      const newActivity = {
        id: Date.now().toString(),
        title,
        category,
        description,
        date: new Date().toISOString().split('T')[0],
        userId: 'me',
      };
      console.log('Nouvelle activité (mock push) :', newActivity);
      setVisible(false);
      setTitle('');
      setCategory('');
      setDescription('');
    };
  
    return (
      <>
        <TouchableOpacity style={styles.fab} onPress={() => setVisible(true)}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
  
        <Modal visible={visible} transparent animationType="none">
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPressOut={() => setVisible(false)}
          >
            <Animated.View
              style={[
                styles.modalContent,
                { transform: [{ translateY: slideAnim }] },
              ]}
            >
              <Text style={styles.modalTitle}>Nouvelle activité</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Titre"
                value={title}
                onChangeText={setTitle}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Catégorie"
                value={category}
                onChangeText={setCategory}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
              />
              <TouchableOpacity style={styles.modalButton} onPress={handleAdd}>
                <Text style={styles.modalButtonText}>Ajouter</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableOpacity>
        </Modal>
      </>
    );
  };
  
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 85, // au-dessus de la tab bar
    right: 10,
    backgroundColor: '#FF5733',
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    elevation: 5,
  },
  fabText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#FF5733',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default GlobalFAB;