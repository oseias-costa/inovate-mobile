import AsyncStorage from "@react-native-async-storage/async-storage"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function useGetDocumentById(id: string){
    return useQuery({
        queryKey: ['document-'+id],
        queryFn: async () => {
            const token = await AsyncStorage.getItem('token')
            console.log(token)
            const companys =  await axios({
                method: 'GET',
                baseURL: `${process.env.EXPO_PUBLIC_API_URL}/document/get-by-id/${id}`,
                headers: { Authorization: `Bearer ${token}`}
            })
            
            return companys.data
        }
    })
}