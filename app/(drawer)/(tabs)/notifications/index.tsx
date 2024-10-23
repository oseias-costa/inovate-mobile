import { FlashList } from '@shopify/flash-list';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, View, StyleSheet } from 'react-native';

import NotificationFilterItem from '~/app/components/NotificationFilterItem';
import { useUser } from '~/app/components/UserProvider';
import NotificationItem from '~/app/components/notificationItem';
import NotificationItemSkeleton from '~/app/lib/Loader/NotificationItemSkeleton';
import { EmptyData } from '~/app/lib/components/EmptyData';
import { httpClient } from '~/app/lib/http.client';
import { Notification } from '~/app/lib/types/notification.type';
import { PaginateReponse } from '~/app/lib/types/paginate-response.type';

export default function Notifications() {
  const [filter, setFilter] = useState<'' | 'REQUEST' | 'NOTICE' | 'REPORT'>('');
  const { user } = useUser();
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const empty: { [key: string]: string } = {
    REQUEST: ' de solicitações ',
    NOTICE: ' de avisos',
    REPORT: ' de relatórios',
  };

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
            subjectUuid: user?.uuid,
            type: filter,
          },
        }),
      retry: false,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.meta.nextPage,
    });

  const mutate = useMutation({
    mutationKey: ['update-notifications'],
    mutationFn: async () =>
      httpClient({
        path: '/notifications',
        method: 'PATCH',
        queryString: {
          userUuid: user?.uuid,
        },
      }),
  });

  const update = () => mutate.mutate();

  useEffect(() => {
    if (user && data) {
      console.log('eeeeeeee');
      update();
    }
  }, [data, user]);

  useEffect(() => {
    refetch();
  }, [filter]);

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
      <View style={styles.destakContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate="normal"
          contentContainerStyle={{
            marginHorizontal: 15,
            paddingTop: 15,
            flexDirection: 'row',
            paddingRight: 20,
            bottom: 5,
          }}>
          <NotificationFilterItem item="" setFilter={setFilter} filter={filter} />
          <NotificationFilterItem item="REQUEST" setFilter={setFilter} filter={filter} />
          <NotificationFilterItem item="NOTICE" setFilter={setFilter} filter={filter} />
          <NotificationFilterItem item="REPORT" setFilter={setFilter} filter={filter} />
        </ScrollView>
      </View>
      {!isFetching && !isFetchingNextPage && data?.pages[0].items.length === 0 ? (
        <View style={{ paddingTop: 20 }}>
          <EmptyData text={`Você ainda não tem notificações${empty[filter]}`} size="medium" />
        </View>
      ) : null}
      {isFetching && !isFetchingNextPage ? (
        <>
          <NotificationItemSkeleton key={1} />
          <NotificationItemSkeleton key={2} />
          <NotificationItemSkeleton key={3} />
          <NotificationItemSkeleton key={4} />
          <NotificationItemSkeleton key={5} />
          <NotificationItemSkeleton key={6} />
          <NotificationItemSkeleton key={7} />
          <NotificationItemSkeleton key={8} />
          <NotificationItemSkeleton key={9} />
        </>
      ) : (
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
          onEndReached={() => {
            if (hasNextPage) fetchNextPage();
          }}
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
      )}
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
