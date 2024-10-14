import React, { Dispatch, SetStateAction } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type SelectFilterProps = {
  filter: '' | 'GENERAL' | 'FINANTIAL' | 'DEADLINES';
  item: '' | 'GENERAL' | 'FINANTIAL' | 'DEADLINES';
  setFilter: Dispatch<SetStateAction<'' | 'GENERAL' | 'FINANTIAL' | 'DEADLINES'>>;
};

const NoticeFilterItem = ({ filter, item, setFilter }: SelectFilterProps) => {
  const borderColor = filter === item ? '#fff' : '#D9D9D9';
  const title = {
    '': 'Todos',
    GENERAL: 'Gerais',
    DEADLINES: 'Prazos',
    FINANTIAL: 'Financeiro',
  };
  return (
    <TouchableOpacity onPress={() => setFilter(item)}>
      <View
        style={{
          marginHorizontal: 5,
          paddingVertical: 6,
          paddingHorizontal: 28,
          borderWidth: 1,
          borderColor,
          borderRadius: 20,
          backgroundColor: filter === item ? '#fff' : 'transparent',
        }}>
        <Text
          style={{
            fontFamily: 'Lato_400Regular',
            color: filter === item ? '#00264B' : '#fff',
          }}>
          {title[item]}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NoticeFilterItem;