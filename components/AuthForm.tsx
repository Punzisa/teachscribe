import { useEffect } from 'react'
import AppButton from '@/components/Button'
import FormField from '@/components/forms/FormField'
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import { yupResolver } from '@hookform/resolvers/yup'
import { router } from 'expo-router'
import React from 'react'
import { useForm, useWatch } from 'react-hook-form'
import * as yup from 'yup'
import { Colors } from '@/constants/Colors'

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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>
          {isSignUp
            ? 'Create an account to get started'
            : 'Welcome back! Please sign in to continue'}
        </Text>
      </View>

      <View style={styles.formContainer}>
        <FormField
          control={control}
          name="email"
          placeholder="Email address"
          icon={'email'}
          error={errors.email?.message}
        />

        <FormField
          control={control}
          name="password"
          placeholder="Password"
          icon={'lock'}
          secureTextEntry
          error={errors.password?.message}
        />

        {isSignUp && (
          <FormField
            control={control}
            name="confirmPassword"
            placeholder="Confirm password"
            icon={'lock'}
            secureTextEntry
            error={errors.confirmPassword?.message}
          />
        )}

        {!isSignUp && (
          <Text
            onPress={() => router.push('/(auth)/forgot-password')}
            style={styles.forgotPassword}>
            Forgot your password?
          </Text>
        )}

        <AppButton onPress={handleSubmit(onSubmit)} style={styles.submitButton}>
          {isSignUp ? 'Create Account' : 'Sign In'}
        </AppButton>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 20 : 0,
  },
  headerContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  formContainer: {
    gap: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  forgotPassword: {
    color: Colors.primary,
    textAlign: 'right',
    fontSize: 14,
    marginTop: -8,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 16,
    marginTop: 8,
  },
})

export default AuthForm
