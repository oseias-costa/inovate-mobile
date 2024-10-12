import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator';
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { View, StyleSheet, Image } from 'react-native';

interface LoadingContextType {
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
}

export const LoadingContext = createContext<LoadingContextType>({
  setLoading: () => {},
  loading: false,
});

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ setLoading, loading }}>
      <View style={styles.container}>
        {loading && (
          <View style={styles.loadingOverlay}>
            <Image
              source={require('../../assets/svg/logo-loading.png')}
              style={[{ width: 45, height: 50, alignSelf: 'center' }]}
            />
            <ActivityIndicator animating={loading} size={50} color="#00264B" />
          </View>
        )}
        <>{children}</>
      </View>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    zIndex: 5000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
