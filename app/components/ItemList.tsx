import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Redirect, router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Document } from '../types/doc.type';
import { month } from '../lib/month';
import useGetUser from '../hook/useGetUser';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const ItemList = ({ doc }: { doc: Document }) => {
  const { user } = useGetUser();
  const expiration = new Date(doc?.expiration);
  let companyName = '';

  if (user?.type === 'COMPANY') {
    companyName = user.name;
  }

  const status = {
    'FINISH': {
      icon: <AntDesign style={styles.icon} name="checkcircle" size={16} color="#00264B" />,
      text: "A solicitação foi concluída",
      color: {
        text: "#00264B",
        background: "#E4F6FD"
      }
    },
    'EXPIRED': {
      icon: <AntDesign style={styles.icon} name="checkcircle" size={16} color="#DE4F51" />,
      text: "A solicitação está vencida",
      color: {
        text: "#DE4F51",
        background: "#FFF4E6"
      }
    },
    'PEDING': {
      icon: <AntDesign style={styles.icon} name="exclamationcircle" size={16} color="#F4782E" />,
      text: "Solicitação pendende",
      color: {
        text: "#F4782E",
        background: "#FFF4E6"
      }
    }
  }

  return (
    <TouchableOpacity
      style={{
        borderBottomWidth: 1,
        borderColor: '#D9D9D9',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 6
      }}
      onPress={() => router.push({ pathname: '/docsDetails/details', params: { id: doc.id } })}>
        <View style={{ flexDirection: 'row'}}>
       {status[doc?.status]?.icon}
      <View style={{ marginLeft: 15 }}>
        <Text
          style={{
            color: '#3B3D3E',
            fontSize: 16,
            fontFamily: 'Lato_400Regular',
          }}>
          {doc?.document}
        </Text>
        <Text
          style={{
            color: '#3B3D3E',
            fontSize: 12,
            fontFamily: 'Lato_300Light',
          }}>
          {companyName}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: status[doc?.status]?.color.background, marginVertical:2, paddingHorizontal: 8, borderRadius: 8}}>
          <Fontisto name="stopwatch" size={12} color={status[doc?.status]?.color.text} style={{top: 2, marginRight: 6}} />
          <Text style={{ fontSize: 12, paddingTop: 4, color: status[doc?.status]?.color.text}}>{status[doc?.status]?.text}</Text>
        </View>
      </View>
      </View>
      <MaterialIcons name="arrow-forward-ios" size={20} color="#D9D9D9" />
    </TouchableOpacity>
  );
};

export default ItemList;

const styles = StyleSheet.create({
  icon: {
    top: 4
  }
})