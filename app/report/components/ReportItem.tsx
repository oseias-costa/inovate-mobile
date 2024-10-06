import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { formatDate } from '../../lib/date';

type ReportItemProps = {
  title: string;
  createdAt: string;
  uuid: string;
  onPress: () => void;
};

export default function ReportItem({ title, createdAt, uuid, onPress }: ReportItemProps) {
  return (
    <TouchableOpacity style={styles.constainer} onPress={onPress} key={uuid}>
      <View style={styles.iconContainer}>
        <SimpleLineIcons name="docs" size={20} color="#75BCEE" />
      </View>
      <View>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.description}>Data {formatDate(new Date(createdAt))}</Text>
        </View>
      </View>
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
    borderBottomColor: '#E9E9E9',
    borderBottomWidth: 1,
  },
  iconContainer: {
    borderRadius: 50,
    borderColor: '#75BCEE',
    borderWidth: 1,
    padding: 8,
    marginRight: 15,
  },
  title: {
    fontSize: 16,
    color: '#3B3D3E',
    fontFamily: 'Lato_400Regular',
    paddingBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#6D6D6D',
    fontFamily: 'Lato_300Light',
    paddingLeft: 4,
  },
});
