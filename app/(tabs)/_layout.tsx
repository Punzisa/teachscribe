import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { useSession } from '@/context/auth'
import { Redirect, Tabs, usePathname } from 'expo-router'
import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { primary } from '@/constants/Colors'
import FabGroup from '@/components/HomePage/FabGroup'
import { tabBarHeightAndPadding } from '@/constants/TabBarHeightAndPadding'

export default function TabLayout() {
  const { session, isLoading } = useSession()
  const pathname = usePathname()

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />
  }

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: primary,
          tabBarInactiveTintColor: primary,
          headerShown: false,
          tabBarStyle: {
            height:
              Platform.OS === 'ios'
                ? tabBarHeightAndPadding.iosTabBarHeight
                : tabBarHeightAndPadding.androidTabBarHeight,
            paddingBottom:
              Platform.OS === 'ios'
                ? tabBarHeightAndPadding.iosTabBarPadding
                : tabBarHeightAndPadding.androidTabBarPadding,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={primary} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon name={focused ? 'person' : 'person-outline'} color={primary} />
            ),
          }}
        />
      </Tabs>
      {pathname === '/' && (
        <View
          style={[
            styles.fabContainer,
            {
              bottom:
                Platform.OS === 'ios'
                  ? tabBarHeightAndPadding.iosTabBarHeight
                  : tabBarHeightAndPadding.androidTabBarHeight,
              paddingBottom:
                Platform.OS === 'ios'
                  ? tabBarHeightAndPadding.iosTabBarPadding
                  : tabBarHeightAndPadding.androidTabBarPadding,
            },
          ]}>
          <FabGroup />
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    right: 20,
    zIndex: 1,
  },
})
