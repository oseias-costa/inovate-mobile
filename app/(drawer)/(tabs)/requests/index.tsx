import Modal from '@ant-design/react-native/lib/modal';
import Provider from '@ant-design/react-native/lib/provider';
import { FlashList } from '@shopify/flash-list';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StatusBar, View, StyleSheet } from 'react-native';

import RequestItemDashboard from '~/app/components/RequestItemDashboard';
import SelectStatus from '~/app/components/SelectStatus';
import { useUser } from '~/app/components/UserProvider';
import { httpClient } from '~/app/lib/http.client';
import Detail from '~/app/requests/components/detail';
import { RequestData, RequestType } from '~/app/types/request.type';

export default function Requests() {
  const [status, setStatus] = useState<'' | 'PENDING' | 'FINISH' | 'EXPIRED'>('');
  const { user } = useUser();
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [itemUuid, setItemUuid] = useState('');
  const params = useLocalSearchParams();

  useEffect(() => {
    if (params?.openItemUuid || params?.openItemUuid === itemUuid) {
      setItemUuid(String(params.openItemUuid));
      setOpenModal(true);
      router.setParams({ openItemUuid: '' });
    }
  }, [params?.openItemUuid, itemUuid]);

  const { data, isLoading, refetch } = useQuery<RequestData>({
    queryKey: [`requests`],
    queryFn: () =>
      httpClient({
        path: `/requests`,
        method: 'GET',
        queryString: {
          page: pagination.page,
          limit: pagination.limit,
          companyUuid: user.uuid,
          status,
        },
      }),
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
            <SelectStatus item="EXPIRED" setStatus={setStatus} status={status} />
            <SelectStatus item="FINISH" setStatus={setStatus} status={status} />
          </ScrollView>
        </View>
        <View style={{ width: '100%', height: '100%' }}>
          <FlashList
            renderItem={({ item }: { item: RequestType }) => (
              <RequestItemDashboard
                uuid={item?.uuid}
                title={item?.documentName}
                expiration={item?.expiration}
                key={item?.uuid}
                status={item?.status}
                onPress={
                  () => router.navigate(`/requests/details?id=${item?.uuid}`)
                  // setItemUuid(item?.uuid);
                  // setOpenModal(true);
                }
              />
            )}
            estimatedItemSize={pagination.limit}
            keyExtractor={(item) => item.uuid}
            data={data?.items}
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
        </View>
        <Provider>
          <Modal
            popup
            visible={openModal}
            animationType="slide-up"
            closable
            maskClosable
            onClose={() => setOpenModal(false)}>
            <View style={{ height: 'auto' }}>
              <Detail uuid={itemUuid} />
            </View>
          </Modal>
        </Provider>
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
