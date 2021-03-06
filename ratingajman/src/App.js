import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Home from './screens/Home/Home';
import ProvideFeedback from './screens/ProvideFeedback/ProvideFeedback';
import SelectLanguage from './screens/SelectLanguage/SelectLanguage';
import { setLanguage } from './store/actions';
import { persistor, store } from './store/store';

const FloatingRatingWrapped = ({ lang}) => {
  const [step, setStep] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLanguage(lang));
  }, [lang]);

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        zIndex: 30000,
        alignSelf: 'flex-end',
      }}>
      {step === 1 ? (
        <Home lang={lang} onPressIcon={() => setStep(2)} />
      ) : step === 2 ? (
        <SelectLanguage
          onLanguageSelect={() => setStep(3)}
          lang={lang}
          onClose={() => setStep(1)}
        />
      ) : (
        <ProvideFeedback onClose={() => setStep(1)} lang={lang} />
      )}
    </View>
  );
};

const FloatingRating = (props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <FloatingRatingWrapped {...props} />
      </PersistGate>
    </Provider>
  );
};

export { FloatingRating };
