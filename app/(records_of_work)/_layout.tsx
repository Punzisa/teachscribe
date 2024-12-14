import { Stack } from 'expo-router'
import React from 'react'

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="view_records_of_work"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="records_of_work"
        options={{
          headerShown: true,
          headerTitle: 'Records of Work',
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="create_records_of_work"
        options={{
          headerShown: true,
          headerTitle: 'Create Records of Work',
          headerBackVisible: true,
        }}
      />
    </Stack>
  )
}

export default Layout
