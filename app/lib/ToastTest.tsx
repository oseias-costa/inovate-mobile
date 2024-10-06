import React, { useState, useImperativeHandle, forwardRef, useRef, useEffect } from 'react';
import { Text, StyleSheet, Animated, Platform, UIManager, View } from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ToastTest = (props: any, ref: React.Ref<any>) => {
  const [showToast, setShowToast] = useState(false);
  const translateYAnim = useRef(new Animated.Value(-100)).current; // Inicia fora da tela (acima do topo)
  const [viewWidth, setViewWidth] = useState(0);

  const toast = () => {
    if (!showToast) {
      setShowToast(true);
      Animated.timing(translateYAnim, {
        toValue: 0, // Desce até a posição 0 (no topo da tela)
        duration: 500,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        Animated.timing(translateYAnim, {
          toValue: -100, // Volta para fora da tela (acima do topo)
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setShowToast(false);
        });
      }, 3000);
    }
  };

  const refContainer = useRef<View>(null);

  useEffect(() => {
    refContainer.current?.measure((x, y, width, height, pageX, pageY) => setViewWidth(height));
    console.log(viewWidth);
  }, [props]);

  useImperativeHandle(ref, () => ({
    toast,
  }));

  if (showToast) {
    return (
      <Animated.View
        ref={refContainer}
        style={[styles.toastContainer, { transform: [{ translateY: translateYAnim }] }]}>
        <View
          style={{ width: 8, height: viewWidth, backgroundColor: '#3B3D3E', position: 'absolute' }}
        />
        <Text style={styles.toastText}>{props.message}</Text>
        <Text style={styles.description}>{props.message}</Text>
      </Animated.View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  toastContainer: {
    top: 100,
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 10,
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1000,
    width: '94%',
    paddingLeft: 20,
    display: 'flex',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  toastText: {
    fontSize: 18,
    color: '#363636',
    fontFamily: 'Lato_400Regular',
  },
  description: {
    fontFamily: 'Lato_300Light',
    fontSize: 16,
    color: '#716F6F',
  },
});

export default forwardRef(ToastTest);
