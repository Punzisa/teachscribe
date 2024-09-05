import { ScrollView } from 'react-native'

import { useSession } from '@/context/auth'
import { Text, View } from 'react-native-ui-lib'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import Greeting from '@/components/HomePage/Greeting'
import UpcomingLessons from '@/components/HomePage/UpcomingLessons'
import GetStarted from '@/components/HomePage/GetStarted/GetStarted'

export default function HomeScreen() {
  const { signOut } = useSession()
  const { bottom } = useSafeAreaInsets()

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
