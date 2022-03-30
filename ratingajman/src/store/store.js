// Imports: Dependencies
import AsyncStorage from '@react-native-community/async-storage';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"; // ADDED
import resourcesReducer from './reducers/resourcesReducer';

const rootReducer = combineReducers({

  resourcesReducer: resourcesReducer
});

// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: ['resourcesReducer'],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [''],
  stateReconciler: autoMergeLevel2 
};
// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
// Redux: Store

const store = createStore(persistedReducer, applyMiddleware(thunk));

// Middleware: Redux Persist Persister
let persistor = persistStore(store);
// Exports
export {store, persistor};
