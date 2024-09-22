import ButtonAnt from '@ant-design/react-native/lib/button';
import { MaterialIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery } from '@tanstack/react-query';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Loading from '../components/Loading';
import { formatDate } from '../lib/date';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Details() {
  const { id } = useLocalSearchParams();
  //const expiration = formatDate(new Date(document?.expiration));

  const { data, isFetching } = useQuery({
    queryKey: ['requests-pending'],
    queryFn: async () => {
      const token = await AsyncStorage.getItem('token');
      const companys = await axios({
        method: 'GET',
        baseURL: `${process.env.EXPO_PUBLIC_API_URL}/requests/${id}`,
        headers: { Authorization: `Bearer ${token}` },
      });

      return companys.data;
    },
  });
  console.log('data', data);
  return (
    <>
      <Stack.Screen
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Solicitação',
          headerTintColor: '#fff',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.navigate({ pathname: '/requests/edit', params: { id } })}>
              <Text style={styles.headerButton}>Editar</Text>
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons name="arrow-back-ios" size={24} color="white" style={{ right: 8 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
        <View style={{ paddingBottom: 25, paddingTop: 20, marginHorizontal: 20 }}>
          <Text style={styles.title}>{data?.documentName}</Text>
          <View style={styles.expirationContainer}>
            <MaterialIcons name="access-alarm" size={14} color="#AEA4A4" />
            <Text style={styles.expiration}>Prazo {formatDate(new Date(data?.expiration))}</Text>
          </View>
          <Text style={styles.description}>{data?.description}</Text>
          <View style={styles.uploadContainer}>
            <Ionicons name="cloud-upload-outline" size={24} color="#6D6D6D" />
            <Text style={styles.uploadTitle}>Enviar arquivo</Text>
            <Text style={styles.uploadDescription}>Selecione um arquivo de no máximo 20mb.</Text>
          </View>
          <View style={styles.attachContainer}>
            <Ionicons name="attach" size={24} color="#005AB1" />
            <Text style={styles.attachTitle}>{data?.documentName}.pdf</Text>
          </View>
        </View>
        <ButtonAnt type="ghost" style={styles.button} onPress={() => router.navigate('/requests')}>
          voltar
        </ButtonAnt>
      </SafeAreaView>
    </>
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
    fontSize: 22,
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
  expiration: {
    fontSize: 14,
    color: '#6D6D6D',
    fontFamily: 'Lato_300Light',
    paddingLeft: 4,
  },
  description: {
    color: '#6D6D6D',
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Lato_400Regular',
  },
  uploadContainer: {
    borderColor: '#D3D3D3',
    borderWidth: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginVertical: 20,
  },
  uploadTitle: {
    fontSize: 16,
    color: '#6D6D6D',
    fontFamily: 'Lato_400Regular',
    paddingTop: 10,
  },
  uploadDescription: {
    color: '#B8A1A1',
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
  },
  attachContainer: {
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
