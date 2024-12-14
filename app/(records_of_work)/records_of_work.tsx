import { SafeAreaView } from 'react-native-safe-area-context'
import RecordsOfWork from '@/components/forms/RecordsOfWork/ViewPage/RecordsOfWork'
export default function Page() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RecordsOfWork />
    </SafeAreaView>
  )
}
