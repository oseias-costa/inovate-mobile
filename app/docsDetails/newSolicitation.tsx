import { Text, TextInput, View } from "react-native";
import Subtitle from "../components/Subtitle";
import { useState } from "react";
import TextInputCustom from "../components/TextInputCustom";
import { Stack } from "expo-router";

export default function NewSolicitation(){
    return(
        <View style={{backgroundColor: '#fff', paddingTop: 20, flex: 1}}>
            <View style={{paddingBottom: 20}}>
                <Subtitle text="Nova solicitação" />
            </View>
            <TextInputCustom label="Empresa" text="" />
            <TextInputCustom label="Documento solicitado" text="" />
            <TextInputCustom label="Descrição" text="" />
            <TextInputCustom label="Prazo" text="" />
            <TextInputCustom label="Solicitante" text="" />
        </View>
    )
}