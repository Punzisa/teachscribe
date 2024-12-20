import { SafeAreaView } from 'react-native-safe-area-context'
import ViewSOW from '@/components/forms/SchemesOfWork/ViewPage/ViewSOW'

export default function ViewLessonPlan() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ViewSOW />
    </SafeAreaView>
  )
}
