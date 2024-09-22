import { Dispatch, SetStateAction } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type SelectProps = {
  status: '' | 'NOTICE' | 'REPORT' | 'REQUEST';
  item: '' | 'NOTICE' | 'REPORT' | 'REQUEST';
  setStatus: Dispatch<SetStateAction<'' | 'NOTICE' | 'REPORT' | 'REQUEST'>>;
};

const SelectNotificationFilter = ({ status, item, setStatus }: SelectProps) => {
  const borderColor = status === item ? '#fff' : '#D9D9D9';
  const weightItem = status === item ? 'Lato_700Bold' : 'Lato_300Light';
  const title = {
    '': 'Todas',
    NOTICE: 'Avisos',
    REQUEST: 'Solicitações',
    REPORT: 'Relatórios',
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

export default SelectNotificationFilter;
