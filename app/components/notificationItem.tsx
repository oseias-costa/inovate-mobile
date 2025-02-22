import FontAwesome from '@expo/vector-icons/FontAwesome';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Href, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Notification } from '../lib/types/notification.type';

export default function NotificationItem(notification: Notification) {
  const width = Dimensions.get('screen').width;
  const router = useRouter();

  const typeDescription = {
    REPORT: 'Relatório Inovate',
    NOTICE: 'Aviso',
    REQUEST: 'Solicitação de documentos',
  };

  const result = formatDistanceToNow(notification?.createAt, { addSuffix: true, locale: ptBR });
  const url =
    `/screens/${notification.type.toLowerCase()}/Detail?uuid=${notification.itemUuid}` as unknown as Href;

  return (
    <TouchableOpacity
      onPress={() => router.push(url)}
      style={[styles.button, { backgroundColor: notification.isRead ? '#fff' : '#00264B09' }]}>
      {!notification.isRead ? (
        <FontAwesome name="circle" size={12} color="#6597C9" style={styles.circle} />
      ) : null}
      <View style={styles.container}>
        <Image style={styles.img} source={require('../../assets/dashboard/logo.png')} />
        <View style={styles.box}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 2,
            }}>
            <Text style={styles.type}>{typeDescription[notification.type]}</Text>
            <Text style={styles.notificationTime}>{result}</Text>
          </View>
          <Text style={[styles.title, { width: width - 115 }]} numberOfLines={1}>
            {notification.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    borderBottomWidth: 0.4,
    borderBottomColor: '#ccc',
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    flexDirection: 'row',
  },
  box: {
    marginLeft: 10,
  },
  type: {
    color: '#6597C9',
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
  },
  title: {
    color: '#3F3D56',
    fontFamily: 'Lato_400Regular',
    fontSize: 16,
  },
  description: {
    fontFamily: 'Lato_300Light',
    fontSize: 14,
    color: '#716F6F',
  },
  notificationTime: {
    left: 30,
    color: '#3B3D3E',
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
  },
  img: {
    width: 30,
    height: 30,
    top: 5,
  },
  circle: {
    position: 'absolute',
    right: 25,
    top: 43,
  },
});
