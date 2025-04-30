import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#D3D3D3',
    paddingVertical: 10,
  },
  tabButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tabButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 14,
    color: '#333',
  },
});
