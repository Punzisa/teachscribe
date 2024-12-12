import { SafeAreaView } from 'react-native-safe-area-context'
import SchemesOfWork from '@/components/forms/SchemesOfWork/ViewPage/SchemesOfWork'
export default function Page() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SchemesOfWork />
    </SafeAreaView>
  )
}
