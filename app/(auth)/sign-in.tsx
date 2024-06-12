import * as React from 'react'
import * as yup from 'yup'

import AuthForm from '@/components/AuthForm'
import { useSession } from '@/context/auth'
import { router } from 'expo-router'

type FormValues = {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

export default function SignIn() {
  const { signIn } = useSession()

  const onSubmit = (data: FormValues) => {
    console.log(data)
    signIn()
    router.replace('/(tabs)')
  }

  return <AuthForm schema={schema} title="Sign In" onSubmit={onSubmit} isSignUp={false} />
}
