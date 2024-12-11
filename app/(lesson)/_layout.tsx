import { Stack } from 'expo-router'
import React from 'react'

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="view_lesson"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="creating_document"
        options={{
          headerShown: true,
          headerTitle: 'Creating Document',
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="lesson_plan"
        options={{
          headerShown: true,
          headerTitle: 'Create Lesson Plan',
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="lesson_plans"
        options={{
          headerShown: true,
          headerTitle: 'Lesson Plans',
          headerBackVisible: true,
        }}
      />
    </Stack>
  )
}

export default Layout
