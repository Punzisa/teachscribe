import { Stack } from 'expo-router'
import React from 'react'

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="view_schemes_of_work"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="schemes_of_work"
        options={{
          headerShown: true,
          headerTitle: 'Schemes of Work',
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="create_schemes_of_work"
        options={{
          headerShown: true,
          headerTitle: 'Create Schemes of Work',
          headerBackVisible: true,
        }}
      />
    </Stack>
  )
}

export default Layout
