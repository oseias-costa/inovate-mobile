import { FlashList } from '@shopify/flash-list';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { RefreshControl, ScrollView, View, StyleSheet } from 'react-native';

import SelectNotificationFilter from '~/app/components/SelectNotificationFilter';
import { useUser } from '~/app/components/UserProvider';
import NotificationItem from '~/app/components/notificationItem';
import { httpClient } from '~/app/lib/http.client';
import { Notification } from '~/app/lib/types/notification.type';
import { PaginateReponse } from '~/app/lib/types/paginate-response.type';

export default function Notifications() {
  const [status, setStatus] = useState<'' | 'REQUEST' | 'REPORT' | 'NOTICE'>('');
  const { user } = useUser();
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const { data, refetch, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<PaginateReponse<Notification>>({
      queryKey: [`notification-list`],
      queryFn: async ({ pageParam }) =>
        httpClient({
          path: `/notifications`,
          method: 'GET',
          queryString: {
            page: pageParam,
            limit: 8,
            subjectUuid: user.uuid,
          },
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.meta.nextPage,
    });

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
              key={item.itemUuid}
              itemUuid={item.itemUuid}
              title={item.title}
              description={item.description}
              createAt={new Date(item.createAt)}
              type={item.type}
              isRead={item.isRead}
            />
          );
        }}
        estimatedItemSize={15}
        keyExtractor={(item) => item.itemUuid}
        data={data?.pages.flatMap((page) => page.items) || []}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => queryClient.invalidateQueries({ queryKey: ['notification-list'] })}
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
