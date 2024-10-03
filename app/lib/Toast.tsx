import React, { useState, useImperativeHandle, forwardRef, useRef } from 'react';
import { Text, StyleSheet, Animated, Platform, UIManager } from 'react-native';

import { Severity } from '../components/ToastProvider';

type ToastProps = {
  message: string;
  severety: Severity;
};

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Toast = (props: ToastProps, ref: React.Ref<unknown> | undefined) => {
  const [showToast, setShowToast] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toast = () => {
    if (!showToast) {
      setShowToast(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setShowToast(false);
        });
      }, 3000);
    }
  };

  useImperativeHandle(ref, () => ({
    toast,
  }));

  if (showToast) {
    return (
      <Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]}>
        <Text style={styles.toastText}>{props.message}</Text>
      </Animated.View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    borderRadius: 30,
    overflow: 'hidden',
    flexDirection: 'row',
    bottom: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toastContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    zIndex: 1000,
  },
  toastText: {
    color: 'red',
    fontSize: 20,
  },
});

export default forwardRef(Toast);
