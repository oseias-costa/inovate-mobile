import { useQuery } from '@tanstack/react-query';
import React, { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';
import { httpClient } from '../http.client';
import { SelectItem } from './SelectItem';

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
    queryKey: ['tag', type],
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
          <SelectItem
            key={tag.id}
            itemSelected={tagSelected.name}
            value={tag.name}
            placeholder={tag.name}
            onChange={() => setTagSelected({ id: tag.id, name: tag.name })}
          />
        );
      })}
    </View>
  );
}
