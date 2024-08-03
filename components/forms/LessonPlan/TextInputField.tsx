import { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { lightGrey } from '@/constants/Colors'

const TextInputField = ({ icon = null, placeholder = 'Lesson Name', ...props }) => {
  const [text, setText] = useState('')
  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        placeholder={placeholder}
        onChangeText={(v) => setText(v)}
        style={styles.input}
        {...props}
      />
      {icon !== null && (
        <TouchableOpacity style={styles.icon}>
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
    marginLeft: 7,
  },
  input: {
    flex: 1,
    height: 50,
    padding: 10,
  },
})

export default TextInputField
