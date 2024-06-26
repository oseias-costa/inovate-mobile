import { Image, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import useFontLato from "~/app/hook/useFontLato";
import { useMemo, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import SelectType from "../../../components/SelectType";
import SelectStatus from "../../../components/SelectStatus";
import ItemList from "~/app/components/ItemList";
import { LinearGradient } from "expo-linear-gradient";
import BottomSheet from '@gorhom/bottom-sheet'
// import { StatusBar } from "expo-status-bar";

export default function Dashboard(){
    const [selected, setSelected] = useState<'doc' | 'task' | 'lo'>('doc')
    const [status, setStatus] = useState<'all' | 'pending' | 'ok' | 'waiting'>('all')
    const fontsLoades = useFontLato()
    const colorSelected = (item: string) => selected === item ? '#fff' : '#5D5B5B'


    if(!fontsLoades){
        return <Text>Loading</Text>
    }  
    return(
        <>
        <StatusBar barStyle='light-content' hidden={false} />
        <View style={{backgroundColor: '#fff', position: 'relative'}}>
        <View style={styles.selectTypes}>
            <ScrollView
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    decelerationRate='normal'
                    contentContainerStyle={styles.horizontalTypes}
                    >
                    <SelectType 
                        title="Documentos"
                        type="doc"
                        selected={selected}
                        setSelected={setSelected}
                        Icon={() => 
                            <Ionicons name="document-text" size={32} color={colorSelected('doc')} />}
                    />
                    <SelectType 
                        title="Atividades"
                        type="task"
                        selected={selected}
                        setSelected={setSelected}
                        Icon={() => 
                            <FontAwesome name="list-ul" size={28} color={colorSelected('task')} />}
                    />
                    <SelectType 
                        title="LO"
                        type="lo"
                        selected={selected}
                        setSelected={setSelected}
                        Icon={() => 
                            <FontAwesome name="list-ul" size={28} color={colorSelected('lo')} />}
                    />
                </ScrollView>
            </View>
             <LinearGradient
                colors={['#00264B', '#005AB1']}
                style={styles.gradient}
            >
                <View style={styles.welcomeBox}>
                    <Image 
                        source={require('~/assets/dashboard/logo-white.png')} 
                        style={styles.logoIcon}
                    />
                    <View style={{position: 'relative'}}>
                        <Text style={styles.welcomeText}>Bem vindo</Text>
                        <Text style={styles.welcomeNameUser}>Oséias Costa</Text>
                    </View>
                </View>
            </LinearGradient>
            
            <Text style={styles.titleList}>Solicitações</Text>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                decelerationRate='normal'
                contentContainerStyle={{marginHorizontal: 15, marginVertical: 20, flexDirection: 'row', paddingRight: 20, height: 40}}
            >   
                <SelectStatus item="all" setStatus={setStatus} status={status} />
                <SelectStatus item="pending" setStatus={setStatus} status={status} />
                <SelectStatus item="waiting" setStatus={setStatus} status={status} />
                <SelectStatus item="ok" setStatus={setStatus} status={status} />
            </ScrollView>
            <ScrollView 
                contentContainerStyle={{marginHorizontal: 20}}
                showsVerticalScrollIndicator={false}
            >
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
            </ScrollView>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    gradient: { 
        position: 'relative',
        height: 150, 
        borderEndEndRadius: 50,
        borderEndStartRadius: 50,
        padding: 20,
        paddingTop: 10,
        bottom: 1,
        zIndex: 2,
        marginBottom: 120
    },
    welcomeBox: {
        flexDirection: 'row', 
        marginTop: 10,
        alignItems: 'center',
        position: 'relative',
        zIndex: 2
    },
    logoIcon: {
        marginLeft: 20,
        marginRight: 10
    },
    welcomeText: {
        color: '#d3d3d3', 
        fontSize: 16,
        fontFamily: 'Lato_300Light'
    },
    welcomeNameUser: {
        color: '#fff', 
        fontSize: 28, 
        fontFamily: 'Lato_400Regular'
    },
    selectTypes: {
        position: 'absolute',
        zIndex: 15,
        top: 40,
        height: 220,
        backgroundColor: 'transparent',
        width: '100%',
    },
    horizontalTypes: {
        marginHorizontal: 15, 
        marginVertical: 20, 
        flexDirection: 'row', 
        paddingRight: 20,
        position: 'relative',
        top: 39,
        zIndex: 5,
        // width: '90%',
        // height: 150
    },
    titleList: {
        color: '#3B3D3E', 
        fontSize: 24, 
        fontFamily: 'Lato_400Regular',
        marginLeft: 25,
        position: 'relative',
        zIndex: 1
    }
})