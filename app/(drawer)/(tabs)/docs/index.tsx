import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ItemList from '~/app/components/ItemList';
import SelectStatus from '~/app/components/SelectStatus';
import Subtitle from '~/app/components/Subtitle';
import { Document } from '~/app/types/doc.type';
import { FlashList } from '@shopify/flash-list';
import { Button } from '~/components/Button';
import Toast from '~/app/lib/Toast';

export default function Docs() {
  const [status, setStatus] = useState<'all' | 'pending' | 'ok' | 'waiting'>('all');
  const [filter, setFilter] = useState({ user: '', company: '' });
  const [pagination, setPagination] = useState({ page: '1', limit: '20' });
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);


  const getDocuments = async () => {
    const token = await AsyncStorage.getItem('token');
    const documents = await axios({
      method: 'GET',
      baseURL: `http://10.0.0.101:3009/document?page=${pagination.page}&limit=${pagination.limit}&user=${filter.user}&company&${filter.company}`,
      headers: { Authorization: `Bearer ${token}` },
    });

    return documents.data;
  };
  const { data: docs, isLoading } = useQuery<Documents>({
    queryKey: [`documents`],
    queryFn: getDocuments,
  });

  type Documents = {
    items: Document[];
    meta: {
      totalItems: number;
      itemCount: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    };
  };
  const ToastRef = useRef(null);
  const showToast = () => {
    if(ToastRef.current){
      ToastRef?.current?.toast();
    }
   };

  console.log('docs', docs);
  return (
    <>
      <View style={{ backgroundColor: '#fff', position: 'relative', flex: 1 }}>
        <Toast ref={ToastRef} message="Hello World!" />
        <StatusBar barStyle="light-content" hidden={false} />
        <View style={[styles.numbersBox]}>
          <NumberItem description="Aguardando" number={15} />
          <NumberItem description="Pendentes" number={5} />
          <NumberItem description="Concluídas" number={6} />
        </View>
        <LinearGradient colors={['#00264B', '#005AB1']} style={styles.gradient}>
          <View style={styles.titleBox}>
            {/* <Ionicons name="document-text" size={28} color='#fff' /> */}
            <Text style={styles.title}>Documentos</Text>
          </View>
          <Text style={styles.text}>{docs?.meta.totalItems} solicitações abertas em Abril</Text>
        </LinearGradient>
        <Subtitle text="Solicitações" />
        <View style={{ height: 60 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate="normal"
            contentContainerStyle={{
              marginHorizontal: 15,
              marginVertical: 20,
              flexDirection: 'row',
              paddingRight: 20,
              height: 40,
            }}>
            <SelectStatus item="all" setStatus={setStatus} status={status} />
            <SelectStatus item="pending" setStatus={setStatus} status={status} />
            <SelectStatus item="waiting" setStatus={setStatus} status={status} />
            <SelectStatus item="ok" setStatus={setStatus} status={status} />
          </ScrollView>
        </View>
        <View style={{ width: '100%', height: 400, paddingHorizontal: 20 }}>
          <FlashList
            renderItem={({ item }) => {
              return <ItemList doc={item} key={item.id} />;
            }}
            estimatedItemSize={5}
            keyExtractor={(item) => item.id}
            data={docs?.items}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => queryClient.invalidateQueries({ queryKey: ['documents'] })}
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

const NumberItem = ({ description, number }: { description: string; number: number }) => {
  return (
    <View style={styles.numberItemBox}>
      <Text style={styles.numberDescription}>{description}</Text>
      <Text style={styles.number}>{number}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    height: 150,
    borderEndEndRadius: 50,
    borderEndStartRadius: 50,
    padding: 20,
    paddingTop: 10,
    position: 'relative',
    bottom: 1,
    marginBottom: 45,
    zIndex: 1,
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
  numbersBox: {
    marginHorizontal: 20,
    width: '90%',
    height: 'auto',
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 32,
    position: 'absolute',
    top: 84,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  numberItemBox: {
    alignItems: 'center',
  },
  numberDescription: {
    color: '#3B3D3E',
    fontSize: 12,
    fontFamily: 'Lato_400Regular',
  },
  number: {
    color: '#00264B',
    fontSize: 46,
    fontFamily: 'Lato_300Light',
  },
});
