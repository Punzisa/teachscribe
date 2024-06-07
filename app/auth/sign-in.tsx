import { Link } from 'expo-router'
import { Text, View } from 'react-native'

export default function SignInWiteEmail() {
  return (
    <View>
      <Text>Sign in here</Text>
      <Link href="/auth/sign-up" className="text-blue-500 hover:underline">
        Sign up
      </Link>
      <Link href="/auth/forgot-password" className="text-blue-500 hover:underline">
        Forgot password
      </Link>
    </View>
  )
}
