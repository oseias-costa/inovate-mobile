import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Account(){
    return(
        <View style={styles.container}>
            <LinearGradient
                colors={['#00264B', '#005AB1']}
                style={styles.gradient}
            >
            <View style={styles.imgBox}>
                <Image 
                    source={require('../../../../assets/dashboard/user.png')} 
                    style={styles.userPhoto}
                    />
                <Text style={styles.userName}>Oséias Costa</Text>
                <Text style={styles.userEmail}>oseiasc2@gmail.com</Text>
            </View>
            </LinearGradient>
            <TouchableOpacity onPress={() => console.log('alterar')}>
                <View style={[styles.itemBox, {
                    borderStartEndRadius: 15,
                    borderStartStartRadius: 15,
                    marginTop: 30
                }]}>
                    <MaterialIcons name="image" color='#3b3d3e' size={24} />
                    <Text style={styles.itemText}>Alterar foto</Text>
                    <MaterialIcons name="arrow-forward-ios" color='#3b3d3eab' size={22} style={{marginLeft: 'auto'}} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('alterar')}>
                <View style={[styles.itemBox, {borderTopWidth: 0}]}>
                    <MaterialIcons name="lock" color='#3b3d3e' size={24} />
                    <Text style={styles.itemText}>Alterar senha</Text>
                    <MaterialIcons name="arrow-forward-ios" color='#3b3d3eab' size={22} style={{marginLeft: 'auto'}} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('alterar')}>
                <View style={[styles.itemBox, {borderTopWidth: 0}]}>
                    <MaterialIcons name="notifications" color='#3b3d3e' size={24} />
                    <Text style={styles.itemText}>Notificação</Text>
                    <MaterialIcons name="arrow-forward-ios" color='#3b3d3eab' size={22} style={{marginLeft: 'auto'}} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('alterar')}>
                <View style={[styles.itemBox, {borderTopWidth: 0}]}>
                    <MaterialIcons name="text-increase" color='#3b3d3e' size={24} />
                    <Text style={styles.itemText}>Alterar o nome</Text>
                    <MaterialIcons name="arrow-forward-ios" color='#3b3d3eab' size={22} style={{marginLeft: 'auto'}} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('alterar')}>
                <View style={[styles.itemBox, {borderTopWidth: 0}]}>
                    <MaterialIcons name="email" color='#3b3d3e' size={24} />
                    <Text style={styles.itemText}>Mudar e-mail</Text>
                    <MaterialIcons name="arrow-forward-ios" color='#3b3d3eab' size={22} style={{marginLeft: 'auto'}} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('alterar')}>
                <View style={[styles.itemBox, {
                    borderTopWidth: 0,
                    borderEndEndRadius: 15,
                    borderEndStartRadius: 15
                }]}>
                    <MaterialIcons name="logout" color='#3b3d3e' size={24} />
                    <Text style={styles.itemText}>Deslogar</Text>
                    <MaterialIcons name="arrow-forward-ios" color='#3b3d3eab' size={22} style={{marginLeft: 'auto'}} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    gradient: { 
        position: 'relative',
        height: 150, 
        borderEndEndRadius: 50,
        borderEndStartRadius: 50,
        bottom: 1,
        zIndex: 2,
        marginBottom: 30
    },
    imgBox: {
        backgroundColor: '#fff', 
        // alignSelf: 'center', 
        marginHorizontal: 20,
        padding: 20, 
        borderRadius: 15
    },
    userPhoto: {
        borderRadius: 500,
        width: 96,
        height: 96,
        alignSelf: 'center'
    },
    userName: {
        color: '#3B3D3E', 
        fontSize: 24, 
        fontFamily: 'Lato_400Regular',
        marginTop: 10,
        alignSelf: 'center'
    },
    userEmail: {
        color: '#3B3D3E', 
        fontSize: 16,
        fontFamily: 'Lato_300Light',
        alignSelf: 'center'
    },
    itemBox: {
        flexDirection: 'row',
        marginHorizontal: 20,
        backgroundColor: '#0000000b',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 2,
        borderColor: '#00000017',
        alignItems: 'center'
    },
    itemText: {
        paddingLeft: 20,
        fontSize: 18,
        fontFamily: 'Lato_400Regular',
        color: '#3b3d3e'
    }
})