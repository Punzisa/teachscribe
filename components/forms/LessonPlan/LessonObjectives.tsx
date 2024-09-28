import { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'

import TextInputField from '@/components/forms/LessonPlan/TextInputField'
import LessonObjectivesList from '../LessonObjectives/LessonObjectivesList'

export default function LessonObjectives() {
  const [currentLessonObjective, setCurrentLessonObjective] = useState<string | null>(null)
  const [lessonObjectives, setLessonObjectives] = useState<string[]>([])
  const [textValue, setTextValue] = useState<string>('')

  const updateLessonObjectives = () => {
    if (currentLessonObjective !== null) {
      setLessonObjectives([...lessonObjectives, currentLessonObjective])
    }
  }

  useEffect(() => {
    console.log('lessonObjectives:', lessonObjectives)
  }, [lessonObjectives])

  const handleEditObjective = (objective: string) => {
    handleDeleteObjective(objective)
    setTextValue(objective)
  }

  const handleDeleteObjective = (objective: string) => {
    setLessonObjectives(lessonObjectives.filter((obj) => obj !== objective))
  }

  return (
    <View>
      <TextInputField
        placeholder={'Lesson Objective'}
        icon="checkmark"
        onInputChange={(lessonObjective: string) => setCurrentLessonObjective(lessonObjective)}
        onIconClick={() => updateLessonObjectives()}
        setTextValue={textValue}
      />
      <View style={styles.lessonObjectivesList}>
        <LessonObjectivesList
          lessonObjectives={lessonObjectives}
          onEdit={handleEditObjective}
          onDelete={handleDeleteObjective}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  lessonObjectivesList: {
    marginTop: 20,
  },
})
