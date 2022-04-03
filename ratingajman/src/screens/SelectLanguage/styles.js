import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  item2: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    flexDirection: 'row',
  },
  backButton: {
    width: width * 0.1,
    height: width * 0.125,
    position: 'absolute',
    zIndex: 99,
    left: width * 0.075,
  },
  image: { width: '100%', height: '100%', alignSelf: 'flex-end' },
  feedbackView: {
    width: '100%',
    justifyContent: 'center',
    paddingVertical: height * 0.075,
    alignSelf: 'center',
    marginLeft: '10%',
    paddingLeft: '5%',
  },
  feedbackText: {
    fontWeight: '500',
    color: '#fff',
    fontSize: width * 0.055,
    position: 'absolute',
    top: -10,
    alignSelf: 'center',
    textAlign: 'center',
    paddingHorizontal: '5%',
  },
  item: {
    paddingVertical: height * 0.015,
    marginVertical: height * 0.015,
    paddingHorizontal: width * 0.03,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '70%',
    borderRadius: 30,
  },
  activeNonActive: { width: 20, height: 20 },
});
