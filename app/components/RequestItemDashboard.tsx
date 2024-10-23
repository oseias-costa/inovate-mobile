import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { RequestStatus } from '../components/RequestStatus';
import { formatDate } from '../lib/date';

type RequestItemDashboardProps = {
  title: string;
  expiration: string;
  uuid: string;
  onPress: () => void;
  status: string;
};

export default function RequestItemDashboard({
  title,
  expiration,
  uuid,
  onPress,
  status,
}: RequestItemDashboardProps) {
  return (
    <TouchableOpacity style={styles.constainer} onPress={onPress}>
      <View>
        <RequestStatus size="small" status={status} />
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons name="access-alarm" size={14} color="#AEA4A4" />
          <Text style={styles.description}>Prazo {formatDate(new Date(expiration))}</Text>
        </View>
      </View>
      <MaterialIcons size={16} color="#C8BDBD" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  constainer: {
    paddingVertical: 14,
    marginHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
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
