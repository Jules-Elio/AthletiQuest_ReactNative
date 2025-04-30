import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  profileHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    // backgroundColor: '#eee',
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -10,
  },
});
