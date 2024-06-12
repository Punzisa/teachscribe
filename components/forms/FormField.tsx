import {
  StyledKeyboardAvoidingView,
  StyledText,
  StyledTextInput,
  StyledView,
} from '@/constants/nativewindWrapper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { FieldValues, useController } from 'react-hook-form'
import { Platform } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

interface FormInputFieldProps extends React.ComponentProps<typeof TextInput> {
  control: any
  name: string
  icon?: any
}

const FormInputField: React.FC<FormInputFieldProps> = ({ control, name, icon, ...rest }) => {
  const {
    field,
    formState: { errors },
  } = useController<FieldValues>({
    control,
    defaultValue: '',
    name,
  })

  return (
    <StyledView className={`w-full`}>
      <StyledKeyboardAvoidingView className="bg-slate-200 rounded-xl flex flex-row p-4 android:p-2 my-2 android:my-1">
        <StyledTextInput
          className="flex-1 bg-transparent text-black android:text-xs"
          value={field.value}
          onBlur={field.onBlur}
          onChangeText={field.onChange}
          textContentType="oneTimeCode"
          {...rest}
        />
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={Platform.OS === 'ios' ? 20 : 18}
            style={{ marginRight: 8 }}
          />
        )}
      </StyledKeyboardAvoidingView>
      <StyledText className="text-red-500 text-xs android:text-[10px] pl-2">
        {(errors[name]?.message !== undefined ? errors[name]?.message : '') as string}
      </StyledText>
    </StyledView>
  )
}

export default React.memo(FormInputField)
