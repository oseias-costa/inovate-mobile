import { useQueryClient } from '@tanstack/react-query';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { useEffect, useState } from 'react';

import { useLoading } from '../components/LoadingProvider';
import { Severity, useToast } from '../components/ToastProvider';
import { DocumentPickerResult } from '../lib/types/document-picker-result.type';

export function useUpload(
  uuid: string,
  type: 'REQUEST' | 'REPORT' | 'NOTICE',
  refetch: () => void
) {
  const [files, setFiles] = useState<DocumentPickerResult | any>(null);
  const [error, setError] = useState(false);
  const queryClient = useQueryClient();
  const { setLoading } = useLoading();
  const { showToast } = useToast();

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      multiple: false,
    });
    if (result.canceled === true) {
      return;
    }

    setTimeout(() => {
      setFiles(JSON.stringify(result));
    }, 100);
  };

  function upload() {
    if (!files) return;
    setLoading(true);
    const name = JSON.parse(files).assets[0].name;
    const mimeType = JSON.parse(files).assets[0].mimeType;
    const size = JSON.parse(files).assets[0].size;

    FileSystem.uploadAsync(
      `${process.env.EXPO_PUBLIC_API_URL}/document/upload/${uuid}?name=${name}&mimeType=${mimeType}&type=${type}&size=${size}`,
      JSON.parse(files).assets[0].uri,
      {
        headers: {},
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'file',
        mimeType: JSON.parse(files).assets[0].mimeType,
      }
    )
      .then((res) => {
        setLoading(false);
        showToast('Arquivo enviado com sucesso', Severity.SUCCESS);
        refetch();
      })
      .catch((err) => {
        console.log(err);
        setError(error);
        showToast('Erro ao enviar o arquivo', Severity.ERROR);
        setLoading(false);
      });
    setFiles(null);
    return queryClient.invalidateQueries({ queryKey: [`request-${uuid}`] });
  }

  useEffect(() => {
    if (files) {
      upload();
    }
  }, [files]);

  return { pickDocument, error };
}
