import RadioItem from '@ant-design/react-native/lib/radio/RadioItem';
import React, { Dispatch, SetStateAction } from 'react';
import { Text, View } from 'react-native';
import useGetUsers from '../hooks/useGetUsers';

type SelectCompanyProps = {
  companySelected: {
    name: string;
    uuid: string;
  };
  setCompanySelected: Dispatch<SetStateAction<{ name: string; uuid: string }>>;
};

export default function SelectCompany({ companySelected, setCompanySelected }: SelectCompanyProps) {
  const { data: users } = useGetUsers();

  return (
    <View style={{ paddingTop: 10 }}>
      {users &&
        users?.map((company: any) => {
          return (
            <RadioItem
              key={company.id}
              checked={companySelected.uuid === company.uuid}
              onChange={() => {
                setCompanySelected({ uuid: company.uuid, name: company.name });
              }}
              value={company.uuid}
              children={
                <View style={{ marginTop: 4 }}>
                  <Text
                    style={{
                      fontFamily: 'Lato_400Regular',
                      fontSize: 18,
                      color: companySelected.name === company.name ? '#1677ff' : '#5D5B5B',
                    }}>
                    {company.name}
                  </Text>
                </View>
              }
              left
            />
          );
        })}
    </View>
  );
}
