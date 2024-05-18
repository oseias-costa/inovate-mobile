import { Dispatch, SetStateAction } from "react"
import { Text, TouchableOpacity, View } from "react-native"

type SelectStatusProps = {
    status: 'all' | 'pending' | 'ok' | 'waiting',
    item: 'all' | 'pending' | 'ok' | 'waiting',
    setStatus: Dispatch<SetStateAction<'all' | 'pending' | 'ok' | 'waiting'>>
}

const SelectStatus = ({status, item, setStatus}: SelectStatusProps) => {
    const borderColor = status === item ? '#3F3D56' : '#D9D9D9'
    const weightItem = status === item ? 'Lato_700Bold' : 'Lato_300Light'
    const title = {
        all: 'Todas',
        pending: 'Vencidas',
        waiting: 'Aguardando',
        ok: 'Concluídas'
    }
    return(
        <TouchableOpacity onPress={() => setStatus(item)}>
            <View style={{
                marginHorizontal: 5,
                paddingVertical: 6,
                paddingHorizontal: 28,
                borderWidth: 1,
                borderColor: borderColor,
                borderRadius: 20
            }}>
                <Text style={{
                    fontFamily: weightItem
                }}>{title[item]}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default SelectStatus