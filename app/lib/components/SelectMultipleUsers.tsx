import RadioItem from '@ant-design/react-native/lib/radio/RadioItem';
import React, { Dispatch, SetStateAction } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../http.client';

type SelectUserProps = {
  setUsers: Dispatch<SetStateAction<{ name: string; uuid: string }[] | undefined>>;
  users: { name: string; uuid: string }[] | undefined;
};

export default function SelectMultiplesUsers({ users, setUsers }: SelectUserProps) {
  const { data } = useQuery({
    queryKey: ['users-list'],
    queryFn: async () =>
      httpClient({
        path: '/users/get-users',
        method: 'GET',
      }),
  });

  return (
    <View style={{ paddingTop: 10 }}>
      {data &&
        data?.map((company: any) => {
          return (
            <RadioItem
              key={company.id}
              checked={users && users?.some((item) => item.uuid === company.uuid)}
              value={company.uuid}
              children={
                <TouchableOpacity
                  onPress={() => {
                    if (users && users?.some((c) => c.uuid === company.uuid)) {
                      const filterusers = users.filter((c) => c.uuid !== company.uuid);
                      return setUsers(filterusers);
                    }

                    return users
                      ? setUsers([...users, { name: company.name, uuid: company.uuid }])
                      : setUsers([{ name: company.name, uuid: company.uuid }]);
                  }}>
                  <View style={{ marginTop: 4 }}>
                    <Text
                      style={{
                        fontFamily: 'Lato_400Regular',
                        fontSize: 18,
                        color:
                          users?.some((item) => item.uuid === company.uuid) === company.name
                            ? '#1677ff'
                            : '#5D5B5B',
                      }}>
                      {company.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              }
              left
            />
          );
        })}
    </View>
  );
}
