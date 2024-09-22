import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type SelectStatusProps = {
  status: '' | 'PENDING' | 'FINISH' | 'EXPIRED';
  item: '' | 'PENDING' | 'FINISH' | 'EXPIRED';
  setStatus: Dispatch<SetStateAction<'' | 'PENDING' | 'FINISH' | 'EXPIRED'>>;
};

const SelectStatus = ({ status, item, setStatus }: SelectStatusProps) => {
  const queryClient = useQueryClient();
  const borderColor = status === item ? '#fff' : '#D9D9D9';
  const weightItem = status === item ? 'Lato_700Bold' : 'Lato_300Light';
  const title = {
    '': 'Todas',
    PENDING: 'Aguardando',
    EXPIRED: 'Vencidas',
    FINISH: 'Concluídas',
    DOCUMENT: 'Documentos',
    NOTICE: 'Avisos',
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
        }}>
        <Text
          style={{
            fontFamily: weightItem,
            color: '#fff',
          }}>
          {title[item]}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SelectStatus;
