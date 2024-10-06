import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, Text, StyleSheet } from 'react-native';

export const RequestStatus = ({ status, size }: { status: string; size: 'small' | 'medium' }) => {
  const color: { [key: string]: string } = {
    Pendente: '#F4782E',
    Vencido: '#DE4F51',
    Concluído: '#3B884C',
  };

  return (
    <View style={styles.container}>
      <FontAwesome
        name="circle"
        size={size === 'small' ? 6 : 8}
        color={color[status]}
        style={[styles.text, { fontSize: size === 'small' ? 10 : 12 }]}
      />
      <Text style={{ color: color[status] }}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginRight: 7,
    fontFamily: 'Lato_400Regular',
  },
});
