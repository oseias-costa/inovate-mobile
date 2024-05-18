import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";
import { Text, View } from "react-native";
import TextInputCustom from "~/app/components/TextInputCustom";
import { Button } from "~/components/Button";

const renderBackdrop = (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />


export default function Task(){
    const snapPoins = useMemo(() => ['25%','50%', '60%'],[])
    const ref = useRef<BottomSheet>(null)
    const handleOpen = () => ref.current?.expand()
    const handleClose = () => ref.current?.close()
    return(
        <View style={{flex: 1}}>
            <Text>Task</Text>
            <Button onPress={handleOpen} title="open" />
            <Button onPress={handleClose} title="close" />
            <BottomSheet 
                onClose={handleClose} 
                snapPoints={snapPoins} 
                ref={ref} 
                backdropComponent={renderBackdrop}
                enablePanDownToClose={true}
                backgroundStyle={{backgroundColor: '#fff'}}>
                <View style={{height: 100}}>
                    <TextInputCustom label="Empresa" text="Inovate Ambiental" />
                    <TextInputCustom label="Documento solicitado" text="Contrato social exemplo" />
                    <TextInputCustom label="Descrição" text="Contrato de abertura da empresa" />
                    <TextInputCustom label="Prazo" text="20/05/24" />
                    <TextInputCustom label="Solicitante" text="Leonardo Borilli" />
                </View>
            </BottomSheet>
        </View>
    )
}