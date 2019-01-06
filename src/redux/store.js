import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducers = persistReducer(persistConfig, reducers);
export const store = createStore(persistedReducers, {}, applyMiddleware(ReduxThunk));

export const persistor = persistStore(store);
