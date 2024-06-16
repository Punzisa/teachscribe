// SignInScreen.tsx
import React from 'react'
import { GestureResponderEvent } from 'react-native'
import { useSession } from '@/context/auth'
import { router } from 'expo-router'
import AuthScreen from '@/components/AuthScreen'
import { socialLoginIcon } from '@/constants/Colors'

const SignInScreen = () => {
  const { signIn } = useSession()

  const handleSubmit = (event: GestureResponderEvent) => {
    console.log(`Sign in with ${event}`)

    signIn()
    router.replace('/(tabs)')
  }

  const handleEmailSignUp = (key: string) => {
    //TODO: Add your sign in with email logic here
    console.log(`Sign in with ${key} clicked`)
    router.push('/sign-up')
  }

  return (
    <AuthScreen
      title="Sign up with"
      handleSubmit={handleSubmit}
      handleEmailSignIn={handleEmailSignUp}
      socialLoginIcon={socialLoginIcon}
      link="/sign-in"
      linkText="Sign in"
    />
  )
}

export default SignInScreen
