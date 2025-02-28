import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Slot, useRouter, useSegments } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-reanimated'
import { tokenCache } from '@/cache'
import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo'
import { secureStore } from '@clerk/clerk-expo/secure-store'
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded) return

    const inTabsGroup = segments[0] === '(auth)'

    console.log('User changed: ', isSignedIn)
    console.log('In auth group: ', inTabsGroup)

    if (isSignedIn && !inTabsGroup) {
      router.replace('/(tabs)')
    } else if (!isSignedIn) {
      router.replace('/(auth)')
    }
  }, [isSignedIn, isLoaded])

  return <Slot />
}

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

  if (!publishableKey) {
    throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
  }
  const [loaded] = useFonts({
    'Poppins-Black': require('../assets/fonts/Poppins-Black.otf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.otf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.otf'),
    'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.otf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.otf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.otf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.otf'),
    'Poppins-Thin': require('../assets/fonts/Poppins-Thin.otf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={publishableKey}
      standardBrowser={false}
      __experimental_resourceCache={secureStore}>
      <ClerkLoaded>
        <ThemeProvider value={DefaultTheme}>
          <GestureHandlerRootView>
            <InitialLayout />
          </GestureHandlerRootView>
        </ThemeProvider>
      </ClerkLoaded>
    </ClerkProvider>
  )
}
