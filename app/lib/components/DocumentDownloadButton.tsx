import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { GestureResponderEvent, Text, TouchableOpacity } from 'react-native';

interface DocumentDownloadButtonProps {
  name: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

export const DocumentDownloadButton: React.FC<DocumentDownloadButtonProps> = ({
  name,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      style={{
        marginHorizontal: 0,
        borderWidth: 1,
        borderColor: '#077EF0',
        display: 'flex',
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 4,
        marginTop: 5,
        marginBottom: 5,
        height: 40,
      }}>
      <Ionicons name="attach" size={24} color="#077EF0" />
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{
          bottom: 0,
          fontSize: 16,
          color: '#077EF0',
          fontFamily: 'Lato_400Regular',
          paddingLeft: 2,
        }}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};
