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
interface ActivitiesProps {
  lessonData: {
    activities: ActivitiesType
  }
  updateLessonData: (newData: Partial<LessonData>) => void
}

const Activities: React.FC<ActivitiesProps> = ({ lessonData, updateLessonData }) => {
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
        setTextValue={lessonData.activities.teachingAids}
        placeholder={'Teaching Aids'}
        onInputChange={(teachingAids: string) => handleChange('teachingAids', teachingAids)}
        multiline
      />
      <TextInputField
        setTextValue={lessonData.activities.teachingActivities}
        placeholder={'Teaching Activities'}
        onInputChange={(teachingActivities: string) =>
          handleChange('teachingActivities', teachingActivities)
        }
        multiline
      />
      <TextInputField
        setTextValue={lessonData.activities.pupilActivities}
        placeholder={'Pupil Activities'}
        onInputChange={(pupilActivities: string) =>
          handleChange('pupilActivities', pupilActivities)
        }
        multiline
      />
    </View>
  )
}

export default Activities

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
})
