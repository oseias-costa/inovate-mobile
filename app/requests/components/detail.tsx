import { MaterialIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useLoading } from '~/app/components/LoadingProvider';
import { useUpload } from '~/app/hook/useUpload';
import { formatDate } from '~/app/lib/date';
import { httpClient } from '~/app/lib/http.client';

export default function Detail({ uuid }: { uuid: string }) {
  const { pickDocument, error, loading } = useUpload(uuid);
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const { data } = useQuery({
    queryKey: [`request-${uuid}`],
    queryFn: async () => httpClient(`/requests/${uuid}`, 'GET'),
  });

  return (
    <View style={{ paddingBottom: 25, paddingTop: 20, marginHorizontal: 20 }}>
      <Text style={styles.title}>{data?.documentName}</Text>
      <View style={styles.expirationContainer}>
        <MaterialIcons name="access-alarm" size={14} color="#AEA4A4" />
        <Text style={styles.expiration}>Prazo {formatDate(new Date(data?.expiration))}</Text>
      </View>
      <Text style={styles.description}>{data?.description}</Text>
      <TouchableOpacity style={styles.uploadContainer} onPress={pickDocument}>
        <Ionicons name="cloud-upload-outline" size={24} color="#6D6D6D" />
        <Text style={styles.uploadTitle}>Enviar arquivo</Text>
        <Text style={styles.uploadDescription}>Selecione um arquivo de no máximo 20mb.</Text>
      </TouchableOpacity>
      {data?.documents?.map((document: any) => (
        <View style={styles.attachContainer}>
          <Ionicons name="attach" size={24} color="#005AB1" />
          <Text style={styles.attachTitle}>{document.name}</Text>
        </View>
      ))}
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
  expiration: {
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
