import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Platform,
} from 'react-native'

interface Option {
  id: string
  label: string
}

interface ClassroomDropdownProps {
  options: Option[]
  placeholder: string
  onSelect: (value: string) => void
  style?: StyleProp<ViewStyle>
}

const ClassroomDropdown: React.FC<ClassroomDropdownProps> = ({
  options,
  placeholder,
  onSelect,
  style,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const toggleDropdown = () => {
    setIsVisible(!isVisible)
  }

  const selectOption = (option: string) => {
    setSelectedOption(option)
    onSelect(option)
    setIsVisible(false)
  }

  return (
    <View style={styles.container}>
      <View style={[styles.dropdown, styles.buttonShadow]}>
        <Text style={styles.dropdownText}>{selectedOption || placeholder}</Text>
        <TouchableOpacity onPress={toggleDropdown}>
          <Ionicons name={isVisible ? 'chevron-up' : 'chevron-down'} size={28} color={'black'} />
        </TouchableOpacity>
      </View>
      {isVisible && (
        <View style={styles.dropdownList}>
          <TouchableOpacity
            style={[styles.modal, styles.buttonShadow]}
            onPress={() => setIsVisible(false)}>
            {options.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => selectOption(item.label)}
                style={styles.option}>
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  dropdown: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 10,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  buttonShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  dropdownText: {
    fontSize: 18,
    color: '#333',
  },
  dropdownList: {
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 12,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 15,
  },
  option: {
    padding: 10,
  },
  optionText: {
    fontSize: 18,
  },
})

export default ClassroomDropdown
