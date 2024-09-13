import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import SelectStatus from "~/app/components/SelectStatus";
import useGetUser from "~/app/hook/useGetUser";
import NotificationItem from "~/app/notifications/notificationItem";

type Notification = {
    id: string,
    title: string,
    description: string
    time: string
    type: string
    read: boolean
}

export default function Notifications(){
    const [status, setStatus] = useState<'' | 'PEDING' | 'FINISH' | 'EXPIRED' | 'DOCUMENT' | 'NOTICE'>('');
    const { user } = useGetUser()
    const [refreshing, setRefreshing] = useState(false);
    const queryClient = useQueryClient();

    const getNotifications = async () => {
      const token = await AsyncStorage.getItem('token');
      const notifications = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/notifications`,{
        headers: { Authorization: `Bearer ${token}` },
        params: {
          "subjectUuid": user?.id,
          "type": status,
          "subject": user?.type,
          "limit": 10,
          "page": 1
        }
    })
    return notifications.data
  }
    const { data, isError, isSuccess, error, refetch } = useQuery({
      queryKey: ['notifications'],  
      queryFn: getNotifications,
    })

    useEffect(() => console.log(error),[isError])

    console.log('data', data)
    console.log('user', user)
    console.log('isSuccess', isSuccess)
    return(
        <View style={{flex: 1}}>
          <View style={{ height: 60, marginBottom: 8 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate="normal"
            contentContainerStyle={{
              marginHorizontal: 15,
              marginVertical: 20,
              flexDirection: 'row',
              paddingRight: 20,
              height: 40,
            }}>
            <SelectStatus item="" setStatus={setStatus} status={status} />
            <SelectStatus item="DOCUMENT" setStatus={setStatus} status={status} />
            <SelectStatus item="NOTICE" setStatus={setStatus} status={status} />
          </ScrollView>
        </View>
        {/* <View style={{ width: '100%', height: 800}}> */}
          <FlashList
            renderItem={({item}: {item: Notification}) => {
              console.log('FlashList', item)
              return <NotificationItem 
              id={item.id} 
              title={item.title} 
              description={item.description} 
              time={new Date(item.time)} 
              type={item.type} 
              read={item.read}
            />
            }}
            estimatedItemSize={15}
            keyExtractor={(item) => item.id}
            data={data}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => queryClient.invalidateQueries({ queryKey: ['notifications'] })}
                colors={['#9Bd35A', '#689F38']}
                progressBackgroundColor="#fff"
              />
            }
            showsVerticalScrollIndicator={false}
          />
        </View>
        // </View>
    )
}

const test = [
  {
    id: "1233",
    title: "Hoje último dia que precisa alguma coisa",
    description: "Início da descrição do aviso de exemplo, caso o texto for grande",
    time: '2024-08-05 18:02:47.776876',
    type: "notification",
    seen: true
  },
  {
    id: "1243",
    title: "Hoje último dia que precisa alguma coisa",
    description: "Início da descrição do aviso de exemplo, caso o texto for grande",
    time: '2024-08-05 18:02:47.776876',
    type: "notice",
    seen: true
  },
  {
    id: "1263",
    title: "Hoje último dia que precisa alguma coisa",
    description: "Início da descrição do aviso de exemplo, caso o texto for grande",
    time: '2024-08-05 18:02:47.776876',
    type: "notice",
    seen: false
  },
]