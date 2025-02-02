import * as React from 'react'
import * as yup from 'yup'
import { useSignIn } from '@clerk/clerk-expo'

import AuthForm from '@/components/AuthForm'
import { useRouter } from 'expo-router'

type FormValues = {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

export default function SignIn() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleCredentialsChange = ({ email, password }: FormValues) => {
    setEmailAddress(email)
    setPassword(password)
  }

  const onSubmit = React.useCallback(
    async (data: FormValues) => {
      if (!isLoaded) return

      // Start the sign-in process using the email and password provided
      try {
        const signInAttempt = await signIn.create({
          identifier: data.email,
          password: data.password,
        })

        // If sign-in process is complete, set the created session as active
        // and redirect the user
        if (signInAttempt.status === 'complete') {
          await setActive({ session: signInAttempt.createdSessionId })
          router.replace('/(tabs)')
        } else {
          // If the status isn't complete, check why. User might need to
          // complete further steps.
          console.error(JSON.stringify(signInAttempt, null, 2))
        }
      } catch (err) {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(err, null, 2))
      }
    },
    [isLoaded, emailAddress, password]
  )

  return (
    <AuthForm
      schema={schema}
      title="Sign In"
      onSubmit={onSubmit}
      onCredentialsChange={handleCredentialsChange}
      isSignUp={false}
    />
  )
}
