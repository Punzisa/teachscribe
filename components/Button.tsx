import { Colors } from '@/constants/Colors'
import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'

interface AppButtonProps extends React.ComponentProps<typeof Pressable> {
  children: React.ReactNode
  onPress: () => void
  color?: keyof typeof Colors
  style?: object
  className?: string
  icon?: React.ReactNode
}

function AppButton({ children, onPress, icon }: AppButtonProps) {
  return (
    <Pressable
      className="rounded-xl bg-primary-800  px-8 py-3 mx-4 my-2 justify-center items-center"
      onPress={onPress}>
      <View className="flex flex-row justify-between items-center">
        {icon && <Image source={icon as any} className="w-5 h-5" />}
        <Text className="text-white text-lg font-bold flex-1 text-center">{children}</Text>
      </View>
    </Pressable>
  )
}

export default AppButton
