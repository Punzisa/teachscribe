import { Colors } from '@/constants/Colors'
import { StyledText, StyledView } from '@/constants/nativewindWrapper'
import React from 'react'
import { Image, Pressable } from 'react-native'

interface AppButtonProps extends React.ComponentProps<typeof Pressable> {
  children?: React.ReactNode
  color?: keyof typeof Colors
  styles?: object
  className?: string
  icon?: React.ReactNode
}

function AppButton({ children, onPress, icon, styles, ...rest }: AppButtonProps) {
  return (
    <Pressable
      className={`rounded-xl ios:bg-blue-600 android:bg-blue-500 ios:px-8 android:px-6 ios:py-3 android:py-2 my-2  justify-center items-center w-full mx-auto`}
      onPress={onPress}
      style={styles}
      {...rest}>
      <StyledView
        className={`flex flex-row justify-between items-center
     
      `}>
        {icon && <Image source={icon as any} className="w-5 h-5" />}
        <StyledText
          className={`text-white text-lg android:text-[16px] font-bold flex-1 text-center
          
          `}>
          {children}
        </StyledText>
      </StyledView>
    </Pressable>
  )
}

export default AppButton
