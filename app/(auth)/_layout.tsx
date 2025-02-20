import { Stack } from 'expo-router'

const AuthLayOut = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="sign-in"
        options={{
          headerBackVisible: true,
          headerBackTitle: 'Back',
          headerTitle: '',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          headerBackVisible: true,
          headerBackTitle: 'Back',
          headerTitle: '',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="setup-profile"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )
}

export default AuthLayOut
