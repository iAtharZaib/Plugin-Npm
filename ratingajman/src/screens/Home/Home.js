import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  NativeModules,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setLanguage} from '../../store/actions';
import styles from './styles';

const {width} = Dimensions.get('window');
const Home = ({onPressIcon, lang}) => {
  const dispatch = useDispatch();
  const languageID = useSelector(state => state.resourcesReducer.languageID);
  useEffect(() => {
    dispatch(setLanguage(lang));
    // if (lang) {
    //   dispatch(setLanguage(lang));
    // } else {
    //   var deviceLanguage =
    //     Platform.OS === 'ios'
    //       ? NativeModules.SettingsManager.settings.AppleLocale ||
    //         NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
    //       : NativeModules.I18nManager.localeIdentifier;
    //   console.log(deviceLanguage, 'deviceLanguage in home page');
    //   deviceLanguage = deviceLanguage.slice(0, 2);
    //   if (deviceLanguage == 'en') {
    //     dispatch(setLanguage(1));
    //   } else if (deviceLanguage == 'ar') {
    //     dispatch(setLanguage(2));
    //   } else if (deviceLanguage == 'ur') {
    //     dispatch(setLanguage(3));
    //   }
    // }
  }, [lang]);

  return (
    <View
      style={[
        styles.Container,
        {
          left: lang != 1 ? -50 : undefined,
          right: lang == 1 ? -50 : undefined,
        },
      ]}>
      <TouchableOpacity
        style={[
          styles.ImgCont,
          {
            left: lang != 1 && Platform.OS == 'ios' ? undefined : 0,
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
            width: '100%',
            height: '100%',
            width: lang != 1 && Platform.OS == 'ios' ? 60 : undefined,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Home;
