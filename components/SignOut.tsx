import { Text, View } from 'react-native'

const SignOut = () => {
  const handleSignOut = async () => {
    console.log('sign out')
  }

  return (
    <View>
      <Text onPress={handleSignOut}>Sign Out</Text>
    </View>
  )
}

export default SignOut
