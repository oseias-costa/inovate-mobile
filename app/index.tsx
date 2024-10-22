import { Redirect, SplashScreen } from 'expo-router';
import React, { useEffect, useState } from 'react';

import { useUser } from './components/UserProvider';

export default function Home() {
  const { user } = useUser();

  if (user?.name === '') {
    return <Redirect href="/auth/login" />;
  }

  return <Redirect href="/(drawer)/(tabs)/dashboard" />;
}
