import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Redirect, router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Document } from '../types/doc.type';
import { month } from '../lib/month';
import useGetUser from '../hook/useGetUser';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { formatDate } from '../lib/date';

const ItemList = ({ doc }: { doc: Document }) => {
  const { user } = useGetUser();
  const expiration = new Date(doc?.expiration);
  let companyName = '';

  if (user?.type === 'COMPANY') {
    companyName = user.name;
  }

  const status = {
    FINISH: {
      icon: <AntDesign style={styles.icon} name="checkcircle" size={16} color="#00264B" />,
      text: 'A solicitação foi concluída',
      color: {
        text: '#00264B',
        background: '#E4F6FD',
      },
    },
    EXPIRED: {
      icon: <AntDesign style={styles.icon} name="checkcircle" size={16} color="#DE4F51" />,
      text: 'O prazo foi vencido dia',
      color: {
        text: '#DE4F51',
        background: '#FFF4E6',
      },
    },
    PEDING: {
      icon: <AntDesign style={styles.icon} name="exclamationcircle" size={16} color="#F4782E" />,
      text: 'Solicitação pendende prazo',
      color: {
        text: '#F4782E',
        background: '#FFF4E6',
      },
    },
  };

  const date = formatDate(expiration)

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push({ pathname: '/docsDetails/details', params: { id: doc.id } })}>
      <View style={{ flexDirection: 'row' }}>
        {status[doc?.status]?.icon}
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.title}>{doc?.document}</Text>
          <Text style={styles.companyName}>{companyName}</Text>
          <View style={styles.info}>
            { doc?.status !== 'FINISH' && (
              <Fontisto
                name="stopwatch"
                size={10}
                color={status[doc?.status]?.color.text}
                style={styles.cronIcon}
              />
            )}
            <Text style={[styles.cronText, { color: status[doc?.status]?.color.text }]}>
              {status[doc?.status]?.text}  { doc?.status !== 'FINISH' && date } 
            </Text>
          </View>
        </View>
      </View>
      <MaterialIcons name="arrow-forward-ios" size={20} color="#D9D9D9" />
    </TouchableOpacity>
  );
};

export default ItemList;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    color: '#3B3D3E',
    fontSize: 16,
    fontFamily: 'Lato_400Regular',
  },
  companyName: {
    color: '#3B3D3E',
    fontSize: 12,
    fontFamily: 'Lato_300Light',
  },
  icon: {
    top: 4,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
    borderRadius: 8,
  },
  cronIcon: {
    top: 2,
    marginRight: 6,
  },
  cronText: {
    fontSize: 11,
    paddingTop: 4,
  },
});
