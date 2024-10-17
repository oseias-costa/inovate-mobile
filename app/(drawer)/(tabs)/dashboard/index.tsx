import { useMutation } from '@tanstack/react-query';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useLoading } from '~/app/components/LoadingProvider';
import NoticeItemDashboard from '~/app/components/NoticeItemDashboard';
import ReportItem from '~/app/components/ReportItem';
import RequestItemDashboard from '~/app/components/RequestItemDashboard';
import { Severity, useToast } from '~/app/components/ToastProvider';
import { useUser } from '~/app/components/UserProvider';
import useDashboard from '~/app/hook/useDashboard';
import useFontLato from '~/app/hook/useFontLato';
import { httpClient } from '~/app/lib/http.client';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Dashboard() {
  const fontsLoades = useFontLato();
  const [expoPushToken, setExpoPushToken] = useState('');
  const { data } = useDashboard();
  const { user } = useUser();
  const { showToast } = useToast();
  const { setLoading } = useLoading();

  const mutation = useMutation({
    mutationKey: ['device-token'],
    mutationFn: async () =>
      httpClient({
        method: 'POST',
        path: '/notifications/token',
        data: {
          userUuid: user.uuid,
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
        console.log('TTTKKKK', token);
        token && setExpoPushToken(token);
      })
      .catch(console.log);
    console.log('Registering for push notification');
  }, []);

  const sendNotification = () => {
    console.log('send notification');
  };

  useEffect(() => {
    if (expoPushToken) {
      console.log('PUSSSSH', expoPushToken);
      mutation.mutate();
    }
  }, [expoPushToken]);

  if (!fontsLoades) {
    return <Text>Loading</Text>;
  }
  return (
    <>
      <StatusBar barStyle="light-content" hidden={false} />
      <View style={{ backgroundColor: '#fff', position: 'relative' }}>
        <View style={styles.destakBox}>
          <View style={styles.welcomeBox}>
            <Text style={styles.welcomeText}>Bem vindo, </Text>
            <Text style={styles.welcomeNameUser}>{user?.name}.</Text>
          </View>
          <View style={[styles.numbersBox]}>
            <NumberItem description="Solicitações" number={1} />
            <NumberItem description="Avisos" number={2} />
            <NumberItem description="Relatórios" number={6} />
          </View>
        </View>
        <ScrollView showsHorizontalScrollIndicator={false} decelerationRate="normal">
          <View style={styles.titleBox}>
            <Text style={[styles.title, { marginTop: 60 }]}>Solicitações</Text>
            <TouchableOpacity onPress={() => router.navigate('/requests')}>
              <Text style={styles.seeAll}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          {data.requests?.items?.map((request: any) => (
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
          ))}
          <View style={[styles.titleBox, { paddingBottom: 15 }]}>
            <Text style={[styles.title, { marginTop: 25 }]}>Avisos</Text>
            <TouchableOpacity onPress={() => router.navigate('/notice')}>
              <Text style={styles.seeAll}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          {data?.notice?.items?.map((item: any) => (
            <NoticeItemDashboard
              uuid={item.uuid}
              title={item.title}
              description={item.text}
              createdAt={item.createdAt}
              onPress={() =>
                router.navigate({ pathname: '/screens/notice/Detail', params: { uuid: item.uuid } })
              }
              key={item.uuid}
            />
          ))}
          <View style={{ paddingBottom: 120 }}>
            <View style={[styles.titleBox, { paddingBottom: 15 }]}>
              <Text style={[styles.title, { marginTop: 25 }]}>Relatórios</Text>
              <TouchableOpacity onPress={() => router.navigate('/reports')}>
                <Text style={styles.seeAll}>Ver todos</Text>
              </TouchableOpacity>
            </View>
            {data?.reports?.items?.map((report: any) => (
              <ReportItem
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
            ))}
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
