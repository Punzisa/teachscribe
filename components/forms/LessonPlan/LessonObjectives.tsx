import { useState } from 'react'
import { View, StyleSheet } from 'react-native'

import TextInputField from '@/components/forms/LessonPlan/TextInputField'
import LessonObjectivesList from '../LessonObjectives/LessonObjectivesList'
import { LessonData } from './LessonPlan'

interface LessonObjectivesProps {
  lessonData: {
    objectives: string[]
  }
  updateLessonData: (newData: Partial<LessonData>) => void
}

const LessonObjectives: React.FC<LessonObjectivesProps> = ({ lessonData, updateLessonData }) => {
  const [textValue, setTextValue] = useState<string>('')

  const [newObjective, setNewObjective] = useState('')

  const addObjective = () => {
    if (newObjective.trim()) {
      updateLessonData({ objectives: [...lessonData.objectives, newObjective.trim()] })
      setNewObjective('')
    }
  }

  const handleEditObjective = (objective: string) => {
    handleDeleteObjective(objective)
    setTextValue(objective)
  }

  const handleDeleteObjective = (objectiveToDelete: string) => {
    const updatedObjectives = lessonData.objectives.filter(
      (objective) => objective !== objectiveToDelete
    )
    updateLessonData({ objectives: updatedObjectives })
  }

  return (
    <View>
      <TextInputField
        placeholder={'Lesson Objective'}
        icon="checkmark"
        onInputChange={(newObjective: string) => setNewObjective(newObjective)}
        onIconClick={() => addObjective()}
        setTextValue={textValue}
        multiline
      />
      <View style={styles.lessonObjectivesList}>
        <LessonObjectivesList
          lessonObjectives={lessonData.objectives}
          onEdit={handleEditObjective}
          onDelete={handleDeleteObjective}
        />
      </View>
    </View>
  )
}

export default LessonObjectives

const styles = StyleSheet.create({
  lessonObjectivesList: {
    marginTop: 20,
  },
})
