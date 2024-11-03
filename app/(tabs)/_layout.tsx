import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { useSession } from '@/context/auth'
import { Redirect, Tabs } from 'expo-router'
import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { primary } from '@/constants/Colors'
import FabGroup from '@/components/HomePage/FabGroup'

export default function TabLayout() {
  const { session, isLoading } = useSession()

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
  const iosTabBarHeight = 70
  const androidTabBarHeight = 60
  const androidTabBarPadding = 10
  const iosTabBarPadding = 20

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: primary,
          tabBarInactiveTintColor: primary,
          headerShown: false,
          tabBarStyle: {
            height: Platform.OS === 'ios' ? iosTabBarHeight : androidTabBarHeight,
            paddingBottom: Platform.OS === 'ios' ? iosTabBarPadding : androidTabBarPadding,
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
          name="lesson_plan"
          options={{
            title: 'Add Lesson Plan',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon name={focused ? 'add-circle' : 'add-circle-outline'} color={primary} />
            ),
          }}
        />
      </Tabs>

      <View
        style={[
          styles.fabContainer,
          {
            bottom: Platform.OS === 'ios' ? iosTabBarHeight / 2 : androidTabBarHeight / 2,
            paddingBottom: Platform.OS === 'ios' ? iosTabBarPadding / 2 : androidTabBarPadding / 2,
          },
        ]}>
        <FabGroup />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
  },
})
