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
                baseURL: 'http://10.0.0.101:3009/document/'+id,
                headers: { Authorization: `Bearer ${token}`}
            })
    
            return companys.data
        }
    })
}