import { StyleSheet, Text, View } from "react-native";
import Subtitle from "../components/Subtitle";
import DetailItem from "../components/DetailItem";

export default function Details(){
    return(
        <View style={{backgroundColor: '#fff', paddingTop: 20, flex: 1}}>
            <View style={{paddingBottom: 20}}>
                <Subtitle text="Solicitação" />
            </View>
            <View style={styles.painel}>
                <View>
                    <Text style={[styles.painelDescription, {
                        backgroundColor: '#d3d3d3',
                        paddingHorizontal: 10,
                        paddingVertical: 1,
                        borderRadius: 10,
                        marginBottom: 4,
                    }]}>Abertura</Text>
                    <Text style={styles.painelData}>24/05/24</Text>
                </View>
                <View>
                    <Text style={[styles.painelDescription, {
                        backgroundColor: '#d3d3d3',
                        paddingHorizontal: 10,
                        paddingVertical: 1,
                        borderRadius: 10,
                        marginBottom: 4
                    }]}>Aguardando</Text>
                    <Text style={styles.painelData}>faltam 4 dias</Text>
                </View>
                <View>
                    <Text style={styles.painelDescription}>Concluído</Text>
                    <Text style={styles.painelData}>29/05/24</Text>
                </View>
            </View>
            <DetailItem 
                label="Empresa" 
                text="Inovate Ambiental" 
                fontSize="bigger"
            />
            <DetailItem 
                label="Documento" 
                text="Cadastro na FEPAM" 
                fontSize="bigger"
            />
            <DetailItem 
                label="Descrição" 
                text="Documento Emitido no mesmo dia que foi realizado o cadastro" 
                fontSize="small"
            />
            <DetailItem
                label="Solicitante" 
                text="Leonardo Borilli" 
                fontSize="small"
            />
            <DetailItem
                label="Prazo" 
                text="06/05/24" 
                fontSize="small"
            />
            
        </View>
    )
}

const styles = StyleSheet.create({
    painel: {
        marginBottom: 20,
        marginHorizontal: 10,
        height: 58,
        backgroundColor: '#fff',
        // alignSelf: 'center',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 32,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    painelDescription: {
        color: '#363636',
        fontSize: 12,
        fontFamily: 'Lato_300Light',
        position: 'relative',
        alignSelf: 'center',
        bottom: 1,
        // backgroundColor: '#fff'
    },
    painelData: {
        color: '#363636',
        fontFamily: 'Lato_400Regular',
        fontSize: 14
    }
})