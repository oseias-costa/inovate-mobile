import Modal from '@ant-design/react-native/lib/modal';
import Provider from '@ant-design/react-native/lib/provider';
import { FlashList } from '@shopify/flash-list';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  View,
  StyleSheet,
  ActivityIndicatorComponent,
} from 'react-native';

import RequestItemDashboard from '~/app/components/RequestItemDashboard';
import SelectStatus from '~/app/components/SelectStatus';
import { useUser } from '~/app/components/UserProvider';
import { httpClient } from '~/app/lib/http.client';
import { RequestData, RequestType } from '~/app/types/request.type';

export default function Requests() {
  const [status, setStatus] = useState<'' | 'PENDING' | 'FINISH' | 'EXPIRED'>('');
  const { user } = useUser();
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const { data, isLoading, refetch, isSuccess, fetchNextPage, hasNextPage, isRefetching } =
    useInfiniteQuery<RequestData>({
      queryKey: [`requests`],
      queryFn: async ({ pageParam }) =>
        httpClient({
          path: `/requests`,
          method: 'GET',
          queryString: {
            page: pageParam,
            limit: 8,
            companyUuid: user.uuid,
            status,
          },
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.meta.nextPage,
    });
  console.log('isRefetching', isRefetching);

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
            <SelectStatus item="EXPIRED" setStatus={setStatus} status={status} />
            <SelectStatus item="FINISH" setStatus={setStatus} status={status} />
          </ScrollView>
        </View>
        <View style={{ flex: 1, width: '100%', height: '100%' }}>
          <FlashList
            renderItem={({ item }: { item: RequestType }) => (
              <RequestItemDashboard
                uuid={item?.uuid}
                title={item?.documentName}
                expiration={item?.expiration}
                key={item?.uuid}
                status={item?.status}
                onPress={() => router.navigate(`/screens/request/Detail?uuid=${item?.uuid}`)}
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
                onRefresh={() => {
                  // setPage(1);
                  // refetch();
                  return queryClient.invalidateQueries({ queryKey: ['requests'] });
                }}
                colors={['#9Bd35A', '#689F38']}
                progressBackgroundColor="#fff"
              />
            }
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </>
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
