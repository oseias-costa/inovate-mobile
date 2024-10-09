import ButtonAnt from '@ant-design/react-native/lib/button';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RichEditor } from 'react-native-pell-rich-editor';

import { formatDate } from '~/app/lib/date';
import { httpClient } from '~/app/lib/http.client';

export default function NoticeDetail() {
  const { uuid } = useLocalSearchParams();
  const richText = useRef<any>();

  const { data } = useQuery({
    queryKey: [`request-${uuid}`],
    queryFn: async () =>
      httpClient({
        path: `/notice/${uuid}`,
        method: 'GET',
      }),
  });

  return (
    <>
      <Stack.Screen
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Aviso',
          headerTintColor: '#fff',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.navigate({ pathname: '/requests/edit', params: { uuid } })}>
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
          <View style={notice.expirationContainer}>
            <Text style={notice.expiration}>Data {formatDate(new Date(data?.createdAt))}</Text>
          </View>
          <Text style={notice.title}>{data?.title}</Text>
          <RichEditor
            ref={richText}
            initialContentHTML={data?.text}
            styleWithCSS
            editorStyle={{
              color: '#363636',
            }}
            style={{
              borderTopWidth: 0,
              borderBottomWidth: 0,
            }}
            onChange={(descriptionText) => {
              console.log('descriptionText:', descriptionText);
            }}
          />
          {data?.documents?.map((document: any) => (
            <View style={notice.attachContainer}>
              <Ionicons name="attach" size={24} color="#005AB1" />
              <Text style={notice.attachTitle}>{document.name}</Text>
            </View>
          ))}
        </View>
        <ButtonAnt
          type="ghost"
          style={notice.button}
          onPress={() => router.navigate('/(drawer)/(tabs)/notice')}>
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
