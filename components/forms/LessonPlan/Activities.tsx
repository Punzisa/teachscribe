import { useEffect, useState } from 'react'
import { View, StyleSheet, Alert } from 'react-native'

import TextInputField from '@/components/forms/LessonPlan/TextInputField'

type Activities = {
  teachingAids: string
  teachingActivities: string
  pupilActivities: string
}

export default function Activities() {
  const [activities, setActivities] = useState<Activities>({
    teachingAids: '',
    teachingActivities: '',
    pupilActivities: '',
  })

  const handleChange = (key: keyof Activities, value: string) => {
    setActivities((prevActivities) => ({
      ...prevActivities,
      [key]: value,
    }))
  }

  useEffect(() => {
    console.log('activities:', activities)
  }, [activities])

  return (
    <View style={styles.container}>
      <TextInputField
        placeholder={'Teaching Aids'}
        onInputChange={(teachingAids: string) => handleChange('teachingAids', teachingAids)}
        multiline
      />
      <TextInputField
        placeholder={'Teaching Activities'}
        onInputChange={(teachingActivities: string) =>
          handleChange('teachingActivities', teachingActivities)
        }
        multiline
      />
      <TextInputField
        placeholder={'Pupil Activities'}
        onInputChange={(pupilActivities: string) =>
          handleChange('pupilActivities', pupilActivities)
        }
        multiline
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
})
