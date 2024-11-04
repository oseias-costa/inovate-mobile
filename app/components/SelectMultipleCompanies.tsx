import RadioItem from '@ant-design/react-native/lib/radio/RadioItem';
import React, { Dispatch, SetStateAction } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import useGetCompanys from '../hook/useGetCompanys';
import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../lib/http.client';

type SelectCompanyProps = {
  setCompanies: Dispatch<SetStateAction<{ name: string; uuid: string }[] | undefined>>;
  companies: { name: string; uuid: string }[] | undefined;
};

export default function SelectMultipleCompanies({ companies, setCompanies }: SelectCompanyProps) {
  const { data: companys } = useQuery({
    queryKey: ['companys-list'],
    queryFn: async () =>
      httpClient({
        path: '/users/companys',
        method: 'GET',
      }),
  });

  return (
    <View style={{ paddingTop: 10 }}>
      {companys &&
        companys?.map((company: any) => {
          return (
            <RadioItem
              key={company.id}
              checked={companies && companies?.some((item) => item.uuid === company.uuid)}
              value={company.uuid}
              children={
                <TouchableOpacity
                  onPress={() => {
                    if (companies && companies?.some((c) => c.uuid === company.uuid)) {
                      const filterCompanies = companies.filter((c) => c.uuid !== company.uuid);
                      return setCompanies(filterCompanies);
                    }

                    return companies
                      ? setCompanies([...companies, { name: company.name, uuid: company.uuid }])
                      : setCompanies([{ name: company.name, uuid: company.uuid }]);
                  }}>
                  <View style={{ marginTop: 4 }}>
                    <Text
                      style={{
                        fontFamily: 'Lato_400Regular',
                        fontSize: 18,
                        color:
                          companies?.some((item) => item.uuid === company.uuid) === company.name
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
