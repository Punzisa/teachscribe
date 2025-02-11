import { View, StyleSheet } from 'react-native'

import TextInputField from '@/components/forms/LessonPlan/TextInputField'
import { LessonData } from './LessonPlan'

type Activities = {
  teachingAids: string
  teachingActivities: string
  pupilActivities: string
}

export type ActivitiesType = {
  teachingAids: string
  teachingActivities: string
  pupilActivities: string
}
interface EvaluationProps {
  lessonData: LessonData
  updateLessonData: (newData: Partial<LessonData>) => void
}

const Evaluation: React.FC<EvaluationProps> = ({ lessonData, updateLessonData }) => {
  const handleChange = (key: keyof Activities, value: string) => {
    updateLessonData({
      activities: {
        ...lessonData.activities,
        [key]: value,
      },
    })
  }

  return (
    <View style={styles.container}>
      <TextInputField
        setTextValue={lessonData.evidenceOfAttainment}
        placeholder={'Evidence of Attainment'}
        onInputChange={(text: string) => updateLessonData({ evidenceOfAttainment: text })}
        multiline
      />
      <TextInputField
        setTextValue={lessonData.rationale}
        placeholder={'Rationale'}
        onInputChange={(text: string) => updateLessonData({ rationale: text })}
        multiline
      />
      <TextInputField
        setTextValue={lessonData.teacherEvaluation}
        placeholder={'Teacher Evaluation'}
        onInputChange={(text: string) => updateLessonData({ teacherEvaluation: text })}
        multiline
      />
      <TextInputField
        setTextValue={lessonData.pupilEvaluation}
        placeholder={'Pupil Evaluation'}
        onInputChange={(text: string) => updateLessonData({ pupilEvaluation: text })}
        multiline
      />
    </View>
  )
}

export default Evaluation

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
})
