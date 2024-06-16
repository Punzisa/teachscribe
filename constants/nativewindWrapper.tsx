import { styled } from 'nativewind'
import { TextInput } from 'react-native-gesture-handler'
import { KeyboardAvoidingView, Text, View } from 'react-native'

export const StyledView = styled(View)
export const StyledText = styled(Text, 'text-xs android:text-[10px]')
export const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView)
export const StyledTextInput = styled(TextInput)
