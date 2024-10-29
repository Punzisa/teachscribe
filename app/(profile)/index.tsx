import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Profile from '@/components/ProfilePage/Profile'
const Index = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Profile firstName="John" lastName="Doe" schoolName="Harvard University" />
    </SafeAreaView>
  )
}

export default Index
