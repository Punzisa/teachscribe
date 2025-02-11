import { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { TimerPickerModal } from 'react-native-timer-picker'
import * as Haptics from 'expo-haptics'

import { Button } from 'react-native-ui-lib'
import { lightGrey } from '@/constants/Colors'

export const formatTime = ({
  hours,
  minutes,
  seconds,
}: {
  hours?: number
  minutes?: number
  seconds?: number
}) => {
  const timeParts = []

  if (hours !== undefined) {
    timeParts.push(hours.toString().padStart(2, '0'))
  }
  if (minutes !== undefined) {
    timeParts.push(minutes.toString().padStart(2, '0'))
  }
  if (seconds !== undefined) {
    timeParts.push(seconds.toString().padStart(2, '0'))
  }

  return timeParts.join(':')
}

function convertTimeDurationToHoursAndMinutes(timeDurationString: string): string {
  const [hours, minutes, seconds] = timeDurationString.split(':').map(Number)

  if (hours === 0 && minutes === 0 && seconds === 0) {
    return ''
  }
  if (hours === 0) {
    return `${minutes} minutes`
  } else if (hours === 1) {
    return `${hours} hour ${minutes} minutes`
  } else {
    return `${hours} hours ${minutes} minutes`
  }
}

type Props = {
  onInputChange?: (value: string) => void
  setTextValue?: string
}

const TimeDuration = ({ onInputChange, setTextValue }: Props) => {
  const [showPicker, setShowPicker] = useState(false)
  const [text, setText] = useState('')

  const handleConfirm = (value: string) => {
    if (onInputChange !== undefined && onInputChange !== null) {
      onInputChange(value)
    }
  }

  useEffect(() => {
    if (setTextValue !== undefined) {
      setText(setTextValue)
    }
  }, [setTextValue])

  return (
    <View>
      <View style={{ alignItems: 'center', backgroundColor: 'white' }}>
        <Button
          outline
          outlineColor={lightGrey}
          label={text === '' ? 'Lesson Duration' : ''}
          labelStyle={{ color: '#797979' }}
          borderRadius={7}
          style={{ height: 50, width: '100%', justifyContent: 'flex-start' }}
          onPress={() => setShowPicker(true)}>
          {text !== '' ? <Text>{text}</Text> : <Text />}
        </Button>
      </View>
      <TimerPickerModal
        visible={showPicker}
        setIsVisible={setShowPicker}
        onConfirm={(pickedDuration) => {
          const formattedTime = formatTime(pickedDuration)
          handleConfirm(convertTimeDurationToHoursAndMinutes(formattedTime))
          setShowPicker(false)
        }}
        modalTitle="Lesson Duration"
        onCancel={() => setShowPicker(false)}
        closeOnOverlayPress
        Haptics={Haptics}
        styles={{
          theme: 'light',
        }}
      />
    </View>
  )
}

export default TimeDuration
