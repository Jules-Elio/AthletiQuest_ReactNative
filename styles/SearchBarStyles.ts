import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  searchBar: {
    flex: 1,
    height: 40,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  searchButton: {
    height: 40,
    width: 40,
    backgroundColor: '#FF5733',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});