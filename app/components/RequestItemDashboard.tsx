import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { formatDate } from '../lib/date';

type RequestItemDashboardProps = {
  title: string;
  expiration: string;
};

export default function RequestItemDashboard({ title, expiration }: RequestItemDashboardProps) {
  return (
    <TouchableOpacity style={styles.constainer}>
      <View>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons name="access-alarm" size={14} color="#AEA4A4" />
          <Text style={styles.description}>Prazo {formatDate(new Date(expiration))}</Text>
        </View>
      </View>
      <MaterialIcons size={16} color="#C8BDBD" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  constainer: {
    paddingVertical: 14,
    marginHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 14,
    color: '#3B3D3E',
    fontFamily: 'Lato_400Regular',
    paddingBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#6D6D6D',
    fontFamily: 'Lato_300Light',
    paddingLeft: 4,
  },
});
