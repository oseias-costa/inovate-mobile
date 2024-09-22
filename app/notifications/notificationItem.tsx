import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Notification = {
  type: string;
  title: string;
  description: string;
  time: Date;
  id: string;
  read: boolean;
};

export default function NotificationItem(notification: Notification) {
  const width = Dimensions.get('screen').width;

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: notification.read ? '#00264B09' : '' }]}>
      {notification.read ? (
        <FontAwesome name="circle" size={12} color="#6597C9" style={styles.circle} />
      ) : null}
      <View style={styles.container}>
        <Image style={styles.img} source={require('../../assets/dashboard/logo.png')} />
        <View style={styles.box}>
          <Text style={styles.type}>Status da notificação</Text>
          <Text style={[styles.title, { width: width - 115 }]} numberOfLines={1}>
            {notification.title}
          </Text>
          <Text style={[styles.description, { width: width - 115 }]} numberOfLines={1}>
            {notification.description}
          </Text>
        </View>
      </View>
      <Text style={styles.notificationTime}>1 hora atrás</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    borderBottomWidth: 0.4,
    borderBottomColor: '#6597C9',
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  box: {
    marginLeft: 10,
  },
  type: {
    color: '#6597C9',
    marginBottom: 5,
  },
  title: {
    color: '#3F3D56',
    fontFamily: 'Lato_400Regular',
    fontSize: 18,
  },
  description: {
    fontFamily: 'Lato_300Light',
    fontSize: 14,
    color: '#716F6F',
  },
  notificationTime: {
    alignSelf: 'flex-end',
    paddingRight: 20,
    color: '#3B3D3E',
    fontFamily: 'Lato_400Regular',
  },
  img: {
    width: 45,
    height: 45,
  },
  circle: {
    position: 'absolute',
    right: 20,
    top: 50,
  },
});
