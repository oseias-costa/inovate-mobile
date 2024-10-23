import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { formatDate } from '../lib/date';

type RequestItemDashboardProps = {
  title: string;
  description: string;
  createdAt: string;
  uuid: string;
  onPress: () => void;
};

export default function NoticeItemDashboard({
  title,
  description,
  createdAt,
  uuid,
  onPress,
}: RequestItemDashboardProps) {
  return (
    <TouchableOpacity style={styles.constainer} onPress={onPress}>
      <Text style={styles.createAt}>{formatDate(new Date(createdAt))}</Text>
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.description} numberOfLines={1} ellipsizeMode="tail">
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  constainer: {
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    backgroundColor: '#E4E4E4',
    paddingHorizontal: 16,
    marginVertical: 3,
    shadowColor: '#00264B',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 2,
  },
  createAt: {
    fontSize: 9,
    color: '#3B3D3E',
    fontFamily: 'Lato_300Light',
  },
  title: {
    fontSize: 16,
    color: '#00264B',
    fontFamily: 'Lato_400Regular',
    paddingBottom: 2,
  },
  description: {
    fontSize: 13,
    color: '#3B3D3E',
    fontFamily: 'Lato_300Light',
  },
});
