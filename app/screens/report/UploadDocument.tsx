import ButtonAnt from '@ant-design/react-native/lib/button';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import React, { useRef } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RichEditor } from 'react-native-pell-rich-editor';
import * as FileSystem from 'expo-file-system';

import { useUpload } from '~/app/hook/useUpload';
import NoticeDetailSkeleton from '~/app/lib/Loader/NoticeDetailSkeleton';
import { CustomButton } from '~/app/lib/components/CustomButton';
import { DocumentDownloadButton } from '~/app/lib/components/DocumentDownloadButton';
import { formatDate } from '~/app/lib/date';
import { httpClient } from '~/app/lib/http.client';
import { Severity, useToast } from '~/app/components/ToastProvider';
import { useLoading } from '~/app/components/LoadingProvider';
import { useUser } from '~/app/components/UserProvider';

export default function NoticeDetail() {
  const { uuid } = useLocalSearchParams();
  const richText = useRef<any>();
  const { setLoading } = useLoading();
  const { showToast } = useToast();
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: [`report-${uuid}`],
    queryFn: async () =>
      httpClient({
        path: `/reports/${uuid}`,
        method: 'GET',
      }),
  });

  const endReport = useMutation({
    mutationKey: [`report-end-${uuid}`],
    mutationFn: async () =>
      httpClient({
        path: '/notice/end',
        method: 'POST',
        data: {
          user: user?.uuid,
          report: uuid,
        },
      }),
    onSuccess: () => {
      setLoading(false);
      showToast('Aviso criado com sucesso', Severity.SUCCESS);
      router.push(`/(tabs)/reports`);
      return queryClient.invalidateQueries({ queryKey: ['notice-' + uuid] });
    },
    onError: (err) => {
      setLoading(false);
      showToast('Ocorreu um erro', Severity.ERROR);
    },
  });

  const { pickDocument, error } = useUpload(String(uuid), 'REPORT', refetch);

  const downloadFile = async (key: string) => {
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

  return (
    <>
      <Stack.Screen
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Incluir documento',
          headerTintColor: '#fff',
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                router.navigate({ pathname: '/screens/report/Edit', params: { uuid } })
              }>
              <Text style={styles.headerButton}>Excluir</Text>
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
        {isLoading ? (
          <NoticeDetailSkeleton />
        ) : (
          <View
            style={{
              paddingBottom: 25,
              paddingTop: 20,
              marginHorizontal: 10,
            }}>
            <View style={notice.expirationContainer}>
              <Text style={notice.expiration}>Data {formatDate(new Date(data?.createdAt))}</Text>
            </View>
            <View
              style={{
                borderRadius: 5,
                marginVertical: 5,
                marginBottom: 10,
                backgroundColor: 'transparent',
              }}>
              <ScrollView
                bounces={false}
                showsVerticalScrollIndicator
                contentContainerStyle={{ borderRadius: 5 }}>
                <RichEditor
                  ref={richText}
                  initialContentHTML={`<h2>${data?.title}</h2>${data?.text}`}
                  disabled
                  editorStyle={{
                    color: '#363636',
                    backgroundColor: 'transparent',
                  }}
                  style={{
                    borderRadius: 5,
                    bottom: 10,
                  }}
                  containerStyle={{
                    borderRadius: 5,
                  }}
                  showsVerticalScrollIndicator
                  initialHeight={100}
                  scrollEnabled
                />
              </ScrollView>
            </View>
            <TouchableOpacity style={styles.uploadContainer} onPress={pickDocument}>
              <Ionicons name="cloud-upload-outline" size={24} color="#6D6D6D" />
              <Text style={styles.uploadTitle}>Enviar arquivo</Text>
              <Text style={styles.uploadDescription}>Selecione um arquivo de no máximo 20mb.</Text>
            </TouchableOpacity>
            <View style={{ marginHorizontal: 10 }}>
              {!data?.documents ? <Text style={[styles.description]}>Anexos: </Text> : null}
              {data?.documents?.map((document: any) => (
                <DocumentDownloadButton
                  onPress={() => downloadFile(document.path)}
                  name={document.name}
                />
              ))}
            </View>
          </View>
        )}
        <CustomButton
          type="primary"
          style={{ marginHorizontal: 20, height: 40, marginTop: 'auto' }}
          onPress={() => endReport.mutate()}>
          Finalizar
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
    marginHorizontal: 10,
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
  text: {
    // fontFamily: 'Inter_500Medium',
    fontSize: 18,
  },
  link: {
    color: 'green',
  },
  viewer: {
    borderColor: 'green',
    borderWidth: 1,
    padding: 5,
  },
});

const notice = StyleSheet.create({
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
    paddingLeft: 14,
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
