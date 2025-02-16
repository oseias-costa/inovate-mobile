import React, { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';

import useGetCompanys from '../../hook/useGetCompanys';
import { SelectItem } from './SelectItem';

type SelectCompanyProps = {
  companySelected: {
    name: string;
    uuid: string;
  };
  setCompanySelected: Dispatch<SetStateAction<{ name: string; uuid: string }>>;
};

export default function SelectCompany({ companySelected, setCompanySelected }: SelectCompanyProps) {
  const { data: companys } = useGetCompanys();
  return (
    <View style={{ paddingTop: 10 }}>
      {companys &&
        companys?.items.map((company: any) => {
          return (
            <SelectItem
              key={company.uuid}
              itemSelected={companySelected.uuid}
              onChange={() => setCompanySelected({ uuid: company.uuid, name: company.name })}
              value={company.uuid}
              placeholder={company.name}
            />
          );
        })}
    </View>
  );
}
