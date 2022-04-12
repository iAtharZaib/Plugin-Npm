import React, { useEffect } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../../store/actions';
import styles from './styles';

const Home = ({ onPressIcon, lang }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLanguage(lang));
  }, [lang]);

  return (
    <View style={[styles.Container]}>
      <TouchableOpacity
        style={styles.ImgCont}
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
