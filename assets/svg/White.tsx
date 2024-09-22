import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export default function WhiteCircle() {
  return (
    <View style={{ width: 100, height: 100, marginTop: 10 }}>
      <Svg width="100%" height="100%" viewBox="0 0 100 100">
        <Circle cx="50" cy="50" r="40" fill="white" />
      </Svg>
    </View>
  );
}
