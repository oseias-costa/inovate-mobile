import { FlashList } from '@shopify/flash-list';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { RefreshControl, ScrollView, StatusBar, View, StyleSheet } from 'react-native';

import NoticeItemDashboard from '~/app/components/NoticeItemDashboard';
import SelectStatus from '~/app/components/SelectStatus';
import { useUser } from '~/app/components/UserProvider';
import NoticeItemSkeleton from '~/app/lib/Loader/NoticeItemSkeleton';
import { httpClient } from '~/app/lib/http.client';
import { NoticeType } from '~/app/lib/types/notice.type';
import { PaginateReponse } from '~/app/lib/types/paginate-response.type';

export default function Notice() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const { data, refetch, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<PaginateReponse<NoticeType>>({
      queryKey: [`notice-list`],
      queryFn: async ({ pageParam }) =>
        httpClient({
          path: `/notice`,
          method: 'GET',
          queryString: {
            page: Number(pageParam),
            limit: 8,
            companyUuid: user.uuid,
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
            {/* <SelectStatus item="" setStatus={setStatus} status={status} />
            <SelectStatus item="PENDING" setStatus={setStatus} status={status} />
            <SelectStatus item="EXPIRED" setStatus={setStatus} status={status} />
            <SelectStatus item="FINISH" setStatus={setStatus} status={status} /> */}
          </ScrollView>
        </View>
        <View style={{ width: '100%', height: 400, paddingTop: 10 }}>
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
