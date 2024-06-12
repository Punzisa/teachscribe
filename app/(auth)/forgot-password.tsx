import AppButton from '@/components/Button'
import FormField from '@/components/forms/FormField'
import { router } from 'expo-router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, Text, View } from 'react-native'

const ForgotPasswordScreen = () => {
  const { control, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
    router.push('/(auth)/otp')
  }

  return (
    <View className="flex-1 justify-start items-center px-2 mt-8 android:mt-4">
      <Text style={styles.headerText}>Forgot Password</Text>
      <Text style={styles.subHeaderText}>
        Enter your email address to receive a password reset link
      </Text>
      <FormField
        control={control}
        name="email"
        placeholder="Enter your email"
        keyboardType="email-address"
      />
      <AppButton onPress={handleSubmit(onSubmit)}>Submit</AppButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#ff7f50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
})

export default ForgotPasswordScreen
