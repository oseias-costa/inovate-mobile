import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type SelectStatusProps = {
  status: '' | 'PEDING' | 'FINISH' | 'EXPIRED'| 'DOCUMENTS' | 'NOTICE';
  item: '' | 'PEDING' | 'FINISH' | 'EXPIRED' | 'DOCUMENTS' | 'NOTICE';
  setStatus: Dispatch<SetStateAction<'' | 'PEDING' | 'FINISH' | 'EXPIRED' | 'DOCUMENTS' | 'NOTICE'>>;
};

const SelectStatus = ({ status, item, setStatus }: SelectStatusProps) => {
    const queryClient = useQueryClient();
  const borderColor = status === item ? '#3F3D56' : '#D9D9D9';
  const weightItem = status === item ? 'Lato_700Bold' : 'Lato_300Light';
  const title = {
    '': 'Todas',
    PEDING: 'Aguardando',
    EXPIRED: 'Vencidas',
    FINISH: 'Concluídas',
    DOCUMENTS: 'Documentos',
    NOTICE: 'Avisos'
  };
  return (
    <TouchableOpacity onPress={() => setStatus(item)}>
      <View
        style={{
          marginHorizontal: 5,
          paddingVertical: 6,
          paddingHorizontal: 28,
          borderWidth: 1,
          borderColor: borderColor,
          borderRadius: 20,
        }}>
        <Text
          style={{
            fontFamily: weightItem,
          }}>
          {title[item]}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SelectStatus;
