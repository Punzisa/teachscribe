import AppButton from '@/components/Button'
import { Link } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

import React from 'react'

const index = () => {
  const handleSubmit = () => {
    console.log('submit')
  }
  return (
    <>
      <View className="flex flex-1 justify-center items-center px-2">
        <AppButton icon={require('../../assets/google.png')} onPress={handleSubmit}>
          Sign in with Google
        </AppButton>

        <AppButton icon={require('../../assets/facebook.png')} onPress={handleSubmit}>
          Sign in with Facebook
        </AppButton>

        <AppButton icon={require('../../assets/microsoft.png')} onPress={handleSubmit}>
          Sign in with Microsoft
        </AppButton>

        <View className="flex flex-col items-center justify-center mt-4">
          <Text className="text-gray-500">Or</Text>
          {/* TODO: Add functionality for email sign in */}
          <AppButton onPress={handleSubmit}>Sign in with email</AppButton>
          <View className="flex flex-row justify-center items-center mt-4">
            <Text className="text-gray-500">Don't have an account?</Text>
            <TouchableOpacity>
              {/* 
              TODO: Add functionality for sign up
              */}
              <Link className="text-blue-500 ml-2" href="/auth/sign-up">
                Sign up
              </Link>
            </TouchableOpacity>
          </View>
          {/*  Terms of Service and Privacy Policy, including Cookie Use. */}
        </View>
        <View className="flex flex-row flex-wrap justify-center items-center mt-4">
          <Text className="text-gray-500">By signing in, you agree to our</Text>
          <Link className="text-blue-500 ml-2" href="/auth/terms">
            Terms of Service
          </Link>
          <Text className="text-gray-500"> and</Text>
          <Link className="text-blue-500 ml-2" href="/auth/privacy">
            Privacy Policy
          </Link>
          <Text className="text-gray-500">,including</Text>
          <Link className="text-blue-500 ml-2" href="/auth/cookie">
            Cookie Use
          </Link>
          <Text className="text-gray-500">.</Text>
        </View>
      </View>
    </>
  )
}

export default index
