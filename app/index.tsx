import { Redirect, SplashScreen } from 'expo-router';
import React, { useEffect, useState } from 'react';

import { useUser } from './components/UserProvider';

export default function Home() {
  const { user, refetch } = useUser();

  if (user?.name === '') {
    console.log('refetch aaaaaaa');
    refetch();
  }

  return <Redirect href="/(drawer)/(tabs)/dashboard" />;
}
