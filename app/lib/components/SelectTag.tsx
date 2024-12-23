import RadioItem from '@ant-design/react-native/lib/radio/RadioItem';
import { useQuery } from '@tanstack/react-query';
import React, { Dispatch, SetStateAction } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { httpClient } from '../http.client';

type SelectTagProps = {
  type: 'REPORT' | 'REQUEST' | 'NOTICE';
  tagSelected: {
    name: string;
    id: number;
  };
  setTagSelected: Dispatch<SetStateAction<{ name: string; id: number }>>;
};

export default function SelectTag({ tagSelected, setTagSelected, type }: SelectTagProps) {
  const { data } = useQuery({
    queryKey: ['tag' + type],
    queryFn: async () =>
      httpClient({
        path: '/tags',
        queryString: {
          type,
        },
        method: 'GET',
      }),
  });

  return (
    <View style={{ paddingTop: 10, marginBottom: 'auto' }}>
      {data?.map((tag: any) => {
        return (
          <TouchableOpacity
            key={tag.id}
            // checked={tagSelected.id === tag.id}
            onPress={() => {
              setTagSelected({ id: tag.id, name: tag.name });
            }}
            // value={tag.id}
            children={
              <View style={{ marginTop: 4 }}>
                <Text
                  style={{
                    fontFamily: 'Lato_400Regular',
                    fontSize: 18,
                    color: tagSelected.name === tag.name ? '#1677ff' : '#5D5B5B',
                  }}>
                  {tag.name}
                </Text>
              </View>
            }
          />
        );
      })}
    </View>
  );
}
