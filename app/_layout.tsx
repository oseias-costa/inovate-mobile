import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { onlineManager, focusManager, QueryCache, QueryClientProvider, QueryClient } from '@tanstack/react-query'
import NetInfo from '@react-native-community/netinfo'
import { AppState } from 'react-native';
import type { AppStateStatus } from 'react-native';

export default function Layout() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 10000
      }
    }
  })

  useEffect(() => {
    onlineManager.setEventListener((setOnline)=>{
      return NetInfo.addEventListener((state) => {
        setOnline(!!state.isConnected)
      })
    })
  },[NetInfo, onlineManager])

  useEffect(() => {
    const subscriber = AppState.addEventListener('change', onFocusRefetch)
  },[])

  const onFocusRefetch = (status: AppStateStatus) => {
    focusManager.setFocused(status === 'active')
  }

  return (
    <QueryClientProvider client={client}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{
        headerShown: false
      }}>
      {/* <Stack.Screen name='(drawer)' /> */}
      </Stack>
    </GestureHandlerRootView>
    </QueryClientProvider>
    );
}
