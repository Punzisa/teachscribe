import { View } from 'react-native'

import TextInputField from '@/components/forms/LessonPlan/TextInputField'
import TimeDuration from '@/components/TimePicker/TimeDuration'

export default function LessonDetails() {
  return (
    <View style={{ gap: 27 }}>
      <TextInputField />
      <TimeDuration />
    </View>
  )
}
