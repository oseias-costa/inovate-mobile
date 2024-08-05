import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import SelectStatus from "~/app/components/SelectStatus";
import NotificationItem from "~/app/notifications/notificationItem";

export default function Notifications(){
    const [status, setStatus] = useState<'' | 'PEDING' | 'FINISH' | 'EXPIRED' | 'DOCUMENTS' | 'NOTICE'>('');

    return(
        <View style={{flex: 1}}>
                    <View style={{ height: 60 }}>
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
        <NotificationItem />
        </View>
    )
}