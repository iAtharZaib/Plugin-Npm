import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {Provider, useDispatch} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Home from './screens/Home/Home';
import ProvideFeedback from './screens/ProvideFeedback/ProvideFeedback';
import SelectLanguage from './screens/SelectLanguage/SelectLanguage';
import {setLanguage} from './store/actions';
import {persistor, store} from './store/store';
const {height} = Dimensions.get('window');
let iconPosition = height / 2 - 100;

const FloatingRatingWrapped = ({lang, top = iconPosition}) => {
  const [step, setStep] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLanguage(lang));
  }, [lang]);

  const persistingStyle = {
    flex: 1,
    position: 'absolute',
    zIndex: 30000,
    top,
  };

  if (lang == 1) {
    persistingStyle.right = 0;
  } else if (lang != 1) {
    persistingStyle.left = 0;
  }

  const style =
    step == 1
      ? persistingStyle
      : {...persistingStyle, top: 0, bottom: 0, left: 0, rigth: 0};

  return (
    <View style={style}>
      {step === 1 ? (
        <Home lang={lang} onPressIcon={() => setStep(2)} />
      ) : step === 2 ? (
        <SelectLanguage
          onLanguageSelect={() => setStep(3)}
          lang={lang}
          onClose={() => setStep(1)}
        />
      ) : (
        <ProvideFeedback onClose={() => setStep(1)} lang={lang}/>
      )}
    </View>
  );
};

const FloatingRating = props => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <FloatingRatingWrapped {...props} />
      </PersistGate>
    </Provider>
  );
};

export {FloatingRating};
