import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  profileHeader: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    backgroundColor: '#A020F0',
    borderRadius: 50,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  locationIcon: {
    marginRight: 5,
  },
  locationText: {
    fontSize: 14,
    color: '#333',
  },
  bio: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});
