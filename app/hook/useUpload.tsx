import { useQueryClient } from '@tanstack/react-query';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { useEffect, useState } from 'react';

import { DocumentPickerResult } from '../types/document-picker-result.type';

export function useUpload(uuid: string) {
  const [files, setFiles] = useState<DocumentPickerResult | any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const queryClient = useQueryClient();

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      multiple: false,
    });
    if (result.canceled === true) {
      setFiles(result);
    } else {
      setTimeout(() => {
        setLoading(true);
        setFiles(JSON.stringify(result));
      }, 100);
    }
  };

  function upload() {
    const name = JSON.parse(files).assets[0].name;
    FileSystem.uploadAsync(
      `${process.env.EXPO_PUBLIC_API_URL}/document/upload/${uuid}/${name}`,
      JSON.parse(files).assets[0].uri,
      {
        headers: {},
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'file',
        mimeType: JSON.parse(files).assets[0].mimeType,
      }
    )
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
        setError(error);
      });
    setLoading(false);
    setFiles(null);
    return queryClient.invalidateQueries({ queryKey: [`request-${uuid}`] });
  }

  useEffect(() => {
    if (files) {
      upload();
    }
  }, [files]);

  return { pickDocument, loading, error };
}
