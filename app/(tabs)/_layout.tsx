import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { useSession } from '@/context/auth'
import { Redirect, Tabs, usePathname } from 'expo-router'
import React from 'react'
import { Platform, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { primary } from '@/constants/Colors'
import FabGroup from '@/components/HomePage/FabGroup'
import { tabBarHeightAndPadding } from '@/constants/TabBarHeightAndPadding'

export default function TabLayout() {
  const { isLoading } = useSession()
  const pathname = usePathname()

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    )
  }

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: primary,
          tabBarInactiveTintColor: 'rgba(0, 0, 0, 0.5)',
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
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: 'rgba(0, 0, 0, 0.1)',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 10,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginBottom: Platform.OS === 'ios' ? 0 : 8,
          },
          tabBarIconStyle: {
            marginTop: Platform.OS === 'ios' ? 0 : 8,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                <TabBarIcon
                  name={focused ? 'home' : 'home-outline'}
                  color={focused ? primary : 'rgba(0, 0, 0, 0.5)'}
                  size={24}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                <TabBarIcon
                  name={focused ? 'person' : 'person-outline'}
                  color={focused ? primary : 'rgba(0, 0, 0, 0.5)'}
                  size={24}
                />
              </View>
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
                  ? tabBarHeightAndPadding.iosTabBarHeight + 10
                  : tabBarHeightAndPadding.androidTabBarHeight + 10,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: primary,
    fontWeight: '600',
  },
  fabContainer: {
    position: 'absolute',
    right: 20,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 5 : 0,
  },
})
