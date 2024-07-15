import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Subtitle from '../components/Subtitle';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import useGetCompanys from '../hook/useGetCompanys';
import ButtonAnt from '@ant-design/react-native/lib/button';
import { formatDate } from '../lib/date';
import { MaterialIcons } from '@expo/vector-icons';
import useGetDocumentById from '../hook/useGetDocumentById';
import { statusFormtter } from '../lib/status';
import { Status } from './components/status';

export default function Details() {
  const { id } = useLocalSearchParams();
  const { data: document } = useGetDocumentById(String(id))
  const { data } = useGetCompanys();
  const company = data?.find((item: any) => item.id === document?.companyId);
  const expiration = formatDate(new Date(document?.expiration));
  const status = statusFormtter(document?.status)

  return (
    <>
      <Stack.Screen
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Detalhes',
          headerTintColor: '#fff',
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                router.navigate({ pathname: '/docsDetails/edit', params: { id } })
              }>
              <Text style={style.headerButton}>Editar</Text>
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons name="arrow-back-ios" size={24} color="white" style={{right: 8}} />
            </TouchableOpacity>
          ),
        }}
      />
      <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
        <View style={{ paddingBottom: 25, paddingTop: 20 }}>
          <Subtitle text="Detalhes da solicitação" />
          <Text style={style.description}>Verifique abaixo os detalhes da solicitação.</Text>
        </View>
        <View>
          <Status expiration={expiration} status={document?.status} type='Solicitação'/>
          <TextInputDetail label="Documento" value={document?.document} />
          <TextInputDetail label="Descrição" value={document?.description} />
          <TextInputDetail label="Empresa" value={company?.name} />
          <TextInputDetail label="Prazo" value={expiration} />
        </View>
        <ButtonAnt type="ghost" style={style.button} onPress={() => router.navigate('/docs/')}>
          voltar
        </ButtonAnt>
      </SafeAreaView>
    </>
  );
}

const TextInputDetail = ({ value, label }: { value: string; label: string }) => {
  return (
    <View style={{ paddingBottom: 6 }}>
      <Text style={style.label}>{label}</Text>
      <TextInput editable={false} value={value} style={style.input} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 20,
    flex: 1,
    justifyContent: 'flex-start',
  },
  header: {
    paddingHorizontal: 12,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    shadowColor: '#000',
  },
  body: {
    backgroundColor: '#fff',
  },
  title: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
  description: {
    fontFamily: 'Lato_300Light',
    fontSize: 16,
    color: '#716F6F',
    marginHorizontal: 20,
    paddingBottom: 0,
    paddingTop: 6,
  },
  label: {
    fontFamily: 'Lato_300Light',
    marginHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    height: 47,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 5,
    color: '#363636',
    fontFamily: 'Lato_400Regular',
    fontSize: 18,
    borderColor: '#DADADA',
  },
  button: {
    marginHorizontal: 20,
    marginTop: 'auto',
    zIndex: 1,
  },
  headerButton: { 
    color: '#fff', 
    fontSize: 16, 
    fontFamily: 'Lato_400Regular' 
  },
});
