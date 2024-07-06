import DatePicker from '@ant-design/react-native/lib/date-picker';
import Provider from '@ant-design/react-native/lib/provider';
import List from '@ant-design/react-native/lib/list'
import { Text } from 'react-native';

export default function DatePickerBottom(){
    const [expiration, setExpiration] = useState();

    return(
        <Provider>
        <List>
        <DatePicker
          value={expiration}
          mode="date"
          title="Selecione"
          locale={{
            okText: 'Ok',
            dismissText: 'Cancelar',
            DatePickerLocale: {
              day: ' dia',
              year: ' mês',
              month: '',
              am: '',
              pm: '',
              hour: '',
              minute: '',
            },
          }}
          defaultDate={new Date()}
          minDate={new Date()}
          maxDate={new Date(2026, 11, 3)}
          onChange={(e: any) => setExpiration(e)}
          // renderMaskTop={() => { return (<View style={{backgroundColor: '#fff', height: 50}}>
          //   <Text>Teste aaaaa</Text>
          // </View>)}}
          styles={{
            header: {
              backgroundColor: '#00264B',
              opacity: 0.2,
            },
            title: {
              color: '#000',
            },
            okText: {
              color: '#000',
            },
            dismissText: {
              color: 'red',
            },
          }}
          format="DD-MM-YYYY">
          <List.Item
            style={{
              width: '100%',
              borderColor: '#DADADA',
              borderWidth: 1,
              height: 47,
              padding: 10,
              borderRadius: 5,
              marginVertical: 5,
              marginHorizontal: 20,
              flexDirection: 'row',
              // justifyContent: 'space-between',
              // fontFamily: 'Lato_400Regular',
              // fontSize: 18,
            }}
          ><Text>Selecione a Data</Text>
          {/* <MaterialIcons name="date-range" size={24} color="black" /> */}
          </List.Item>
        </DatePicker>
        </List>
      </Provider>
    )
}