import { Link } from 'expo-router'
import { Text, View } from 'react-native'

export default function SignUp() {
  return (
    <View>
      {/* TODO: add social login here as well */}
      <Text>SignUp</Text>
      {/* Already have an sign in here */}
      <View className="flex flex-row">
        <Text>Already have an account? </Text>
        <Link href="/auth" className="text-blue-500 hover:underline">
          Sign in
        </Link>
      </View>
    </View>
  )
}
