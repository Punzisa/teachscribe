import LessonPlans from '@/components/LessonsPage/lessonPlans'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function LessonPlan() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LessonPlans />
    </SafeAreaView>
  )
}
