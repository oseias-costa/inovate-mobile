import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator';
import { Image, Modal, View } from 'react-native';

export default function Loading({ isLoading }: { isLoading: boolean }) {
    if(isLoading)
  return (
    <View
      style={{
        backgroundColor: '#ffffff80',
        zIndex: 100,
        position: 'absolute',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image source={require('../../assets/dashboard/logo.png')} style={{ marginBottom: 20 }} />
      <ActivityIndicator color="#00264B" />
    </View>
  );
}
