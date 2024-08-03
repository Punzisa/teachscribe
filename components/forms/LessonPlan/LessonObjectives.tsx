import { useState } from 'react'
import { View, Text } from 'react-native'

import TextInputField from '@/components/forms/LessonPlan/TextInputField'

export default function LessonObjectives() {
  const [currentLessonObjective, setCurrentLessonObjective] = useState<string | null>(null)
  const [lessonObjectives, setLessonObjectives] = useState<string[]>([])

  const updateLessonObjectives = () => {
    if (currentLessonObjective !== null) {
      setLessonObjectives([...lessonObjectives, currentLessonObjective])
      console.log(lessonObjectives)
    }
  }

  return (
    <View>
      <Text>{lessonObjectives}</Text>
      <TextInputField
        placeholder={'Lesson Objective'}
        icon="checkmark"
        onInputChange={(lessonObjective: string) => setCurrentLessonObjective(lessonObjective)}
        onIconClick={() => updateLessonObjectives()}
      />
    </View>
  )
}
