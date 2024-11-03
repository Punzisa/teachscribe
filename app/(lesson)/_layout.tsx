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
        name="creating_lesson"
        options={{
          headerShown: true,
          headerTitle: 'Creating Lesson',
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="lesson_plan"
        options={{
          headerShown: true,
          headerTitle: 'Create Lesson',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="lesson_plans"
        options={{
          headerShown: true,
          headerTitle: 'Lessons - Class',
          headerBackTitleVisible: false,
        }}
      />
    </Stack>
  )
}

export default Layout
