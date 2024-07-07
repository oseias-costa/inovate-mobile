import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ButtonAnt from '@ant-design/react-native/lib/button';
import DatePickerView from '@ant-design/react-native/lib/date-picker-view';

const renderBackdrop = (props: any) => (
  <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />
);

type SelectDateProps = {
  dateValue: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  placeholder: string;
};

export function SelectDate({ dateValue, setDate, placeholder }: SelectDateProps) {
  const ref = useRef<BottomSheet>(null);
  const snapPoins = useMemo(() => ['64%'],[])
  const [localDate, setLocalDate] = useState<Date | undefined>(dateValue)
  const [showDate, setShowDate] = useState('')
  
  const includeZero = (num: number) => num < 10 ?  `0${num}` : num
  useEffect(() => {
      if(dateValue){
          const date = new Date(dateValue)
          const day = includeZero(date.getDate())
          const month = includeZero(date.getMonth() + 1)
          const year = date.getFullYear()
          const format = `${day}-${month}-${year}`
          return setShowDate(format)
        }
    },[dateValue])

  const handleClose = () => {
    setDate(localDate)
    ref.current?.close()
};
  
  return (
    <>
      <TouchableOpacity style={styles.button} onPress={() => ref.current?.expand()}>
        <Text numberOfLines={1} style={styles.textButton}>
          {showDate?  showDate : placeholder }
        </Text>
        <MaterialIcons name="date-range" size={24} color="#7B8A92" />
      </TouchableOpacity>
      <BottomSheet
        onClose={handleClose}
        snapPoints={snapPoins}
        index={-1}
        ref={ref}
        enableOverDrag={true}
        handleStyle={{
          borderTopEndRadius: 5,
          borderTopStartRadius: 5,
        }}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: '#fff' }}>
        <View style={{ height: 100 }}>
          <View style={styles.boxTop}>
            <Text style={styles.boxTopText}>Ano</Text>
            <Text style={styles.boxTopText}>Mês</Text>
            <Text style={styles.boxTopText}>Dia</Text>
          </View>
          <DatePickerView
            value={localDate}
            locale={{
              day: ' ',
              year: ' ',
              month: '',
            }}
            itemStyle={styles.dateValue}
            onChange={(val: Date) => {
              setLocalDate(val);
              console.log('onChange', val);
            }}
          />
          <ButtonAnt type="primary" style={styles.buttonClose} onPress={handleClose}>
            Selecionar
          </ButtonAnt>
        </View>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: '#DADADA',
    borderWidth: 1,
    height: 47,
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textButton: {
    color: '#363636',
    fontFamily: 'Lato_400Regular',
    fontSize: 18,
  },
  boxTop: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 10,
  },
  boxTopText: {
    textAlign: 'center',
    color: '#928787',
    fontFamily: 'Lato_700Bold',
    fontSize: 18,
  },
  dateValue: {
    fontFamily: 'Lato_400Regular',
    fontSize: 20,
    color: '#363636',
  },
  buttonClose: {
    marginHorizontal: 20,
    marginTop: 15,
  },
});
