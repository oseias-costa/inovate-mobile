import { FlashList } from '@shopify/flash-list';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { router, usePathname, useSegments } from 'expo-router';
import React, { useState } from 'react';
import { RefreshControl, ScrollView, StatusBar, View, StyleSheet } from 'react-native';

import NoticeFilterItem from '~/app/components/NoticeFilterItem';
import NoticeItemDashboard from '~/app/components/NoticeItemDashboard';
import { useUser } from '~/app/components/UserProvider';
import NoticeItemSkeleton from '~/app/lib/Loader/NoticeItemSkeleton';
import { EmptyData } from '~/app/lib/components/EmptyData';
import { httpClient } from '~/app/lib/http.client';
import { NoticeType } from '~/app/lib/types/notice.type';
import { PaginateReponse } from '~/app/lib/types/paginate-response.type';

export default function Notice() {
  const [filter, setFilter] = useState<'' | 'GENERAL' | 'FINANTIAL' | 'DEADLINES'>('');
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const segments = useSegments();
  const fullPath = `/${segments.join('/')}`;
  console.log(fullPath);

  const { data, refetch, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<PaginateReponse<NoticeType>>({
      queryKey: [`notice-list`],
      queryFn: async ({ pageParam }) =>
        httpClient({
          path: `/notice`,
          method: 'GET',
          queryString: {
            page: pageParam,
            limit: 8,
            uuid: user?.uuid,
          },
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.meta.nextPage,
    });

  return (
    <>
      <View style={{ backgroundColor: '#fff', position: 'relative', flex: 1 }}>
        <StatusBar barStyle="light-content" hidden={false} />
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
            <NoticeFilterItem item="" setFilter={setFilter} filter={filter} />
            <NoticeFilterItem item="GENERAL" setFilter={setFilter} filter={filter} />
            <NoticeFilterItem item="FINANTIAL" setFilter={setFilter} filter={filter} />
            <NoticeFilterItem item="DEADLINES" setFilter={setFilter} filter={filter} />
          </ScrollView>
        </View>
        <View style={{ flex: 1, width: '100%', height: 400, paddingTop: 10 }}>
          <View style={{ paddingTop: 10 }}>
            {!isFetching && !isFetchingNextPage && data?.pages[0].items.length === 0 ? (
              <EmptyData text="Você ainda não tem avisos" size="medium" />
            ) : null}
          </View>
          {isFetching && !isFetchingNextPage ? (
            <View>
              <NoticeItemSkeleton key={1} />
              <NoticeItemSkeleton key={2} />
              <NoticeItemSkeleton key={3} />
              <NoticeItemSkeleton key={4} />
              <NoticeItemSkeleton key={5} />
              <NoticeItemSkeleton key={6} />
              <NoticeItemSkeleton key={7} />
              <NoticeItemSkeleton key={8} />
            </View>
          ) : (
            <FlashList
              renderItem={({ item }: { item: NoticeType }) => (
                <NoticeItemDashboard
                  uuid={item.uuid}
                  title={item.title}
                  description={item.text}
                  createdAt={item.createdAt}
                  key={item.uuid}
                  onPress={() => router.navigate(`/screens/notice/Detail?uuid=${item.uuid}`)}
                />
              )}
              estimatedItemSize={5}
              keyExtractor={(item) => item.uuid}
              data={data?.pages.flatMap((page) => page.items) || []}
              onEndReached={() => {
                if (hasNextPage) fetchNextPage();
              }}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => queryClient.invalidateQueries({ queryKey: ['notice-list'] })}
                  colors={['#9Bd35A', '#689F38']}
                  progressBackgroundColor="#fff"
                />
              }
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </>
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
