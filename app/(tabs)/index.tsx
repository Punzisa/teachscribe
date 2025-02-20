import { Platform, ScrollView, View } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import Greeting from '@/components/HomePage/Greeting'
import UpcomingLessons from '@/components/HomePage/UpcomingLessons'
import GetStarted from '@/components/HomePage/GetStarted/GetStarted'
import { useEffect, useState } from 'react'
import { initialiseData, loadData, saveData } from '@/context/storage'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { tabBarHeightAndPadding } from '@/constants/TabBarHeightAndPadding'
import { useUser } from '@clerk/clerk-expo'
import { ActivityIndicator } from 'react-native-paper'
import { Colors } from '@/constants/Colors'

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

  const { user, isLoaded } = useUser()
  const [needsSetup, setNeedsSetup] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const router = useRouter()
  useEffect(() => {
    const checkSetup = async () => {
      if (isLoaded && user) {
        const signedUp = user.unsafeMetadata.signedUp
        if (signedUp === undefined) setNeedsSetup(true)
      }
      setIsChecking(false)
    }

    checkSetup()
  }, [isLoaded, user])

  useEffect(() => {
    if (!isChecking && needsSetup) {
      router.replace('/(auth)/setup-profile')
    }
  }, [router, needsSetup, router])

  if (isChecking) {
    return (
      <SafeAreaView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </SafeAreaView>
    )
  }
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
