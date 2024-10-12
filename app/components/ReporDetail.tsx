import { MaterialIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { formatDate } from '../lib/date';

export default function ReportDetail({ uuid }: { uuid: string }) {
  //const expiration = formatDate(new Date(document?.expiration));

  const { data, isFetching } = useQuery({
    queryKey: [`reports-${uuid}`],
    queryFn: async () => {
      const token = await AsyncStorage.getItem('token');
      const companys = await axios({
        method: 'GET',
        baseURL: `${process.env.EXPO_PUBLIC_API_URL}/reports/${uuid}`,
        headers: { Authorization: `Bearer ${token}` },
      });

      return companys.data;
    },
  });
  return (
    <View style={{ paddingBottom: 25, paddingTop: 20, marginHorizontal: 20 }}>
      <Text style={styles.date}>{formatDate(new Date(data?.createdAt))}</Text>
      <Text style={styles.title}>{data?.title}</Text>
      <Text style={styles.description}>{data?.text}</Text>
      <View style={styles.attachContainer}>
        <Ionicons name="attach" size={24} color="#005AB1" />
        <Text style={styles.attachTitle}>Algum-documento-do-aviso.pdf</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 20,
    flex: 1,
    justifyContent: 'flex-start',
  },
  button: {
    marginHorizontal: 20,
    marginTop: 'auto',
    zIndex: 1,
  },
  headerButton: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Lato_400Regular',
  },
  title: {
    color: '#3B3D3E',
    fontSize: 20,
    fontFamily: 'Lato_400Regular',
    position: 'relative',
    zIndex: 1,
  },
  expirationContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  date: {
    fontSize: 14,
    color: '#6D6D6D',
    fontFamily: 'Lato_300Light',
    paddingLeft: 4,
  },
  description: {
    color: '#6D6D6D',
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'Lato_400Regular',
  },
  attachContainer: {
    paddingTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  attachTitle: {
    fontSize: 16,
    color: '#005AB1',
    fontFamily: 'Lato_400Regular',
    paddingLeft: 5,
  },
});
