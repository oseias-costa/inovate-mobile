import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type Props = {
  name: string;
  email: string;
  type: string;
  onPress: () => void;
  status: string;
};

export default function UserItem({ name, email, type, onPress, status }: Props) {
  const color = status === 'ACTIVE' ? '#3B884C' : '#DE4F51';

  const statusDescription: { [key: string]: string } = {
    ACTIVE: 'Ativo',
    INACTIVE: 'Inativo',
    FIRST_ACESS: 'Primeiro Acesso',
    PASSWORD_RESET: 'Recuperação de senha',
  };

  return (
    <TouchableOpacity style={styles.constainer} onPress={onPress}>
      <View>
        <View style={styles.statusContainer}>
          <FontAwesome name="circle" color={color} style={[styles.text, { fontSize: 8 }]} />
          <Text style={{ color, fontSize: 11 }}>{statusDescription[status]}</Text>
        </View>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.description}>{email}</Text>
        </View>
      </View>
      <MaterialIcons name="keyboard-arrow-right" size={26} color="#C8BDBD" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  constainer: {
    paddingVertical: 14,
    marginHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#E9E9E9',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 16,
    color: '#3B3D3E',
    paddingBottom: 3,
  },
  description: {
    fontSize: 13,
    color: '#6D6D6D',
    fontFamily: 'Lato_300Light',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginRight: 7,
    fontFamily: 'Lato_400Regular',
  },
});
