import LottieView from 'lottie-react-native';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, View, useWindowDimensions } from 'react-native';
import animation from '../../assets/animations/intro.json';
import { Tabs, useRouter } from 'expo-router';
import PageLayout from './PageLayout';

export default function Animation() {
  const [err, stErr] = useState('');
  const animationRef = useRef<LottieView>(null);
  const window = useWindowDimensions();
  const router = useRouter();

  useEffect(() => {
    animationRef.current?.play();

    setTimeout(() => {
      router.push('/auth/welcome');
    }, 2500);
  }, []);

  return (
    <>
      <Tabs.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={{ width: '100%', padding: 0 }}>
        <LottieView
          ref={animationRef}
          style={{ position: 'relative', top: 0, width: window.width, height: window.height }}
          source={animation}
          autoPlay
          loop={false}
          speed={1}
          onAnimationFailure={(err) => stErr(err)}
          onAnimationLoaded={() => console.log('re')}
          onAnimationFinish={() => console.log('finish')}
        />
      </View>
    </>
  );
}

