import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import userPreferencesSlice from '../slice';

const reducers = combineReducers({
  userPreferences: userPreferencesSlice,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store: EnhancedStore = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.VITE_ENV === 'production' ? false : true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
