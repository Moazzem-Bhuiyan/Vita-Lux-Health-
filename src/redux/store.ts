import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
import notificationSlice from './features/notificationSlice';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import authReducer from './features/authSlice';
import { baseApi } from './api/baseApi';
import { intakeBaseApi } from './api/intakeBaseApi';

const persistConfig = {
  key: 'auth',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [intakeBaseApi.reducerPath]: intakeBaseApi.reducer,
    notification: notificationSlice,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(baseApi.middleware)
      .concat(intakeBaseApi.middleware),
});

export const persistor = persistStore(store);
