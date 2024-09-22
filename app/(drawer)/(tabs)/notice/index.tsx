import Modal from '@ant-design/react-native/lib/modal';
import Provider from '@ant-design/react-native/lib/provider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlashList } from '@shopify/flash-list';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { RefreshControl, ScrollView, StatusBar, View, StyleSheet } from 'react-native';

import NoticeItemDashboard from '~/app/components/NoticeItemDashboard';
import SelectStatus from '~/app/components/SelectStatus';
import { useUser } from '~/app/components/UserProvider';
import ToastTest from '~/app/lib/ToastTest';
import NoticeDetail from '~/app/notice/components/detail';
import { RequestData } from '~/app/types/request.type';

export default function Notice() {
  const [status, setStatus] = useState<'' | 'PENDING' | 'FINISH' | 'EXPIRED'>('');
  const { user } = useUser();
  const [pagination, setPagination] = useState({ page: '1', limit: '20' });
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
    queryKey: ['notice'],
    queryFn: async () => {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      const documents = await axios({
        method: 'GET',
        baseURL: `${process.env.EXPO_PUBLIC_API_URL}/notice?page=${pagination.page}&limit=${pagination.limit}&companyUuid=${user.uuid}`,
        headers: { Authorization: `Bearer ${token}` },
      });

      return documents.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [status]);

  const ToastRef = useRef(null);
  const showToast = () => {
    if (ToastRef.current) {
      ToastRef?.current?.toast();
    }
  };

  return (
    <>
      <View style={{ backgroundColor: '#fff', position: 'relative', flex: 1 }}>
        <ToastTest ref={ToastRef} message="Solicitação aberta!" />
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
        <View style={{ width: '100%', height: 400, paddingTop: 10 }}>
          <FlashList
            renderItem={({ item }: { item: any }) => (
              <NoticeItemDashboard
                uuid={item.uuid}
                title={item.title}
                description={item.text}
                createdAt={item.createdAt}
                key={item.uuid}
                onPress={() => {
                  setItemUuid(item.uuid);
                  setOpenModal(true);
                }}
              />
            )}
            estimatedItemSize={5}
            keyExtractor={(item) => item.uuid}
            data={data?.items}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => queryClient.invalidateQueries({ queryKey: ['notice'] })}
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
              <NoticeDetail uuid={itemUuid} />
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
