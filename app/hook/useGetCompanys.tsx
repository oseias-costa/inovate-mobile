import AsyncStorage from "@react-native-async-storage/async-storage"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function useGetCompanys(){
    return useQuery({
        queryKey: ['companys'],
        queryFn: async () => {
            const token = await AsyncStorage.getItem('token')
            const companys =  await axios({
                method: 'GET',
                baseURL: 'http://10.0.0.101:3009/users/companys',
                headers: { Authorization: `Bearer ${token}`}
            })
    
            return companys.data
        }
    })
}