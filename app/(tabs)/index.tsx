import { ScrollView } from 'react-native'

import { useSession } from '@/context/auth'
import { Text, View } from 'react-native-ui-lib'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import Greeting from '@/components/HomePage/Greeting'
import UpcomingLessons from '@/components/HomePage/UpcomingLessons'
import GetStarted from '@/components/HomePage/GetStarted/GetStarted'
import { useEffect } from 'react'
import { initialiseData, loadData, saveData } from '@/context/storage'

export default function HomeScreen() {
  const { signOut } = useSession()
  const { bottom } = useSafeAreaInsets()

  const runOnce = async () => {
    try {
      const hasLaunched = await loadData('@has_launched')
      if (hasLaunched === null) {
        console.log('App launched for the first time!')
        initialiseData()

        saveData('@has_launched', 'true')
      } else {
        console.log('Welcome back!')
      }
    } catch (error) {
      console.error('Error checking launch status:', error)
    }
  }

  useEffect(() => {
    runOnce()
  }, [])

  return (
    <SafeAreaView>
      <Greeting />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: bottom + 200 }}>
        <UpcomingLessons />

        <GetStarted />

        <View>
          <Text
            onPress={() => {
              // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
              signOut()
            }}>
            Sign Out
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
