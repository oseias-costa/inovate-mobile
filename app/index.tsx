import { Redirect } from 'expo-router';
import useGetUser from './hook/useGetUser';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const [token, setToken] = useState('')
  const { user } = useGetUser()

  const getToken = async () => {
    const token = await AsyncStorage.getItem('token')
    if(token){
      setToken(token)
    }
  }

  useEffect(() => {
    getToken()
  },[])

  if(!user){
    return  <Redirect href="/auth/login" />
  }
  
  // return <Redirect href='/(drawer)/(tabs)/dashboard' />
}
