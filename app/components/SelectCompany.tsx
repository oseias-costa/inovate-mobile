import RadioItem from "@ant-design/react-native/lib/radio/RadioItem";
import { Text, View } from "react-native";
import useGetCompanys from "../hook/useGetCompanys";
import { Dispatch, SetStateAction } from "react";

type SelectCompanyProps = {
    companySelected: {
        name: string,
        id: string
    },
    setCompanySelected: Dispatch<SetStateAction<{name: string, id: string}>>
}

export default function SelectCompany({companySelected, setCompanySelected}: SelectCompanyProps){
    const { data: companys } = useGetCompanys();

    return(
        <View style={{ paddingTop: 10 }}>
              {companys?.map((company: any) => {
                return (
                  <RadioItem
                    key={company.id}
                    checked={companySelected.id === company.id}
                    onChange={() => {
                      setCompanySelected({ id: company.id, name: company.name });
                    }}
                    value={company.id}
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
                    left={true}
                  />
                );
              })}
            </View>
    )
}