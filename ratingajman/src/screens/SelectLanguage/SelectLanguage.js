import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setFeedbackLanguage } from '../../store/actions';
import styles from './styles';
const { width, height } = Dimensions.get('window');

const SelectLanguage = ({ onClose, onLanguageSelect, lang }) => {
  const [selectedId, setSelectedId] = useState();
  const dispatch = useDispatch();
  const languageResource = useSelector((state) => state.resourcesReducer.resource);
  const languageID = useSelector((state) => state.resourcesReducer.languageID);
  const languages = [
    {
      id: 1,
      language: languageResource.English,
    },
    {
      id: 2,
      language: languageResource.Arabic,
    },
    {
      id: 3,
      language: languageResource.Urdu,
    },
  ];

  return (
    <ImageBackground
      style={[
        styles.imageBackground,
        {
          flexDirection: lang != 1 && Platform.OS == 'android' ? 'row-reverse' : 'row',
        },
      ]}
      resizeMode={'cover'}
      source={
        lang !== 1
          ? require('../../assets/images/drawerBgReverse.png')
          : require('../../assets/images/drawerBg.png')
      }>
      <TouchableOpacity style={[styles.backButton]} onPress={() => onClose()}>
        <Image
          source={require('../../assets/images/cross.png')}
          resizeMode="contain"
          style={styles.image}
        />
      </TouchableOpacity>

      <View style={[styles.feedbackView]}>
        <Text allowFontScaling={false} style={styles.feedbackText}>
          {' '}
          {languageResource.Select_language_of_your_feedback}
        </Text>
        <View>
          <FlatList
            scrollEnabled={false}
            data={languages}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.item,
                    {
                      backgroundColor: item.id === selectedId ? 'blue' : '#fff',
                    },
                  ]}
                  onPress={() => {
                    setSelectedId(item.id);
                    dispatch(setFeedbackLanguage(item.id));
                    onLanguageSelect();
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: item.id === selectedId ? '#fff' : '#000',
                    }}>
                    {item.language}
                  </Text>
                  {item.id === selectedId ? (
                    <Image
                      resizeMode={'contain'}
                      style={styles.activeNonActive}
                      source={require('../../assets/images/active.png')}
                    />
                  ) : (
                    <Image
                      resizeMode={'contain'}
                      style={styles.activeNonActive}
                      source={require('../../assets/images/notactive.png')}
                    />
                  )}
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default SelectLanguage;
