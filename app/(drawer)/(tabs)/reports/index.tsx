import { FlashList } from '@shopify/flash-list';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { RefreshControl, StatusBar, View } from 'react-native';

import { useFilter } from '~/app/components/FilterProvider';
import ReportItem from '~/app/components/ReportItem';
import { useUser } from '~/app/components/UserProvider';
import ReporItemSkeleton from '~/app/lib/Loader/ReporItemSkeleton';
import { httpClient } from '~/app/lib/http.client';
import { PaginateReponse } from '~/app/lib/types/paginate-response.type';
import { ReportType } from '~/app/lib/types/report.type';

export default function Reports() {
  const { reportFilter } = useFilter();
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<
    PaginateReponse<ReportType>
  >({
    queryKey: [`reports-list`],
    queryFn: async ({ pageParam }) =>
      httpClient({
        path: `/reports`,
        method: 'GET',
        queryString: {
          page: pageParam,
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
        <View style={{ flex: 1, width: '100%', height: 400, paddingTop: 10 }}>
          {isFetching && !isFetchingNextPage ? (
            <View>
              <ReporItemSkeleton key={1} />
              <ReporItemSkeleton key={2} />
              <ReporItemSkeleton key={3} />
              <ReporItemSkeleton key={4} />
              <ReporItemSkeleton key={5} />
              <ReporItemSkeleton key={6} />
              <ReporItemSkeleton key={7} />
              <ReporItemSkeleton key={8} />
              <ReporItemSkeleton key={9} />
              <ReporItemSkeleton key={10} />
            </View>
          ) : (
            <FlashList
              renderItem={({ item }: { item: ReportType }) => (
                <ReportItem
                  uuid={item.uuid}
                  title={item.title}
                  createdAt={item.createdAt}
                  key={item.uuid}
                  onPress={() => router.navigate(`/screens/report/Detail?uuid=${item.uuid}`)}
                />
              )}
              estimatedItemSize={5}
              onEndReached={() => {
                if (hasNextPage) fetchNextPage();
              }}
              keyExtractor={(item) => item.uuid}
              data={data?.pages.flatMap((page) => page.items) || []}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => queryClient.invalidateQueries({ queryKey: ['reports-list'] })}
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
