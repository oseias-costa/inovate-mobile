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

export default function NoticeItem({
  title,
  createdAt,
  description,
  onPress,
}: RequestItemDashboardProps) {
  const text = description.slice(0, 110) + '...';

  return (
    <TouchableOpacity style={styles.constainer} onPress={onPress}>
      <View style={styles.div}>
        <Text style={styles.createAt}>{formatDate(new Date(createdAt))}</Text>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Text>
        <View style={styles.richTextBox}>
          <RichEditor
            initialContentHTML={text}
            disabled
            style={{ marginBottom: 'auto' }}
            editorStyle={{
              color: '#B8A1A1',
              backgroundColor: 'transparent',
              contentCSSText: 'font-size: 14px;',
            }}
            containerStyle={{ marginBottom: 'auto' }}
            initialHeight={25}
            scrollEnabled={false}
          />
        </View>
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
    height: 160,
    justifyContent: 'flex-start',
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    paddingHorizontal: 3,
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
  richTextBox: {
    marginBottom: 'auto',
    height: 90,
  },
  createAt: {
    fontSize: 9,
    color: '#3B3D3E',
    fontFamily: 'Lato_300Light',
    paddingLeft: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: '#00264B',
    fontFamily: 'Lato_400Regular',
    // paddingBottom: 2,
    paddingHorizontal: 8,
    // height: 60,
    // flexWrap: 'wrap',
    // flexShrink: 1,
  },
  description: {
    fontSize: 13,
    color: '#3B3D3E',
    fontFamily: 'Lato_300Light',
  },
});
