import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Profile from '@/components/ProfilePage/Profile'
const Index = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Profile
        salutation="Mr."
        firstName="John"
        lastName="Doe"
        schoolName="Matero Secondary School"
      />
    </SafeAreaView>
  )
}

export default Index
