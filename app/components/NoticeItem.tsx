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

export default function NoticeItem({ title, createdAt, onPress }: RequestItemDashboardProps) {
  return (
    <TouchableOpacity style={styles.constainer} onPress={onPress}>
      <View style={styles.div}>
        <Text style={styles.createAt}>{formatDate(new Date(createdAt))}</Text>
        <Text style={styles.title}>
          {/* numberOfLines={1} ellipsizeMode="tail" **/}
          {title}
        </Text>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}></View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  constainer: {
    marginBottom: 20,
  },
  div: {
    width: 170,
    height: 150,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    paddingHorizontal: 16,
    marginVertical: 3,
    backgroundColor: '#E3E3E3',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.45,

    elevation: 7,
  },
  createAt: {
    fontSize: 9,
    color: '#3B3D3E',
    fontFamily: 'Lato_300Light',
  },
  title: {
    fontSize: 16,
    color: '#00264B',
    // color: '#fff',
    fontFamily: 'Lato_400Regular',
    paddingBottom: 2,
  },
  description: {
    fontSize: 13,
    color: '#3B3D3E',
    fontFamily: 'Lato_300Light',
  },
});
