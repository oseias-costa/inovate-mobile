import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type SelectItemProps = {
  itemSelected: string | undefined;
  value: string;
  placeholder: string;
  onChange: () => void;
};

export const SelectItem = ({ itemSelected, value, placeholder, onChange }: SelectItemProps) => {
  return (
    <TouchableOpacity
      onPress={onChange}
      style={{
        marginTop: 4,
        height: 40,
        marginHorizontal: 20,
        borderColor: itemSelected === value ? '#1677ff' : '#F3F4F9',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        paddingLeft: 20,
      }}>
      <Text
        style={{
          fontFamily: 'Lato_400Regular',
          fontSize: 16,
          color: itemSelected === value ? '#1677ff' : '#5D5B5B',
        }}>
        {placeholder}
      </Text>
    </TouchableOpacity>
  );
};
