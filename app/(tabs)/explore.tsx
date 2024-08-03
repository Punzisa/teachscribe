import { SafeAreaView } from 'react-native-safe-area-context'

import LessonPlan from '@/components/forms/LessonPlan/LessonPlan'
import { ThemedView } from '@/components/ThemedView'

export default function LessonPlanForm() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <LessonPlan />
      </SafeAreaView>
    </ThemedView>
  )
}
