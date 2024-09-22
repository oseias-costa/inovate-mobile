import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import NoticeItemDashboard from '~/app/components/NoticeItemDashboard';
import RequestItemDashboard from '~/app/components/RequestItemDashboard';
import { useUser } from '~/app/components/UserProvider';
import useDashboard from '~/app/hook/useDashboard';
import useFontLato from '~/app/hook/useFontLato';

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

  console.log(data);
  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        console.log(token);
        token && setExpoPushToken(token);
      })
      .catch(console.log);
    console.log('Registering for push notification');
  }, []);

  const sendNotification = () => {
    console.log('send notification');
  };

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
        <ScrollView>
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
              onPress={() =>
                router.navigate({ pathname: '/requests', params: { openItemUuid: request.uuid } })
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
                router.navigate({ pathname: '/notice', params: { openItemUuid: item.uuid } })
              }
              key={item.uuid}
            />
          ))}
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
      console.log(token);
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
