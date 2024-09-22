import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { formatDate } from '../lib/date';

type RequestItemDashboardProps = {
  title: string;
  description: string;
  createdAt: string;
};

export default function NoticeItemDashboard({
  title,
  description,
  createdAt,
}: RequestItemDashboardProps) {
  return (
    <TouchableOpacity style={styles.constainer}>
      <Text style={styles.createAt}>{formatDate(new Date(createdAt))}</Text>
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.description} numberOfLines={1} ellipsizeMode="tail">
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  constainer: {
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    backgroundColor: '#D3D3D3',
    paddingHorizontal: 16,
    marginVertical: 3,
  },
  createAt: {
    fontSize: 8,
    color: '#3B3D3E',
    fontFamily: 'Lato_300Light',
  },
  title: {
    fontSize: 14,
    color: '#00264B',
    fontFamily: 'Lato_400Regular',
    paddingBottom: 2,
  },
  description: {
    fontSize: 12,
    color: '#3B3D3E',
    fontFamily: 'Lato_300Light',
  },
});
