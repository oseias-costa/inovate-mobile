import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NotificationItem(){
    return(
        <TouchableOpacity style={styles.button}>
        <View style={styles.container}>
            <Image style={styles.img} source={require('../../assets/dashboard/logo.png')} />
            <View style={styles.box}>
                <Text style={styles.type}>Aviso Inovate</Text>
                <Text style={styles.title}>Aviso da Inovate Ambiental </Text>
                <Text style={styles.description}>Aviso da Inovate Ambiental </Text>
            </View>
        </View>
        <Text style={styles.notificationTime}>1 hora atrás</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        borderBottomWidth: 0.4,
        borderBottomColor: '#6597C9'
    },
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row'
    },
    box: {
        marginLeft: 10
    },
    type: {
        color: '#6597C9',
        marginBottom: 5
    },
    title: {
        color: '#3F3D56',
        fontFamily: 'Lato_400Regular',
        fontSize: 18,
    },
    description: {
        fontFamily: 'Lato_300Light',
        fontSize: 14,
        color: '#716F6F',
    },
    notificationTime: {
        alignSelf: 'flex-end',
        paddingRight: 20,
        color: '#3B3D3E',
        fontFamily: 'Lato_400Regular',
    },
    img: {
        width: 50,
        height: 50
    }
})