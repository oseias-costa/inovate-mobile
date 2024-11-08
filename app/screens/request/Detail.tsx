import { MaterialIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { RequestStatus } from '~/app/components/RequestStatus';
import { useUpload } from '~/app/hook/useUpload';
import RequestDetailSkeleton from '~/app/lib/Loader/RequestDetailSkeleton';
import { CustomButton } from '~/app/lib/components/CustomButton';
import { DocumentDownloadButton } from '~/app/lib/components/DocumentDownloadButton';
import { formatDate } from '~/app/lib/date';
import { httpClient } from '~/app/lib/http.client';

export default function Detail() {
  const { uuid } = useLocalSearchParams();
  const [key, setKey] = useState('');

  const { data, isFetching, refetch: refetchRequest } = useQuery({
    queryKey: [`request-${uuid}`],
    queryFn: async () =>
      httpClient({
        path: `/requests/${uuid}`,
        method: 'GET',
      }),
  });

  const { pickDocument, error } = useUpload(String(uuid), 'REQUEST', refetchRequest);
  const downloadFile = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/document/download?key=${key}`,
        {
          responseType: 'blob',
        }
      );

      if (!response.data) {
        throw new Error('No data received from the API');
      }

      const fileUri = FileSystem.documentDirectory + key;

      if (typeof response.data === 'string') {
        await FileSystem.writeAsStringAsync(fileUri, response.data, {
          encoding: FileSystem.EncodingType.UTF8, // Adjust encoding as needed
        });
      } else if (response.data instanceof Blob) {
        // Handle blob data (e.g., using a library like react-native-fs)
        // ...
      } else {
        throw new Error('Unexpected data type from API');
      }

      return fileUri;
    } catch (error) {
      console.error('Error downloading file:', error);
      throw error;
    }
  };

  const {
    refetch,
    isError,
    error: errorDownload,
  } = useQuery({
    queryKey: [`download-${key}`],
    queryFn: downloadFile,
    enabled: false,
    retry: false,
  });

  useEffect(() => {
    if (isError) {
      console.log(errorDownload);
    }
  }, [isError]);

  const handleDownload = async () => {
    console.log('download');
    try {
      const uri = await refetch();
      Alert.alert('Download completo!', `Arquivo salvo em: ${uri.data}`);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao fazer o download do arquivo');
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Solicitação',
          headerTintColor: '#fff',
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                router.navigate({ pathname: '/screens/request/Edit', params: { uuid } })
              }>
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
          {isFetching ? (
            <RequestDetailSkeleton />
          ) : (
            <>
              <RequestStatus size="small" status={data?.status} />
              <Text style={styles.title}>{data?.documentName}</Text>
              <View style={styles.expirationContainer}>
                <MaterialIcons name="access-alarm" size={14} color="#AEA4A4" />
                <Text style={styles.expiration}>
                  Prazo {formatDate(new Date(data?.expiration))}
                </Text>
              </View>
              <Text style={styles.description}>{data?.description}</Text>
              <TouchableOpacity style={styles.uploadContainer} onPress={pickDocument}>
                <Ionicons name="cloud-upload-outline" size={24} color="#6D6D6D" />
                <Text style={styles.uploadTitle}>Enviar arquivo</Text>
                <Text style={styles.uploadDescription}>
                  Selecione um arquivo de no máximo 20mb.
                </Text>
              </TouchableOpacity>
              <View>
                <Text
                  style={{
                    color: '#3B3D3E',
                    fontSize: 16,
                    fontFamily: 'Lato_400Regular',
                    paddingBottom: 5,
                  }}>
                  Anexos:
                </Text>
                {data?.documents?.map((document: any) => (
                  <DocumentDownloadButton
                    name={document.name}
                    onPress={async () => {
                      setKey(document.path);
                      await handleDownload();
                    }}
                  />
                ))}
              </View>
            </>
          )}
        </View>
        <CustomButton style={styles.button} onPress={() => router.navigate('/requests')}>
          voltar
        </CustomButton>
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
    height: 40,
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
