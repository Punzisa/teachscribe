import { SafeAreaView } from 'react-native-safe-area-context'

import LessonPlan from '@/components/forms/LessonPlan/LessonPlan'

export default function ViewLessonPlan() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LessonPlan />
    </SafeAreaView>
  )
}
