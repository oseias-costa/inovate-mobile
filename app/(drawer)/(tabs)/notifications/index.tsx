import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlashList } from '@shopify/flash-list';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { RefreshControl, ScrollView, View, StyleSheet } from 'react-native';

import SelectNotificationFilter from '~/app/components/SelectNotificationFilter';
import { useUser } from '~/app/components/UserProvider';
import NotificationItem from '~/app/notifications/notificationItem';

type Notification = {
  type: string;
  title: string;
  description: string;
  isRead: boolean;
  itemUuid: string;
  createAt: Date;
};

export default function Notifications() {
  const [status, setStatus] = useState<'' | 'REQUEST' | 'REPORT' | 'NOTICE'>('');
  const { user } = useUser();
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const { data, isError, isSuccess, error, refetch } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const token = await AsyncStorage.getItem('token');
      const notifications = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          subjectUuid: user.uuid,
        },
      });
      return notifications.data;
    },
  });
  console.log('data  aaa', data);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.destakContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate="normal"
          contentContainerStyle={{
            marginHorizontal: 15,
            marginTop: 10,
            flexDirection: 'row',
            paddingRight: 20,
          }}>
          <SelectNotificationFilter item="" setStatus={setStatus} status={status} />
          <SelectNotificationFilter item="REQUEST" setStatus={setStatus} status={status} />
          <SelectNotificationFilter item="REPORT" setStatus={setStatus} status={status} />
          <SelectNotificationFilter item="NOTICE" setStatus={setStatus} status={status} />
        </ScrollView>
      </View>
      <FlashList
        renderItem={({ item }: { item: Notification }) => {
          return (
            <NotificationItem
              id={item.itemUuid}
              title={item.title}
              description={item.description}
              time={new Date(item.createAt)}
              type={item.type}
              read={item.isRead}
            />
          );
        }}
        estimatedItemSize={15}
        keyExtractor={(item) => item.itemUuid}
        data={data.items}
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
  );
}

const styles = StyleSheet.create({
  destakContainer: {
    position: 'relative',
    bottom: 1,
    marginBottom: 10,
    zIndex: 1,
    backgroundColor: '#00264B',
    height: 60,
  },
  titleBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Lato_300Light',
    color: '#fff',
    marginLeft: 20,
  },
  text: {
    color: '#fff',
    alignSelf: 'center',
    marginTop: 6,
  },
});
