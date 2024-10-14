import RadioItem from '@ant-design/react-native/lib/radio/RadioItem';
import React from 'react';
import { Text, View } from 'react-native';

type RadioProps = {
  itemSelected: string | undefined;
  value: string;
  placeholder: string;
  onChange: () => void;
};

export const Radio = ({ itemSelected, value, placeholder, onChange }: RadioProps) => {
  return (
    <RadioItem
      key={1}
      checked={itemSelected === value}
      onChange={onChange}
      value={value}
      style={{ height: 38 }}
      children={
        <View style={{ marginTop: 4 }}>
          <Text
            style={{
              fontFamily: 'Lato_400Regular',
              fontSize: 16,
              color: itemSelected === value ? '#1677ff' : '#5D5B5B',
            }}>
            {placeholder}
          </Text>
        </View>
      }
      left
    />
  );
};
