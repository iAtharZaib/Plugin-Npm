import React, { useEffect } from 'react';
import { Dimensions, Image, NativeModules, Platform, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../store/actions';
import styles from './styles';

const { width } = Dimensions.get('window');
const Home = ({ onPressIcon, lang }) => {
  const dispatch = useDispatch();
  const languageID = useSelector((state) => state.resourcesReducer.languageID);
  useEffect(() => {
    dispatch(setLanguage(lang));
  }, [lang]);

  return (
    <View style={[styles.Container]}>
      <TouchableOpacity
        style={[
          styles.ImgCont,
          {
            // left: lang != 1 && Platform.OS == 'ios' ? undefined : 0,
          },
        ]}
        onPress={() => onPressIcon()}>
        <Image
          source={
            lang != 1
              ? require('../../assets/images/smiley2Reverse.png')
              : require('../../assets/images/smiley.png')
          }
          resizeMode="contain"
          style={{
            height: 161,
            width: 70,
            right: -2,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Home;
