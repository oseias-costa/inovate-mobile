import { useMutation, useQueryClient } from '@tanstack/react-query';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import NoticeItemDashboard from '~/app/components/NoticeItemDashboard';
import ReportItem from '~/app/components/ReportItem';
import RequestItemDashboard from '~/app/components/RequestItemDashboard';
import { useUser } from '~/app/components/UserProvider';
import useFontLato from '~/app/hook/useFontLato';
import NoticeItemSkeleton from '~/app/lib/Loader/NoticeItemSkeleton';
import NumbersSkeleton from '~/app/lib/Loader/NumbersSkeleton';
import ReporItemSkeleton from '~/app/lib/Loader/ReporItemSkeleton';
import RequestItemSkeleton from '~/app/lib/Loader/RequestItemSkeleton';
import { EmptyData } from '~/app/lib/components/EmptyData';
import useDashboard from '~/app/lib/hooks/useDashboard';
import { httpClient } from '~/app/lib/http.client';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Dashboard() {
  const fontsLoades = useFontLato();
  const [expoPushToken, setExpoPushToken] = useState('');
  const { data, isFetching, refetch } = useDashboard();
  const { user, refetch: refetchUser } = useUser();
  const [refreshing, setRefreshing] = useState(false);
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(
    undefined
  );
  const queryClient = useQueryClient();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const destakeRef = useRef<View | null>(null);
  const [height, setHeight] = useState(0);
  const screenHeight = Dimensions.get('screen').height;

  const handleLayout = () => {
    if (destakeRef.current) {
      destakeRef.current.measure(
        (x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
          setHeight(height);
        }
      );
    }
  };

  useEffect(() => {
    handleLayout();
  }, [destakeRef]);

  const mutation = useMutation({
    mutationKey: ['device-token'],
    mutationFn: async () =>
      httpClient({
        method: 'POST',
        path: '/notifications/token',
        data: {
          userUuid: user?.uuid,
          deviceToken: expoPushToken,
          type: Platform.OS === 'android' ? 'ANDROID' : 'IOS',
          active: true,
        },
      }),
  });

  if (mutation.isError) {
    console.log(mutation.error);
  }

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        token && setExpoPushToken(token);
        mutation.mutate();
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    console.log('tentando pegar');
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
      console.log(notification);

      const notificationBody = notification.request.content.data;
      refetch();
      if (notificationBody['type'] === 'REQUEST') {
        return queryClient.invalidateQueries({ queryKey: ['requests-pending', 'requests'] });
      }
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      const notificationBody = response.notification.request.content.data;
      if (notificationBody['type'] === 'REQUEST') {
        return router.navigate(`/screens/request/Detail?uuid=${notificationBody['uuid']}`);
      }
      if (notificationBody['type'] === 'NOTICE') {
        return router.navigate(`/screens/notice/Detail?uuid=${notificationBody['uuid']}`);
      }
      if (notificationBody['type'] === 'REPORT') {
        return router.navigate(`/screens/report/Detail?uuid=${notificationBody['uuid']}`);
      }
    });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [notificationListener, responseListener]);

  if (!fontsLoades) {
    return <Text>Loading</Text>;
  }
  const onRefresh = async () => {
    await refetch();
  };

  return (
    <>
      <StatusBar barStyle="light-content" hidden={false} />
      <View style={{ backgroundColor: '#fff', position: 'relative' }}>
        <View style={styles.destakBox} ref={destakeRef}>
          <View style={styles.welcomeBox}>
            <Text style={styles.welcomeText}>Bem vindo, </Text>
            <Text style={styles.welcomeNameUser}>{user?.name}.</Text>
          </View>
          <View style={[styles.numbersBox]}>
            {isFetching ? (
              <NumbersSkeleton />
            ) : (
              <>
                <NumberItem description="Solicitações" number={data?.numbers?.requests} />
                <NumberItem description="Avisos" number={data?.numbers?.notice} />
                <NumberItem description="Relatórios" number={data?.numbers?.reports} />
              </>
            )}
          </View>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          decelerationRate="fast"
          style={{ margin: 0, backgroundColor: '#fff', padding: 0 }}
          contentContainerStyle={{ paddingBottom: 0 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View style={[styles.titleBox, { paddingBottom: 15 }]}>
            <Text style={[styles.title, { marginTop: 60 }]}>Solicitações</Text>
            <TouchableOpacity onPress={() => router.navigate('/requests')}>
              <Text style={styles.seeAll}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          {isFetching ? (
            <>
              <RequestItemSkeleton key={1} />
              <RequestItemSkeleton key={2} />
              <RequestItemSkeleton key={3} />
            </>
          ) : (
            data.requests?.items?.map((request: any) => (
              <RequestItemDashboard
                uuid={request.uuid}
                title={request.documentName}
                expiration={request.expiration}
                key={request.uuid}
                status={request?.status}
                onPress={() =>
                  router.navigate({
                    pathname: '/screens/request/Detail',
                    params: { uuid: request.uuid },
                  })
                }
              />
            ))
          )}
          {!isFetching && data?.requests?.items.length === 0 ? (
            <EmptyData text="Você não tem solicitações de documentos pendentes" size="small" />
          ) : null}
          <View style={[styles.titleBox, { paddingBottom: 15 }]}>
            <Text style={[styles.title, { marginTop: 25 }]}>Avisos</Text>
            <TouchableOpacity onPress={() => router.navigate('/notice')}>
              <Text style={styles.seeAll}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          {isFetching ? (
            <>
              <NoticeItemSkeleton key={1} />
              <NoticeItemSkeleton key={2} />
              <NoticeItemSkeleton key={3} />
            </>
          ) : (
            data?.notice?.items?.map((item: any) => (
              <NoticeItemDashboard
                uuid={item.uuid}
                title={item.title}
                description={item.text}
                createdAt={item.createdAt}
                onPress={() =>
                  router.navigate({
                    pathname: '/screens/notice/Detail',
                    params: { uuid: item.uuid },
                  })
                }
                key={item.uuid}
              />
            ))
          )}
          {!isFetching && data?.notice?.items.length === 0 ? (
            <EmptyData text="Você ainda não tem avisos" size="small" />
          ) : null}

          <View style={{ paddingBottom: 120 }}>
            <View style={[styles.titleBox, { paddingBottom: 15 }]}>
              <Text style={[styles.title, { marginTop: 25 }]}>Relatórios</Text>
              <TouchableOpacity onPress={() => router.navigate('/reports')}>
                <Text style={styles.seeAll}>Ver todos</Text>
              </TouchableOpacity>
            </View>
            {isFetching ? (
              <>
                <ReporItemSkeleton key={1} />
                <ReporItemSkeleton key={2} />
                <ReporItemSkeleton key={3} />
              </>
            ) : (
              data?.reports?.items?.map((report: any) => (
                <ReportItem
                  key={report.uuid}
                  title={report.title}
                  createdAt={report.createdAt}
                  onPress={() =>
                    router.navigate({
                      pathname: '/screens/report/Detail',
                      params: { uuid: report.uuid },
                    })
                  }
                  uuid={report.uuid}
                />
              ))
            )}
            {!isFetching && data?.reports?.items.length === 0 ? (
              <EmptyData text="Você ainda não tem relatórios" size="small" />
            ) : null}
          </View>
        </ScrollView>
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

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // EAS projectId is used here.
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error('Project ID not found');
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

const styles = StyleSheet.create({
  destakBox: {
    position: 'relative',
    height: 110,
    paddingTop: 10,
    bottom: 1,
    zIndex: 2,
    backgroundColor: '#00264B',
  },
  welcomeBox: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,

    marginHorizontal: 20,
  },
  logoIcon: {
    marginLeft: 20,
    marginRight: 10,
  },
  welcomeText: {
    color: '#fff',
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
  },
  welcomeNameUser: {
    color: '#fff',
    fontFamily: 'Lato_700Bold',
    fontSize: 14,
  },
  titleBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginHorizontal: 20,
  },
  title: {
    color: '#005AB1',
    fontSize: 22,
    fontFamily: 'Lato_400Regular',
    position: 'relative',
    zIndex: 1,
  },
  seeAll: {
    fontSize: 14,
    color: '#3B3D3E',
    fontFamily: 'Lato_400Regular',
  },
  numbersBox: {
    width: '90%',
    height: 'auto',
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 32,
    position: 'absolute',
    top: 54,
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
