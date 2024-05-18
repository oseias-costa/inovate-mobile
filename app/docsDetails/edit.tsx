import { Text, TextInput, View } from "react-native";
import Subtitle from "../components/Subtitle";
import { useState } from "react";
import TextInputCustom from "../components/TextInputCustom";

export default function Edit(){
    return(
        <View style={{backgroundColor: '#fff', paddingTop: 20, flex: 1}}>
            <View style={{paddingBottom: 20}}>
                <Subtitle text="Editar solicitação" />
            </View>
            <TextInputCustom label="Empresa" text="Inovate Ambiental" />
            <TextInputCustom label="Documento solicitado" text="Contrato social exemplo" />
            <TextInputCustom label="Descrição" text="Contrato de abertura da empresa" />
            <TextInputCustom label="Prazo" text="20/05/24" />
            <TextInputCustom label="Solicitante" text="Leonardo Borilli" />
        </View>
    )
}