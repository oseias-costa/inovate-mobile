import ButtonAnt, { ButtonProps } from '@ant-design/react-native/lib/button';
import React from 'react';
import { Text } from 'react-native';

export const CustomButton = (props: ButtonProps) => {
  return (
    <ButtonAnt
      style={{
        marginHorizontal: 20,
        marginTop: 'auto',
        zIndex: 1,
        height: 40,
        width: '100%',
      }}
      {...props}>
      <Text
        style={{
          fontFamily: 'Lato_400Regular',
          fontSize: 16,
          color: props.type === 'primary' ? '#fff' : '#000',
        }}>
        {props.children}
      </Text>
    </ButtonAnt>
  );
};
