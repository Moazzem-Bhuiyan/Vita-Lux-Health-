'use client';
import { persistor, store } from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import LogoLoader from '@/components/shared/LogoLoader';

export default function ReduxProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="flex min-h-screen items-center justify-center">
            <div className="min-h-screen flex items-center justify-center bg-white">
              <LogoLoader />
            </div>
          </div>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
