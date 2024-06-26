import { FontAwesome } from "@expo/vector-icons";
import { Tabs, router } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Feather } from '@expo/vector-icons';
import { Image, Text, TouchableOpacity } from "react-native";

export default function Layout(){
    return(
        <>
        <Tabs>
            <Tabs.Screen name="dashboard/index" options={{ 
                headerStyle: {
                    backgroundColor: '#00264B'
                },
                title: '',
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                // headerTitle: () => 
                //     <Image 
                //         source={require('~/assets/dashboard/inovate.png')} 
                //         style={{
                //             width: 160,
                //             height: 36
                //         }}
                //     />,
                headerLeft: () => <DrawerToggleButton  tintColor="#fff"  />,
                headerRight: () => <TouchableOpacity><Feather name="bell" size={24} color="white" style={{marginRight: 20}} /></TouchableOpacity>,
                tabBarIcon: ({ focused, color, size}) => {
                    if (focused){
                        return <MaterialIcons name='dashboard' color={color} size={size} />
                    }
                    return <MaterialIcons name='dashboard' color={color} size={size} />
                }
                
            }} />
            <Tabs.Screen 
                name="docs/index"  
                options={{ 
                    headerStyle: {
                        backgroundColor: '#00264B'
                    },
                    title: '',
                    headerTitle: () => 
                        <Image 
                            source={require('~/assets/dashboard/logo-white.png')} 
                            style={{
                                width: 40,
                                height: 30
                            }}
                        />,
                    headerLeft: () => <DrawerToggleButton tintColor="#fff" />,
                    headerRight: () => 
                        <TouchableOpacity onPress={() => router.navigate('/docsDetails/newSolicitation')}>
                            <Text style={{
                                marginRight: 20,
                                color: '#fff'
                            }}>Nova</Text>
                        </TouchableOpacity>,
                    headerLeftLabelVisible: true,
                    headerTitleAlign: 'center',
                    headerTitleStyle: {color: '#fff'},
                    headerShadowVisible: false,
                    tabBarIcon: ({ focused, color, size}) => {
                        if (focused){
                            return <Ionicons name='document-text' color={color} size={size} />
                        }
                        return <Ionicons name='document-text' color={color} size={size} />
                    }
                }}
            />
            <Tabs.Screen 
                name="tasks/index"  
                options={{ 
                    title: 'Atividades',
                    tabBarIcon: ({ focused, color, size}) => {
                        if (focused){
                            return <FontAwesome name='list-ul' color={color} size={size} />
                        }
                        return <FontAwesome name='list-ul' color={color} size={size} />
                    }
                }}
            />
            <Tabs.Screen 
                name="account/index"  
                options={{ 
                    headerStyle: {
                        backgroundColor: '#00264B'
                    },
                    title: 'Conta',
                    headerTintColor: '#fff',
                    headerShadowVisible: false,
                    headerTitleAlign: 'center',
                    headerLeft: () => 
                        <TouchableOpacity onPress={() => router.back()}>
                            <MaterialIcons name="arrow-back-ios-new" color='#fff' size={22} style={{marginLeft: 20}} />
                        </TouchableOpacity>,
                    tabBarIcon: ({ focused, color, size}) => {
                        if (focused){
                            return <FontAwesome name='user' color={color} size={size} />
                        }
                        return <FontAwesome name='user' color={color} size={size} />
                    }
                }}
            />
        </Tabs>
        </>
    )
}