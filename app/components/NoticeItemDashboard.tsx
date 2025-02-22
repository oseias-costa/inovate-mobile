import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { formatDate } from '../lib/date';
import { RichEditor } from 'react-native-pell-rich-editor';

type RequestItemDashboardProps = {
  title: string;
  description: string;
  createdAt: string;
  uuid: string;
  onPress: () => void;
};

export default function NoticeItemDashboard({
  title,
  createdAt,
  description,
  onPress,
}: RequestItemDashboardProps) {
  const text = description.slice(0, 130) + '...';
  return (
    <TouchableOpacity style={styles.constainer} onPress={onPress}>
      <Text style={styles.createAt}>{formatDate(new Date(createdAt))}</Text>
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
      <RichEditor
        initialContentHTML={text}
        disabled
        editorStyle={{
          color: '#D3D3D3',
          backgroundColor: 'transparent',
          contentCSSText: 'font-size: 14px;',
        }}
        containerStyle={{ paddingLeft: 6 }}
        showsVerticalScrollIndicator
        initialHeight={50}
        scrollEnabled
      />
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}></View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  constainer: {
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    paddingHorizontal: 6,
    marginVertical: 3,
  },
  createAt: {
    fontSize: 9,
    color: '#3B3D3E',
    fontFamily: 'Lato_300Light',
    marginLeft: 14,
  },
  title: {
    fontSize: 16,
    color: '#00264B',
    fontFamily: 'Lato_400Regular',
    paddingBottom: 2,
    marginLeft: 14,
  },
  description: {
    fontSize: 13,
    color: '#3B3D3E',
    fontFamily: 'Lato_300Light',
  },
});
