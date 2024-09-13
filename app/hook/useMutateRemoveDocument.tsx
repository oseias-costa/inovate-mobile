import AsyncStorage from "@react-native-async-storage/async-storage"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function useMutateRemoveDocument(id: string){
    return useMutation({
        mutationKey: ['document-'+id],
        mutationFn: async () => {
            const token = await AsyncStorage.getItem('token')
            const companys =  await axios({
                method: 'DELETE',
                baseURL: `${process.env.EXPO_PUBLIC_API_URL}/document/${id}`,
                headers: { Authorization: `Bearer ${token}`}
            })
    
            return companys.data
        }
    })
}