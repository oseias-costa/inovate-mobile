import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Redirect, router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Document } from '../types/doc.type';
import { month } from '../lib/month';
import useGetUser from '../hook/useGetUser';
import { FontAwesome } from '@expo/vector-icons';

const ItemList = ({ doc }: { doc: Document }) => {
  const { user } = useGetUser();
  const expiration = new Date(doc?.expiration);
  let companyName = '';

  if (user?.type === 'COMPANY') {
    companyName = user.name;
  }

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#D9D9D9',
      }}
      onPress={() => router.push({ pathname: '/docsDetails/details', params: { id: doc.id } })}>
      {doc?.status === 'FINISH' ? (
        <AntDesign style={styles.icon} name="checkcircle" size={20} color="#00264B" />
      ) : (
        (doc?.status === 'EXPIRED' && (
          <AntDesign style={styles.icon} name="exclamationcircle" size={20} color="#DE4F51" />
        )) ||
        (doc?.status === 'PEDING' && (
          <AntDesign style={styles.icon} name="exclamationcircle" size={20} color="#F4782E" />
        ))
      )}
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
      </View>
      <FontAwesome name="calendar-o" size={20} color="#d3d3d3" style={{flexDirection: 'column', marginLeft: 'auto', alignItems: 'flex-end', right: 14}} />
      <View style={{position: 'absolute', right: 0, top: 10, zIndex: 2, display: 'flex', alignItems: 'center', backgroundColor: '#fff'}}>
        <Text
          style={{
            color: '#3B3D3E',
            fontSize: 12,
            fontFamily: 'Lato_400Regular',
          }}>
          {month[expiration.getMonth() + 1]}
        </Text>
        <Text
          style={{
            color: '#3B3D3E',
            fontSize: 16,
            fontFamily: 'Lato_400Regular',
          }}>
          {expiration?.getDate()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemList;

const styles = StyleSheet.create({
  icon: {
    top: 4
  }
})