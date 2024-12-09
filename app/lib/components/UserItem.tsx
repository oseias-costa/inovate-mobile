import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { formatDate } from '../date';
import { RequestStatus } from '~/app/components/RequestStatus';

type Props = {
  name: string;
  email: string;
  type: string;
  onPress: () => void;
  status: string;
};

export default function UserItem({ name, email, type, onPress, status }: Props) {
  return (
    <TouchableOpacity style={styles.constainer} onPress={onPress}>
      <View>
        {/* <RequestStatus size="small" status={status} /> */}
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons name="access-alarm" size={14} color="#AEA4A4" />
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
    paddingBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#6D6D6D',
    fontFamily: 'Lato_300Light',
    paddingLeft: 4,
  },
});
