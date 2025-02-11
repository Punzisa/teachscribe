import { router } from 'expo-router'

import AuthScreen from '@/components/AuthScreen'
import { socialLoginIcon } from '@/constants/Colors'
import { useSession } from '@/context/auth'
import React from 'react'

const Index = () => {
  const handleEmailSignIn = (key: string) => {
    // Add your sign in with email logic here
    console.log(`Sign in with ${key} clicked`)
    router.push('/sign-in')
  }
  return (
    <>
      <AuthScreen
        uniqueKey="home"
        title="Sign in with"
        handleEmailSignIn={handleEmailSignIn}
        socialLoginIcon={socialLoginIcon}
        link="/(auth)/sign-up-options"
        linkText="Sign up"
      />
    </>
  )
}

export default Index
