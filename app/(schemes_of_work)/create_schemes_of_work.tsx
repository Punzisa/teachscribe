import { SafeAreaView } from 'react-native-safe-area-context'
import CreateSchemesOfWork from '@/components/forms/SchemesOfWork/CreatePage/CreateSchemesOfWork'
export default function ViewLessonPlan() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CreateSchemesOfWork />
    </SafeAreaView>
  )
}
