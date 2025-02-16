import { Redirect, SplashScreen, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';

import { useUser } from './components/UserProvider';

export default function Home() {
  const { user, refetch } = useUser();
  console.log('user provider', user);

  if (user?.name === '') {
    console.log('refetch aaaaaaa');
    refetch();
  }

  return <Redirect href="/(drawer)/(tabs)/dashboard" />;
}
