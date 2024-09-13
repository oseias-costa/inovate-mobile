import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Dispatch, SetStateAction, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router'

type LoginData = {
    email: string,
    password: string
}

export const useLogin = (setError: Dispatch<SetStateAction<string>>) => {    
    const [fetchToken, setFetchToken] = useState(false)
    
    const postData = async (data: LoginData) => {
        const response = await axios({
          baseURL: `${process.env.EXPO_PUBLIC_API_URL}/users/login`,
          method: "POST",
          data: data
        })
        console.log(response)
        return response.data
    }

    const mutate = useMutation({
        mutationFn: postData,
        mutationKey: ['login'],
        onSuccess: (data) => {
            AsyncStorage.setItem('token', data['token'])
            setFetchToken(true)
            router.replace('/(drawer)/(tabs)/dashboard')
        },  
        onError: (error) => {
          console.log('E-mail ou senha incorretos', error)
          setError('E-mail ou senha incorretos')
        }
      })

    return { mutate, fetchToken }
}