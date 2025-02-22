import { FlashList } from '@shopify/flash-list';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { router, usePathname, useSegments } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StatusBar, View, StyleSheet } from 'react-native';

import RequestItemDashboard from '~/app/components/RequestItemDashboard';
import SelectStatus from '~/app/components/SelectStatus';
import { useUser } from '~/app/components/UserProvider';
import RequestItemSkeleton from '~/app/lib/Loader/RequestItemSkeleton';
import { EmptyData } from '~/app/lib/components/EmptyData';
import { httpClient } from '~/app/lib/http.client';
import { PaginateReponse } from '~/app/lib/types/paginate-response.type';
import { RequestType } from '~/app/lib/types/request.type';

export default function Requests() {
  const [status, setStatus] = useState<'' | 'PENDING' | 'FINISH' | 'DUE'>('');
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const pathname = useSegments();

  console.log('paaaaaaaaaaaa', pathname);
  const { data, refetch, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<PaginateReponse<RequestType>>({
      queryKey: [`requests`],
      queryFn: async ({ pageParam }) =>
        httpClient({
          path: `/requests`,
          method: 'GET',
          queryString: {
            page: Number(pageParam),
            limit: 8,
            companyUuid: user?.uuid,
            status,
          },
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.meta.nextPage,
    });

  useEffect(() => {
    refetch();
  }, [status]);

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
            <SelectStatus item="" setStatus={setStatus} status={status} />
            <SelectStatus item="PENDING" setStatus={setStatus} status={status} />
            <SelectStatus item="DUE" setStatus={setStatus} status={status} />
            <SelectStatus item="FINISH" setStatus={setStatus} status={status} />
          </ScrollView>
        </View>
        <View style={{ flex: 1, width: '100%', height: '100%' }}>
          {!isFetching && !isFetchingNextPage && data?.pages[0].items.length === 0 ? (
            <View style={{ paddingTop: 20 }}>
              <EmptyData text="Você não tem solicitações de documentos" size="medium" />
            </View>
          ) : null}
          {isFetching && !isFetchingNextPage ? (
            <View style={{ marginTop: 10 }}>
              <RequestItemSkeleton key={1} />
              <RequestItemSkeleton key={2} />
              <RequestItemSkeleton key={3} />
              <RequestItemSkeleton key={4} />
              <RequestItemSkeleton key={5} />
              <RequestItemSkeleton key={6} />
              <RequestItemSkeleton key={7} />
              <RequestItemSkeleton key={8} />
            </View>
          ) : (
            <FlashList
              contentContainerStyle={{ paddingTop: 10 }}
              renderItem={({ item }: { item: RequestType }) => (
                <RequestItemDashboard
                  uuid={item?.uuid}
                  title={item?.documentName}
                  expiration={item?.expiration}
                  key={item?.uuid}
                  status={item?.status}
                  onPress={() => router.push(`/screens/request/Detail?uuid=${item?.uuid}`)}
                />
              )}
              onEndReached={() => {
                if (hasNextPage) fetchNextPage();
              }}
              estimatedItemSize={12}
              keyExtractor={(item) => item.uuid}
              data={data?.pages.flatMap((page) => page.items) || []}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => queryClient.invalidateQueries({ queryKey: ['requests'] })}
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
