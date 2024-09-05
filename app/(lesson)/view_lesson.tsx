import { SafeAreaView } from 'react-native-safe-area-context'

import ViewLesson from '@/components/viewLesson'

export default function ViewLessonPlan() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ViewLesson />
    </SafeAreaView>
  )
}
