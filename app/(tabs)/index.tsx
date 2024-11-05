import { Platform, ScrollView } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import Greeting from '@/components/HomePage/Greeting'
import UpcomingLessons from '@/components/HomePage/UpcomingLessons'
import GetStarted from '@/components/HomePage/GetStarted/GetStarted'
import { useEffect } from 'react'
import { initialiseData, loadData, saveData } from '@/context/storage'
import { useLocalSearchParams } from 'expo-router'
import { tabBarHeightAndPadding } from '@/constants/TabBarHeightAndPadding'

export default function HomeScreen() {
  const { reload } = useLocalSearchParams()
  const runOnce = async () => {
    try {
      if (reload !== undefined && reload === '0') return
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
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom:
            Platform.OS === 'ios'
              ? tabBarHeightAndPadding.iosTabBarHeight * 3 +
                tabBarHeightAndPadding.iosTabBarPadding * 2
              : tabBarHeightAndPadding.androidTabBarHeight * 4 +
                tabBarHeightAndPadding.androidTabBarPadding * 3,
        }}>
        <GetStarted />
        <UpcomingLessons />
      </ScrollView>
    </SafeAreaView>
  )
}
