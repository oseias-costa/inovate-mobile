import React, { useState, useImperativeHandle, forwardRef, useRef, useEffect } from 'react';
import { Text, StyleSheet, Animated, Platform, UIManager, View, PanResponder } from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Toast = (props: any, ref: React.Ref<any>) => {
  const [showToast, setShowToast] = useState(false);
  const translateYAnim = useRef(new Animated.Value(-100)).current;
  const [viewWidth, setViewWidth] = useState(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true, // Permite que o toast responda aos gestos
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy < 0) {
          translateYAnim.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < -50) {
          hideToast();
        } else {
          Animated.spring(translateYAnim, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const toast = () => {
    if (!showToast) {
      setShowToast(true);
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(translateYAnim, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setShowToast(false);
        });
      }, 3000);
    }
  };

  const hideToast = () => {
    Animated.timing(translateYAnim, {
      toValue: -100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowToast(false);
    });
  };

  const refContainer = useRef<View>(null);

  useEffect(() => {
    refContainer.current?.measure((x, y, width, height, pageX, pageY) => setViewWidth(height));
  }, [props]);

  useImperativeHandle(ref, () => ({
    toast,
  }));

  if (showToast) {
    return (
      <Animated.View
        ref={refContainer}
        style={[styles.toastContainer, { transform: [{ translateY: translateYAnim }] }]}
        {...panResponder.panHandlers}>
        <View
          style={{
            width: 8,
            height: viewWidth,
            backgroundColor: '#3B3D3E',
            position: 'absolute',
            flexDirection: 'row',
            left: -19,
            bottom: 3,
          }}
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

export default forwardRef(Toast);
