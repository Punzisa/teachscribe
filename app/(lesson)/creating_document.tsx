import CircularProgress from '@/components/forms/LessonPlan/CircularProgress'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ViewLessonPlan() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CircularProgress />
    </SafeAreaView>
  )
}
