import { useEffect } from 'react'
import AppButton from '@/components/Button'
import FormField from '@/components/forms/FormField'
import SocialLoginButtons from '@/components/SocialLoginButtons'
import { socialLoginIcon } from '@/constants/Colors'
import { StyledText, StyledView } from '@/constants/nativewindWrapper'
import { yupResolver } from '@hookform/resolvers/yup'
import { router } from 'expo-router'
import React from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { GestureResponderEvent } from 'react-native'
import * as yup from 'yup'

type FormValues = {
  email: string
  password: string
  confirmPassword?: string
}

interface AuthFormProps {
  title: string
  onSubmit: (data: FormValues) => void
  isSignUp: boolean
  schema: yup.AnyObjectSchema
  onCredentialsChange?: (data: { email: string; password: string }) => void
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  onSubmit,
  isSignUp,
  schema,
  onCredentialsChange,
}) => {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  })

  const email = useWatch({ control, name: 'email' })
  const password = useWatch({ control, name: 'password' })

  useEffect(() => {
    if (onCredentialsChange) {
      onCredentialsChange({ email, password })
    }
  }, [email, password, onCredentialsChange])

  const handleSocialSign = (event: GestureResponderEvent) => {
    console.log(`Sign in with ${event}`)

    router.replace('/(tabs)')
  }
  return (
    <StyledView className=" flex-1 justify-start items-center px-2 mt-8 android:mt-4">
      <StyledText className="text-2xl font-bold text-center mb-4">{title}</StyledText>
      <FormField
        className="w-full"
        control={control}
        name="email"
        placeholder="enter email address"
        icon={'email'}
      />
      <FormField
        control={control}
        name="password"
        placeholder="enter password"
        icon={'lock'}
        secureTextEntry
      />
      {isSignUp && (
        <FormField
          control={control}
          name="confirmPassword"
          placeholder="confirm password"
          icon={'lock'}
          secureTextEntry
        />
      )}

      {!isSignUp && (
        <StyledText
          onPress={() => router.push('/(auth)/forgot-password')}
          className="text-right mt-4 mb-1 android:mb-[2px] pr-4 ">
          {' '}
          Forgot your password?
        </StyledText>
      )}

      <AppButton onPress={handleSubmit(onSubmit)}>{title}</AppButton>
      <StyledText className="text-center mt-4 mb-2">Or sign in with</StyledText>
      <SocialLoginButtons
        onPress={handleSocialSign}
        title={`Sign in with`}
        socialLoginIcon={socialLoginIcon}
      />
    </StyledView>
  )
}

export default AuthForm
