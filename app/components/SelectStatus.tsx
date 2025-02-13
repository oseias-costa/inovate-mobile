import React, { Dispatch, SetStateAction } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type SelectStatusProps = {
  status: '' | 'PENDING' | 'FINISH' | 'DUE';
  item: '' | 'PENDING' | 'FINISH' | 'DUE';
  setStatus: Dispatch<SetStateAction<'' | 'PENDING' | 'FINISH' | 'DUE'>>;
};

const SelectStatus = ({ status, item, setStatus }: SelectStatusProps) => {
  const borderColor = status === item ? '#fff' : '#D9D9D9';
  const title = {
    '': 'Todas',
    PENDING: 'Pendentes',
    DUE: 'Vencidas',
    FINISH: 'Concluídas',
  };
  return (
    <TouchableOpacity onPress={() => setStatus(item)}>
      <View
        style={{
          marginHorizontal: 5,
          paddingVertical: 6,
          paddingHorizontal: 28,
          borderWidth: 1,
          borderColor,
          borderRadius: 20,
          backgroundColor: status === item ? '#fff' : 'transparent',
        }}>
        <Text
          style={{
            fontFamily: 'Lato_400Regular',
            color: status === item ? '#00264B' : '#fff',
          }}>
          {title[item]}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SelectStatus;
