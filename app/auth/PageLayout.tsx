import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, SafeAreaView, ScrollView, View } from 'react-native';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Tabs.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: '',
          headerLeft: () => <></>,
        }}
      />
      <View
        style={{
          paddingTop: 60,
          flex: 1,
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingBottom: 20,
          backgroundColor: '#fff',
          justifyContent: 'space-between',
        }}>
        {children}
      </View>
    </>
  );
}
