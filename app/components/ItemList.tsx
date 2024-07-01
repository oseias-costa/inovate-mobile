import { Ionicons } from '@expo/vector-icons';
import { Redirect, router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { Document } from '../types/doc.type';
import { month } from '../lib/month';
import useGetUser from '../hook/useGetUser';

const ItemList = ({doc}:{doc: Document}) => {
    const { user } = useGetUser()
    const expiration = new Date(doc?.expiration) 
    let companyName = ''

    if(user?.type === 'COMPANY'){
        companyName = user.name
    }
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#D9D9D9',
      }}
      onPress={() => router.navigate("/docsDetails/details")}>
      <Ionicons name="checkmark-circle" size={24} color="#00264B" />
      <View style={{ marginLeft: 15 }}>

        <Text
          style={{
            color: '#3B3D3E',
            fontSize: 16,
            fontFamily: 'Lato_400Regular',
          }}>
          {companyName}
        </Text>
        <Text
          style={{
            color: '#3B3D3E',
            fontSize: 12,
            fontFamily: 'Lato_300Light',
          }}>
          {doc?.document}
        </Text>
      </View>
      <View style={{ marginLeft: 'auto', alignItems: 'flex-end' }}>
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
