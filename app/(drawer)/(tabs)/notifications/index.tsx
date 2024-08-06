import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import SelectStatus from "~/app/components/SelectStatus";
import NotificationItem from "~/app/notifications/notificationItem";

export default function Notifications(){
    const [status, setStatus] = useState<'' | 'PEDING' | 'FINISH' | 'EXPIRED' | 'DOCUMENTS' | 'NOTICE'>('');

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
        <NotificationItem 
          id="123" 
          title="Hoje último dia que precisa alguma coisa" 
          description="Início da descrição do aviso de exemplo, caso o texto for grande" 
          time={new Date('2024-08-07 18:02:47.776876')} 
          type="notice" 
          seen={true}
        />
         <NotificationItem 
          id="123" 
          title="Hoje último dia que precisa alguma coisa" 
          description="Início da descrição do aviso de exemplo, caso o texto for grande" 
          time={new Date('2024-08-08 18:02:47.776876')} 
          type="notice" 
          seen={true}
        />
         <NotificationItem 
          id="123" 
          title="Hoje último dia que precisa alguma coisa" 
          description="Início da descrição do aviso de exemplo, caso o texto for grande" 
          time={new Date('2024-08-05 18:02:47.776876')} 
          type="notice" 
          seen={false}
        />
        </View>
    )
}