import { MaterialIcons } from '@expo/vector-icons';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useUser } from '~/app/components/UserProvider';
import { CustomButton } from '~/app/lib/components/CustomButton';

const description = {
  USER: 'Colaborador Inovate',
  COMPANY: 'Empresa',
  ADMIN: 'Administrador',
};

export default function Account() {
  const queryClient = useQueryClient();
  const { user, setUser } = useUser();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user?.name}</Text>
      <Text style={styles.email}>{user?.email}</Text>
      <Text style={styles.email}>{user?.createAt}</Text>
      <TouchableOpacity onPress={() => console.log('alterar')}>
        <View
          style={[
            styles.itemBox,
            {
              borderStartEndRadius: 15,
              borderStartStartRadius: 15,
              marginTop: 30,
            },
          ]}>
          <MaterialIcons name="image" color="#3b3d3e" size={24} />
          <Text style={styles.itemText}>Alterar foto</Text>
          <MaterialIcons
            name="arrow-forward-ios"
            color="#3b3d3eab"
            size={22}
            style={{ marginLeft: 'auto' }}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('alterar')}>
        <View style={[styles.itemBox, { borderTopWidth: 0 }]}>
          <MaterialIcons name="lock" color="#3b3d3e" size={24} />
          <Text style={styles.itemText}>Alterar senha</Text>
          <MaterialIcons
            name="arrow-forward-ios"
            color="#3b3d3eab"
            size={22}
            style={{ marginLeft: 'auto' }}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('alterar')}>
        <View style={[styles.itemBox, { borderTopWidth: 0 }]}>
          <MaterialIcons name="notifications" color="#3b3d3e" size={24} />
          <Text style={styles.itemText}>Notificação</Text>
          <MaterialIcons
            name="arrow-forward-ios"
            color="#3b3d3eab"
            size={22}
            style={{ marginLeft: 'auto' }}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('alterar')}>
        <View style={[styles.itemBox, { borderTopWidth: 0 }]}>
          <MaterialIcons name="text-increase" color="#3b3d3e" size={24} />
          <Text style={styles.itemText}>Alterar o nome</Text>
          <MaterialIcons
            name="arrow-forward-ios"
            color="#3b3d3eab"
            size={22}
            style={{ marginLeft: 'auto' }}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('alterar')}>
        <View style={[styles.itemBox, { borderTopWidth: 0 }]}>
          <MaterialIcons name="email" color="#3b3d3e" size={24} />
          <Text style={styles.itemText}>Mudar e-mail</Text>
          <MaterialIcons
            name="arrow-forward-ios"
            color="#3b3d3eab"
            size={22}
            style={{ marginLeft: 'auto' }}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('alterar')}>
        <View
          style={[
            styles.itemBox,
            {
              borderTopWidth: 0,
              borderEndEndRadius: 15,
              borderEndStartRadius: 15,
            },
          ]}>
          <MaterialIcons name="logout" color="#3b3d3e" size={24} />
          <Text style={styles.itemText}>Deslogar</Text>
          <MaterialIcons
            name="arrow-forward-ios"
            color="#3b3d3eab"
            size={22}
            style={{ marginLeft: 'auto' }}
          />
        </View>
      </TouchableOpacity>
      <CustomButton
        onPress={() => {
          setUser(null);
          router.replace('/auth/login');
          return queryClient.invalidateQueries({ queryKey: ['login', 'user'] });
        }}>
        Deslogar
      </CustomButton>
    </View>
  );
}

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
  imgBox: {
    backgroundColor: '#fff',
    // alignSelf: 'center',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 15,
  },
  userPhoto: {
    borderRadius: 500,
    width: 96,
    height: 96,
    alignSelf: 'center',
  },
  userName: {
    color: '#3B3D3E',
    fontSize: 24,
    fontFamily: 'Lato_400Regular',
    marginTop: 10,
    alignSelf: 'center',
  },
  userEmail: {
    color: '#3B3D3E',
    fontSize: 16,
    fontFamily: 'Lato_300Light',
    alignSelf: 'center',
  },
  itemBox: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: '#0000000b',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#00000017',
    alignItems: 'center',
  },
  itemText: {
    paddingLeft: 20,
    fontSize: 18,
    fontFamily: 'Lato_400Regular',
    color: '#3b3d3e',
  },
  title: {
    color: '#3F3D56',
    fontFamily: 'Lato_400Regular',
    fontSize: 20,
    paddingLeft: 20,
    paddingTop: 20,
  },
  email: {
    color: '#3F3D56',
    fontFamily: 'Lato_400Regular',
    paddingLeft: 20,
  },
});
