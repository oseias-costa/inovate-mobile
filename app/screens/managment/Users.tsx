import { Switch } from '@ant-design/react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlashList } from '@shopify/flash-list';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { Stack, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SelectUserType from '~/app/components/SelectUserType';

import { useUser } from '~/app/components/UserProvider';
import RequestItemSkeleton from '~/app/lib/Loader/RequestItemSkeleton';
import { CustomButton } from '~/app/lib/components/CustomButton';
import UserItem from '~/app/lib/components/UserItem';
import { httpClient } from '~/app/lib/http.client';
import { PaginateReponse } from '~/app/lib/types/paginate-response.type';
import { User } from '~/app/lib/types/user.type';

export default function Users() {
  const [type, setType] = useState<'USER' | 'COMPANY'>('COMPANY');
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const { data, refetch, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<PaginateReponse<User>>({
      queryKey: [`users`],
      queryFn: async ({ pageParam }) =>
        httpClient({
          path: `/users`,
          method: 'GET',
          queryString: {
            page: Number(pageParam),
            limit: 8,
            type,
          },
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.meta.nextPage,
    });

  useEffect(() => {
    refetch();
  }, [type]);

  console.log('ussser', data);
  return (
    <>
      <Stack.Screen
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Usuários',
          headerTintColor: '#fff',
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons name="arrow-back-ios" size={24} color="white" style={{ right: 8 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
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
            <SelectUserType item="COMPANY" setStatus={setType} status={type} />
            <SelectUserType item="USER" setStatus={setType} status={type} />
          </ScrollView>
        </View>
        {false ? (
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
            renderItem={({ item }: { item: User }) => (
              <UserItem
                name={item.name}
                email={item.email}
                type={item.type}
                status={item.status}
                onPress={() => {}}
              />
            )}
            onEndReached={() => {
              if (hasNextPage) fetchNextPage();
            }}
            estimatedItemSize={12}
            keyExtractor={(item) => item?.uuid || Math.random().toString()}
            data={data?.pages?.flatMap((page) => page.items) || []}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => queryClient.invalidateQueries({ queryKey: ['users'] })}
                colors={['#9Bd35A', '#689F38']}
                progressBackgroundColor="#fff"
              />
            }
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingBottom: 20,
  },
  gradient: {
    position: 'relative',
    height: 150,
    borderEndEndRadius: 50,
    borderEndStartRadius: 50,
    bottom: 1,
    zIndex: 2,
    marginBottom: 30,
  },
  destakContainer: {
    position: 'relative',
    bottom: 1,
    zIndex: 1,
    backgroundColor: '#00264B',
    height: 60,
  },
  imgBox: {
    backgroundColor: '#fff',
    // alignSelf: 'center',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 15,
  },
  userPhoto: {
    borderRadius: 500,
    width: 96,
    height: 96,
    alignSelf: 'center',
  },
  userName: {
    color: '#3B3D3E',
    fontSize: 24,
    fontFamily: 'Lato_400Regular',
    marginTop: 10,
    alignSelf: 'center',
  },
  userEmail: {
    color: '#3B3D3E',
    fontSize: 16,
    fontFamily: 'Lato_300Light',
    alignSelf: 'center',
  },
  itemBox: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: '#0000000b',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#00000017',
    alignItems: 'center',
  },
  itemText: {
    paddingLeft: 20,
    fontSize: 18,
    fontFamily: 'Lato_400Regular',
    color: '#3b3d3e',
  },
  title: {
    color: '#3F3D56',
    fontFamily: 'Lato_400Regular',
    fontSize: 24,
    paddingTop: 20,
  },
  email: {
    color: '#716F6F',
    fontFamily: 'Lato_400Regular',
    marginBottom: 20,
    fontSize: 17,
  },
  itemAccountText: {
    color: '#716F6F',
    fontFamily: 'Lato_400Regular',
    marginBottom: 20,
    fontSize: 19,
  },
  itemAccount: {
    display: 'flex',
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#C5C4C0',
    borderTopWidth: 1,
  },
});
