import AsyncStorage from '@react-native-community/async-storage';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"; // ADDED
import resourcesReducer from './reducers/resourcesReducer';

const rootReducer = combineReducers({
  resourcesReducer: resourcesReducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['resourcesReducer'],
  blacklist: [''],
  stateReconciler: autoMergeLevel2 
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

let persistor = persistStore(store);
export {store, persistor};
