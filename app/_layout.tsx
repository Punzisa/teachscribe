import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-reanimated'
import { tokenCache } from '@/cache'
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

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
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey} standardBrowser={false}>
      <ClerkLoaded>
        <ThemeProvider value={DefaultTheme}>
          <GestureHandlerRootView>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(lesson)" options={{ headerShown: false }} />
              <Stack.Screen name="(schemes_of_work)" options={{ headerShown: false }} />
              <Stack.Screen name="(records_of_work)" options={{ headerShown: false }} />

              <Stack.Screen name="(homework_sheets)" options={{ headerShown: false }} />

              <Stack.Screen
                name="(profile)"
                options={{
                  headerShown: true,
                  headerTitle: 'Profile',
                  headerBackVisible: true,
                }}
              />
              <Stack.Screen name="+not-found" />
            </Stack>
          </GestureHandlerRootView>
        </ThemeProvider>
      </ClerkLoaded>
    </ClerkProvider>
  )
}
