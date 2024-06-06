import { useAuth } from '@clerk/clerk-expo'
import { Text, View } from 'react-native'

const SignOut = () => {
  const { isLoaded, signOut } = useAuth()
  if (!isLoaded) {
    return null
  }

  return (
    <View>
      <Text onPress={() => signOut()}>Sign Out</Text>
    </View>
  )
}

export default SignOut
