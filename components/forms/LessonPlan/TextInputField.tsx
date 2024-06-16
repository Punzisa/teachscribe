import { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { lightGrey } from '@/constants/Colors'

type Props = {
  icon: null | typeof Ionicons.defaultProps
  placeholder: string
  onInputChange?: (value: string) => void
  onIconClick?: (value: string) => void
}

const TextInputField = ({
  icon = null,
  placeholder = 'Lesson Name',
  onInputChange,
  onIconClick,
  ...props
}: Props) => {
  const [text, setText] = useState('')

  const onChangeText = (value: string) => {
    setText(value)
    if (onInputChange !== undefined && onInputChange !== null) {
      onInputChange(value)
    }
  }

  const onConfirm = () => {
    if (onIconClick !== undefined && onIconClick !== null) {
      onIconClick(text)
      setText('')
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        placeholder={placeholder}
        onChangeText={onChangeText}
        style={styles.input}
        {...props}
      />
      {icon !== null && (
        <TouchableOpacity style={styles.icon} onPress={() => onConfirm}>
          <Ionicons name={icon} size={22} color={lightGrey} />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  icon: {
    marginHorizontal: 7,
  },
  input: {
    flex: 1,
    height: 50,
    padding: 10,
  },
})

export default TextInputField
