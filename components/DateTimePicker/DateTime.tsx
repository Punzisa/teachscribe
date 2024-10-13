import { useState } from 'react'
import { View, Text, Platform, StyleSheet, TouchableOpacity } from 'react-native'

import { lightGrey } from '@/constants/Colors'

import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'

type AndroidMode = 'date' | 'time'

type Props = {
  onInputChange: (value: Date) => void
  setDateValue: Date
}

const DateTime = ({ onInputChange, setDateValue }: Props) => {
  const [date, setDate] = useState<Date>(setDateValue)

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate !== undefined) {
      const currentDate = selectedDate
      onInputChange(currentDate)
      setDate(currentDate)
    }
  }

  const showPicker = (currentMode: AndroidMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    })
  }

  const showDatepicker = () => showPicker('date')
  const showTimepicker = () => showPicker('time')

  return (
    <>
      {Platform.OS === 'android' ? (
        <>
          <View style={styles.dateTimeContainer}>
            <Text style={styles.dateTimeTitle}>Date:</Text>
            <TouchableOpacity style={styles.androidButton} onPress={showDatepicker}>
              <Text style={styles.androidButtonTextStyle}>{date.toDateString()}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dateTimeContainer}>
            <Text style={styles.dateTimeTitle}>Start time:</Text>
            <TouchableOpacity style={styles.androidButton} onPress={showTimepicker}>
              <Text style={styles.androidButtonTextStyle}>{date.toLocaleTimeString()}</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View>
          <View style={styles.dateTimeContainer}>
            <Text style={styles.dateTimeTitle}>Date:</Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'date'}
              is24Hour={true}
              onChange={onChange}
            />
          </View>
          <View style={styles.dateTimeContainer}>
            <Text style={styles.dateTimeTitle}>Start Time:</Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'time'}
              is24Hour={true}
              onChange={onChange}
            />
          </View>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  androidButtonTextStyle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'semibold',
  },
  androidButton: {
    backgroundColor: lightGrey,
    padding: 10,
    borderRadius: 5,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  dateTimeTitle: {
    fontSize: 16,
  },
})

export default DateTime
