import { LinearGradient } from "expo-linear-gradient";
import React, { Dispatch, SetStateAction } from "react";
import { Text, TouchableOpacity } from "react-native";

type SelectTypeProps = {
    type: 'doc' | 'task' | 'lo',
    selected: 'doc' | 'task' | 'lo',
    setSelected: Dispatch<SetStateAction<'doc' | 'task' | 'lo'>>,
    Icon: () => React.JSX.Element,
    title: string
}

export const SelectType = ({type, selected, setSelected, Icon, title}: SelectTypeProps) => {
    const colorSelected = selected === type ? '#fff' : '#5D5B5B'

    return(
        <TouchableOpacity onPress={() => setSelected(type)}>
                <LinearGradient
                    colors={selected === type ? ['#005AB1', '#00265B'] : ['#fff', '#fff']}
                    style={{ 
                        width:150, 
                        height: 150, 
                        borderRadius: 20, 
                        marginHorizontal: 10,
                        padding: 20,
                        borderWidth: 1,
                        position: 'relative',
                        zIndex: 30,
                        borderColor: '#D3D3D3',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,

                        elevation: 7,
                    }}
                >
                    <Icon />
                    <Text style={{
                        color: colorSelected,
                        fontFamily: 'Lato_700Bold',
                        fontSize: 17,
                        marginTop: 20
                    }}>{title}</Text>
                </LinearGradient>
        </TouchableOpacity>
    )
}

export default SelectType