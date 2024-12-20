import { SafeAreaView } from 'react-native-safe-area-context'
import CreateRecordsOfWork from '@/components/forms/RecordsOfWork/CreatePage/CreateRecordsOfWork'
export default function ViewLessonPlan() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CreateRecordsOfWork />
    </SafeAreaView>
  )
}
