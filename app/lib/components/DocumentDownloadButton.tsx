import { Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Document } from '../types/document.type';

interface DocumentDownloadButtonProps {
  document: Document;
}

export const DocumentDownloadButton: React.FC<DocumentDownloadButtonProps> = ({ document }) => {
  const [progress, setProgress] = React.useState(0);
  const [progressAnimation] = useState(new Animated.Value(0));
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState('');

  useEffect(() => {
    Animated.timing(progressAnimation, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  async function downloadFile() {
    if (file) {
      return await Sharing.shareAsync(file);
    }

    setLoading(true);
    const safeName = document.name; //.replace(/[^a-zA-Z0-9]/g, '_');
    const fileUri = FileSystem.documentDirectory + safeName;
    const uri = `${process.env.EXPO_PUBLIC_API_URL}/document/download?key=${document.path}`;
    const downloadsDir = FileSystem.documentDirectory + 'downloads/';

    try {
      await FileSystem.makeDirectoryAsync(downloadsDir, { intermediates: true });

      const callback = (downloadProgress: any) => {
        const totalBytesWritten = downloadProgress.totalBytesWritten;

        const progress = (totalBytesWritten / Number(document.size)) * 100;
        setProgress(Math.ceil(progress));
      };

      const downloadResumable = FileSystem.createDownloadResumable(uri, fileUri, {}, callback);

      const resume = await downloadResumable.downloadAsync();

      if (!(await Sharing.isAvailableAsync())) {
        alert('Sharing is not available on this device');
        return;
      }

      setFile(fileUri);
      setLoading(false);
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      setLoading(false);
      console.error('Erro ao baixar o arquivo:', error);
    }
  }

  return (
    <TouchableOpacity
      onPress={downloadFile}
      style={{
        marginHorizontal: 0,
        flexDirection: 'column',
        marginTop: 15,
        marginBottom: 5,
        width: '100%',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          numberOfLines={1}
          // ellipsizeMode="tail"
          style={{
            bottom: 0,
            fontSize: 16,
            color: '#6D6D6D',
            fontFamily: 'Lato_400Regular',
            width: '85%',
          }}>
          {document.name}
        </Text>
        {loading ? (
          <ActivityIndicator style={{ marginRight: 10, marginBottom: 4 }} />
        ) : file ? (
          <FontAwesome name="save" size={24} color="#6D6D6D" style={{ marginRight: 10 }} />
        ) : (
          <Feather name="download" size={24} color="#6D6D6D" style={{ marginRight: 10 }} />
        )}
      </View>
      <AnimatedProgressBar progres={progress} />
    </TouchableOpacity>
  );
};

const AnimatedProgressBar = ({ progres }: { progres: number }) => {
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: progres,
      duration: 200, // 5 segundos
      useNativeDriver: false,
    }).start();
  }, [progres]);
  return (
    <View style={styless.container}>
      <View style={styless.progressBar}>
        <Animated.View
          style={[
            styless.progress,
            { width: progress.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) },
          ]}
        />
      </View>
    </View>
  );
};
const styless = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 4,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  progressBar: {
    height: 3,
    width: '100%',
    backgroundColor: '#e0e0de',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#00264B',
    borderRadius: 5,
  },
});
