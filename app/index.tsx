import { useAuth } from '@clerk/clerk-expo'
import { Redirect } from 'expo-router'

const StartPage = () => {
  const { isLoaded, isSignedIn } = useAuth()

  if (isSignedIn && isLoaded) {
    return <Redirect href="/(tabs)" />
  }

  return <Redirect href="/(auth)" />
}

export default StartPage
