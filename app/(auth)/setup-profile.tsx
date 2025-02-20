import SetupProfile from '@/components/ProfilePage/SetupProfile'
import * as React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SetupProfileLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SetupProfile />
    </SafeAreaView>
  )
}
