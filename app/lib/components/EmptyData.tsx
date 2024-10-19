import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

export const EmptyData = ({ text, size }: { text: string; size: 'small' | 'medium' }) => {
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#DADADA',
        backgroundColor: '#fff',
        borderWidth: 1,
        marginHorizontal: 20,
        borderRadius: 5,
        padding: 20,
        height: size === 'small' ? 'auto' : 200,
      }}>
      <Text
        style={{
          color: '#B8A1A1',
          marginBottom: 10,
          maxWidth: 200,
          textAlign: 'center',
          fontFamily: 'Lato_400Regular',
          fontSize: 13,
        }}>
        {text}
      </Text>
      <Ionicons name="file-tray-outline" size={24} color="#DADADA" />
    </View>
  );
};
