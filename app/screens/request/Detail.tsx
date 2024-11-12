import { MaterialIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

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
  const [downloadProgress, setDownloadProgress] = useState(0); // Progress state from 0 to 1
  const [progressAnimation] = useState(new Animated.Value(0));
  const [progress, setProgress] = React.useState(0);
  const [total, setTotal] = useState(0);

  const {
    data,
    isFetching,
    refetch: refetchRequest,
  } = useQuery({
    queryKey: [`request-${uuid}`],
    queryFn: async () =>
      httpClient({
        path: `/requests/${uuid}`,
        method: 'GET',
      }),
  });

  useEffect(() => {
    Animated.timing(progressAnimation, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const widthInterpolate = progressAnimation.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  async function downloadFile(key: string, name: string, size: number) {
    const safeName = name.replace(/[^a-zA-Z0-9]/g, '_');
    const fileUri1 = FileSystem.documentDirectory + safeName;

    const uri2 = `${process.env.EXPO_PUBLIC_API_URL}/document/download?key=${key}`;
    const downloadsDir = FileSystem.documentDirectory + 'downloads/';

    try {
      await FileSystem.makeDirectoryAsync(downloadsDir, { intermediates: true });

      const callback = (downloadProgress: any) => {
        const totalBytesWritten = downloadProgress.totalBytesWritten;
        const totalBytesExpectedToWrite = downloadProgress.totalBytesExpectedToWrite;

        const progress = (totalBytesWritten / size) * 100;
        setProgress(Math.ceil(progress));

        setTotal(size);
      };

      const downloadResumable = FileSystem.createDownloadResumable(uri2, fileUri1, {}, callback);

      const resume = await downloadResumable.downloadAsync();
      console.log('Download concluído:', resume?.uri);
    } catch (error) {
      console.error('Erro ao baixar o arquivo:', error);
    }
  }

  const { pickDocument, error } = useUpload(String(uuid), 'REQUEST', refetchRequest);

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
                <Text style={styles.label}>{`${Math.round(progress)}%`}</Text>
                <View style={styles.progressBar}>
                  <Animated.View style={[styles.progress]} />
                </View>
                <AnimatedProgressBar progres={progress} />
                <Text>{(downloadProgress * 100).toFixed(0)}%</Text>
                {data?.documents?.map((document: any) => (
                  <DocumentDownloadButton
                    key={document.uuid}
                    name={document.name}
                    onPress={async () => {
                      setKey(document.path);
                      await downloadFile(document.path, document.name, document.size);
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
  progressBar: {
    width: '100%',
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: 'red',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

const AnimatedProgressBar = ({ progres }: { progres: number }) => {
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: progres,
      duration: 200, // 5 segundos
      useNativeDriver: false,
    }).start();
  }, [progres]);
  return (
    <View style={styless.container}>
      <Text style={styless.title}>Progress</Text>
      <View style={styless.progressBar}>
        <Animated.View
          style={[
            styless.progress,
            { width: progress.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) },
          ]}
        />
      </View>
    </View>
  );
};
const styless = StyleSheet.create({
  container: {},
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  progressBar: {
    height: 4,
    width: '100%',
    backgroundColor: '#e0e0de',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#76c7c0',
    borderRadius: 5,
  },
});
