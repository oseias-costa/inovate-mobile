import React, { Dispatch, SetStateAction } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export type TagType = 'REQUEST' | 'NOTICE' | 'REPORT';

type SelectProps = {
  tag: TagType;
  item: TagType;
  setTag: Dispatch<SetStateAction<TagType>>;
};

const TagFilterButton = ({ tag, item, setTag }: SelectProps) => {
  const borderColor = tag === item ? '#fff' : '#D9D9D9';
  const title = {
    REQUEST: 'Solicitações',
    NOTICE: 'Avisos',
    REPORT: 'Relatórios',
  };

  return (
    <TouchableOpacity onPress={() => setTag(item)}>
      <View
        style={{
          marginHorizontal: 5,
          paddingVertical: 6,
          paddingHorizontal: 28,
          borderWidth: 1,
          borderColor,
          borderRadius: 20,
          backgroundColor: tag === item ? '#fff' : 'transparent',
        }}>
        <Text
          style={{
            fontFamily: 'Lato_400Regular',
            color: tag === item ? '#00264B' : '#fff',
          }}>
          {title[item]}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TagFilterButton;
