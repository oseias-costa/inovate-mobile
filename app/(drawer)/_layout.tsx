import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { router, useNavigation, usePathname } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useEffect } from "react";
import { Image, Text, TouchableOpacity } from "react-native";

const CustomDrawerContent = (props: any) => {
    const pathname = usePathname()
    const navigation = useNavigation()

    useEffect(() => {
        console.log(pathname)
    },[])

   return(
        <DrawerContentScrollView {...props}>
            <Image
                source={require('../../assets/auth/logo-clean.png')}
                style={[{ width: 200, height: 50, marginLeft: 20, marginBottom: 20, marginTop: 20 }]}
            />
            <DrawerItem 
                style={{ backgroundColor: pathname === '/dashboard' ? '#D9D9D9' : '#fff' }}
                icon={({color, size}) => (
                    <MaterialIcons 
                        name='dashboard' 
                        color='#3B3D3E'
                        size={size} 
                    />)} 
                label='Início' 
                labelStyle={{
                    color: pathname === '/dashboard' ? '#3B3D3E' : '#3B3D3E',
                    fontSize: 16,
                    fontFamily: 'Lato_400Regular'
                }}
                onPress={() => router.push('/(drawer)/(tabs)/dashboard/')}
            />
            <DrawerItem 
                style={{
                    backgroundColor: pathname === '/docs' ? '#D9D9D9' : '#fff',
                }}
                labelStyle={{
                    color: '#3B3D3E',
                    fontSize: 16,
                    fontFamily: 'Lato_400Regular'
                }}
                icon={({color, size}) => (
                    <Ionicons 
                        name="document-text" 
                        size={24}                         
                        color='#3B3D3E'
                    />)} 
                label='Documentos' 
                onPress={() => router.push('/(drawer)/(tabs)/docs/')}
            />
        </DrawerContentScrollView>
    )
}

export default function Layout(){
    return(
        <Drawer 
            drawerContent={(props) => <CustomDrawerContent {...props} />} 
            screenOptions={{ headerShown: false, headerTintColor: '#fff' }}
        >
        </Drawer>
    )
}