// AuthScreen.tsx
import AppButton from '@/components/Button'
import SocialLoginButtons from '@/components/SocialLoginButtons'
import { Link } from 'expo-router'
import React from 'react'
import { GestureResponderEvent, Text, TouchableOpacity, View } from 'react-native'

interface AuthScreenProps {
  uniqueKey?: string
  title: string
  handleSubmit: (event: GestureResponderEvent) => void
  handleEmailSignIn: (key: string) => void
  socialLoginIcon: any
  link: string
  linkText: string
}

const AuthScreen: React.FC<AuthScreenProps> = ({
  uniqueKey,
  title,
  handleSubmit,
  handleEmailSignIn,
  socialLoginIcon,
  link,
  linkText,
}) => {
  console.log(uniqueKey)
  return (
    <View className="flex flex-1 justify-center items-center px-2">
      <SocialLoginButtons title={title} onPress={handleSubmit} socialLoginIcon={socialLoginIcon} />

      <View className="flex flex-col items-center justify-center mt-4">
        <Text className="text-gray-500">Or</Text>
        <AppButton key={'signIn'} onPress={() => handleEmailSignIn('signIn')}>
          {title} with email
        </AppButton>
        <View className="flex flex-row justify-center items-center mt-4">
          <Text className="text-gray-500">
            {uniqueKey === 'home' ? 'Don’t have an account?' : 'Already have an account?'}
          </Text>
          <TouchableOpacity>
            <Link className="text-blue-500 ml-2" href={link}>
              {linkText}
            </Link>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex flex-row flex-wrap justify-center items-center mt-4">
        <Text className="text-gray-500">By signing in, you agree to our</Text>
        <Link className="text-blue-500 ml-2" href="https://www.google.com">
          Terms of Service
        </Link>
        <Text className="text-gray-500"> and</Text>
        <Link className="text-blue-500 ml-2" href="https://www.google.com">
          Privacy Policy
        </Link>
        <Text className="text-gray-500">,including</Text>
        <Link className="text-blue-500 ml-2" href="https://www.google.com">
          Cookie Use
        </Link>
        <Text className="text-gray-500">.</Text>
      </View>
    </View>
  )
}

export default AuthScreen
