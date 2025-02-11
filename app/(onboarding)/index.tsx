import OnboardingScreen from '@/components/Onboarding/OnboardingScreen'
import { SafeAreaView } from 'react-native-safe-area-context'
export default function OnboardingLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OnboardingScreen />
    </SafeAreaView>
  )
}
