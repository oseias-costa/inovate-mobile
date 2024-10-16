import React, { Dispatch, SetStateAction } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type NotificationFilterItemProps = {
  filter: '' | 'REQUEST' | 'NOTICE' | 'REPORT';
  item: '' | 'REQUEST' | 'NOTICE' | 'REPORT';
  setFilter: Dispatch<SetStateAction<'' | 'REQUEST' | 'NOTICE' | 'REPORT'>>;
};

const NotificationFilterItem = ({ filter, item, setFilter }: NotificationFilterItemProps) => {
  const borderColor = filter === item ? '#fff' : '#D9D9D9';
  const title = {
    '': 'Todas',
    REQUEST: 'Solicitações',
    REPORT: 'Relatórios',
    NOTICE: 'Avisos',
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

export default NotificationFilterItem;
