import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
  },
  SmileyImage: {
    width: '100%',
    height: '100%',
    alignItems: 'flex-end',
  },
  ImgCont: {
    left: width * 0.12,
    width: width * 0.4,
    height: width * 0.4,
    alignSelf: 'flex-end',
  },
});
