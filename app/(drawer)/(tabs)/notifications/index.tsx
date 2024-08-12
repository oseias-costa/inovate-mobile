import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import axios from "axios";
import { useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import SelectStatus from "~/app/components/SelectStatus";
import useGetUser from "~/app/hook/useGetUser";
import NotificationItem from "~/app/notifications/notificationItem";

export default function Notifications(){
    const [status, setStatus] = useState<'' | 'PEDING' | 'FINISH' | 'EXPIRED' | 'DOCUMENTS' | 'NOTICE'>('');
    const { user } = useGetUser()

    const getNotifications = async () => {
      const token = await AsyncStorage.getItem('token');
      const notifications = axios({
        method: 'GET',
        baseURL: 'http://10.0.0.101:3009/notifications',
        headers: { Authorization: `Bearer ${token}` },
        data: {
          uuid: user?.id,
          type: user?.type,
          options: {
            limit: 10,
            page: 1
          }
        }
    })}

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
            <SelectStatus item="DOCUMENTS" setStatus={setStatus} status={status} />
            <SelectStatus item="NOTICE" setStatus={setStatus} status={status} />
          </ScrollView>
        </View>
        {/* <View style={{ width: '100%', height: 800}}> */}
          <FlashList
            renderItem={({ item }) => {
              return  <NotificationItem 
              id={item.id} 
              title={item.title} 
              description={item.description} 
              time={new Date(item.time)} 
              type={'notice'} 
              seen={item.seen}
            />
            }}
            estimatedItemSize={15}
            keyExtractor={(item) => item.id}
            data={data}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={refreshing}
            //     onRefresh={() => queryClient.invalidateQueries({ queryKey: ['documents'] })}
            //     colors={['#9Bd35A', '#689F38']}
            //     progressBackgroundColor="#fff"
            //   />
            // }
            showsVerticalScrollIndicator={false}
          />
        </View>
        // </View>
    )
}

const data = [
  {
    id: "1233",
    title: "Hoje último dia que precisa alguma coisa",
    description: "Início da descrição do aviso de exemplo, caso o texto for grande",
    time: '2024-08-05 18:02:47.776876',
    type: "notice",
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