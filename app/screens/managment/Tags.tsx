import { MaterialIcons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Stack, useRouter } from 'expo-router';
import React, { memo, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ModalAnt from '@ant-design/react-native/lib/modal';

import RequestItemSkeleton from '~/app/lib/Loader/RequestItemSkeleton';
import TagFilterButton, { TagType } from '~/app/lib/components/SelecTagButton';
import { httpClient } from '~/app/lib/http.client';
import { useLoading } from '~/app/components/LoadingProvider';
import { Provider } from '@ant-design/react-native';

type Tag = {
  id: number;
  name: string;
  type: TagType;
};

export default function Tags() {
  const [tag, setTag] = useState<TagType>('REQUEST');
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const [tagSelected, setTagSelected] = useState<
    { id: number; name: string; modal?: 'UPDATTE' | 'CREATE' } | undefined
  >(undefined);
  const [err, setErr] = useState({ input: '', message: '' });
  const { setLoading } = useLoading();
  const [isFocus, setIsFocus] = useState(false);

  const { data } = useQuery<Array<Tag>>({
    queryKey: [`tags`, tag],
    queryFn: async ({ pageParam }) =>
      httpClient({
        path: `/tags`,
        method: 'GET',
        queryString: {
          type: tag,
        },
      }),
    staleTime: 5000,
    enabled: !!tag,
  });

  const createTag = useMutation({
    mutationKey: ['create-tag'],
    mutationFn: async () =>
      httpClient({
        path: '/tags',
        method: 'POST',
        data: {
          name: tagSelected?.name,
          type: tag,
        },
      }),
    onError: (err) => {
      console.log(err);
      setLoading(false);
    },
    onSuccess: () => sucess(),
  });

  const updateTag = useMutation({
    mutationKey: ['create-tag'],
    mutationFn: async () =>
      httpClient({
        path: `/tags/${tagSelected?.id}`,
        method: 'PATCH',
        data: {
          name: tagSelected?.name,
        },
      }),
    onError: (err) => {
      console.log(err);
      setLoading(false);
    },
    onSuccess: () => sucess(),
  });

  const deleteTag = useMutation({
    mutationKey: ['delete-tag'],
    mutationFn: async () =>
      httpClient({
        path: `/tags/${tagSelected?.id}`,
        method: 'DELETE',
      }),
    onError: (err) => {
      console.log(err);
      setLoading(false);
    },
    onSuccess: () => sucess(),
  });

  const sucess = () => {
    setLoading(false);
    setTagSelected(undefined);
    return queryClient.invalidateQueries({ queryKey: ['tags', tag] });
  };

  const modalTag = (type: 'CREATE' | 'UPDATE' | 'DELETE') => {
    console.log('modal name', tagSelected);
    if (type === 'DELETE') {
      return ModalAnt.alert(
        <Text style={{ color: 'red' }}>Deseja realmente excluir?</Text>,
        <Text style={styles.descriptionModal}>Atenção, essa ação não poderá ser desfeita.</Text>,
        [
          { text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' },
          { text: 'Excluir', onPress: () => deleteTag.mutate() },
        ]
      );
    }

    if (type === 'CREATE') {
      setTagSelected({ name: '', id: 0, modal: 'CREATE' });
    }

    ModalAnt.alert(
      <Text style={{ color: '#3B3D3E' }}>
        {type === 'CREATE' ? 'Adicionar etiqueta' : 'Editar etiqueta'}
      </Text>,
      <View style={{ width: 250 }}>
        <TextInput
          style={[
            {
              borderColor: isFocus ? (err.input !== '' ? 'red' : '#75BCEE') : '#DADADA',
              backgroundColor: '#FFF',
              color: '#363636',
            },
            styles.input,
          ]}
          defaultValue={tagSelected?.name}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          placeholder={'Nome'}
          onChange={(e) => {
            setErr({ input: '', message: '' });
            setTagSelected({ ...tagSelected, id: tagSelected?.id ?? 0, name: e.nativeEvent.text });
          }}
        />
      </View>,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('test'),
          style: { fontFamily: 'Lato_400Regular', color: '#6D6D6D' },
        },
        {
          text: type === 'CREATE' ? 'Adicionar' : 'Editar',
          onPress: () => {
            setLoading(true);
            type === 'CREATE' ? createTag.mutate() : updateTag.mutate();
          },
          style: { textAlign: 'center', fontFamily: 'Lato_400Regular' },
        },
      ]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Etiquetas',
          headerTintColor: '#fff',
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ padding: 8, right: 14 }}>
              <MaterialIcons name="arrow-back-ios" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => modalTag('CREATE')}>
              <Text
                style={{
                  color: '#fff',
                }}>
                Nova
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.destakContainer}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                decelerationRate="normal"
                contentContainerStyle={{
                  marginHorizontal: 15,
                  marginTop: 10,
                  flexDirection: 'row',
                  paddingRight: 20,
                }}>
                <TagFilterButton tag={tag} setTag={setTag} item="REQUEST" />
                <TagFilterButton tag={tag} setTag={setTag} item="NOTICE" />
                <TagFilterButton tag={tag} setTag={setTag} item="REPORT" />
              </ScrollView>
            </View>
            {!data ? (
              <View style={{ marginTop: 10 }}>
                {[...Array(8)].map((_, i) => (
                  <RequestItemSkeleton key={i} />
                ))}
              </View>
            ) : (
              <Provider>
                <FlashList
                  extraData={tagSelected}
                  contentContainerStyle={{ paddingTop: 10 }}
                  renderItem={({ item }: { item: Tag }) => (
                    <SelectItem
                      key={item.id}
                      itemSelected={tagSelected?.id}
                      value={item.id}
                      placeholder={item.name}
                      onChange={() =>
                        setTagSelected((prev) =>
                          prev?.id !== item.id ? { id: item.id, name: item.name } : undefined
                        )
                      }
                      onUpdate={() => modalTag('UPDATE')}
                      onDelete={() => modalTag('DELETE')}
                    />
                  )}
                  estimatedItemSize={12}
                  keyExtractor={(item) => `id-${item.id}-${item.type}`}
                  data={data}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={() => {
                        return queryClient.invalidateQueries({ queryKey: ['tags', tag] });
                      }}
                      colors={['#9Bd35A', '#689F38']}
                      progressBackgroundColor="#fff"
                    />
                  }
                  showsVerticalScrollIndicator={false}
                />
              </Provider>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}

