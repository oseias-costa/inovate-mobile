import NetInfo from '@react-native-community/netinfo';
import {
  onlineManager,
  focusManager,
  QueryCache,
  QueryClientProvider,
  QueryClient,
} from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { AppState } from 'react-native';
import type { AppStateStatus } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { FilterProvider } from './components/FilterProvider';
import { UserProvider } from './components/UserProvider';

export default function Layout() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: true,
        staleTime: 10000,
      },
    },
  });

  useEffect(() => {
    onlineManager.setEventListener((setOnline) => {
      return NetInfo.addEventListener((state) => {
        setOnline(!!state.isConnected);
      });
    });
  }, [NetInfo, onlineManager]);

  useEffect(() => {
    const subscriber = AppState.addEventListener('change', onFocusRefetch);
  }, []);

  const onFocusRefetch = (status: AppStateStatus) => {
    focusManager.setFocused(status === 'active');
  };

  return (
    <QueryClientProvider client={client}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <FilterProvider>
          <UserProvider>
            <Stack
              screenOptions={{
                headerShown: false,
              }}>
              {/* <Stack.Screen name='(drawer)' /> */}
            </Stack>
          </UserProvider>
        </FilterProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
