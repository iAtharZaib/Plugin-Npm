import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
  },
  SmileyImage: {
    // alignSelf: 'flex-end',
  },
  ImgCont: {
    justifyContent: 'center',
    alignItems: 'center',
    // justifyContent: 'flex-start',
  },
});