type SelectItemProps = {
  itemSelected: number | undefined;
  value: number;
  placeholder: string;
  onChange: () => void;
  onUpdate: () => void;
  onDelete?: () => void;
};

const SelectItem = memo(
  ({ itemSelected, value, placeholder, onChange, onUpdate, onDelete }: SelectItemProps) => {
    return (
      <Pressable
        onPress={onChange}
        style={{
          marginTop: 4,
          height: 40,
          marginHorizontal: 20,
          borderColor: itemSelected === value ? '#5D5B5B' : '#F3F4F9',
          borderWidth: 1,
          borderRadius: 5,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 20,
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontFamily: 'Lato_400Regular',
            fontSize: 16,
            color: '#5D5B5B',
          }}>
          {placeholder}
        </Text>
        {itemSelected === value ? (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.buttonContainer} onPress={onUpdate}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={[styles.buttonText, { color: 'red' }]} onPress={onDelete}>
                Excluir
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingBottom: 20,
  },
  gradient: {
    position: 'relative',
    height: 150,
    borderEndEndRadius: 50,
    borderEndStartRadius: 50,
    bottom: 1,
    zIndex: 2,
    marginBottom: 30,
  },
  destakContainer: {
    position: 'relative',
    bottom: 1,
    zIndex: 1,
    backgroundColor: '#00264B',
    height: 60,
  },
  tagContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: 4,
    marginHorizontal: 20,
    borderColor: '#F3F4F9',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 20,
  },
  tagName: {
    color: '#3B3D3E',
    fontSize: 16,
    fontFamily: 'Lato_400Regular',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  buttonText: {
    fontFamily: 'Lato_400Regular',
    color: '#005AB1',
  },
  descriptionModal: {
    fontSize: 16,
    fontFamily: 'Lato_400Regular',
    color: '#363636',
  },
  input: {
    borderWidth: 1,
    height: 40,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 5,
    fontFamily: 'Lato_400Regular',
    fontSize: 16,
  },
});
