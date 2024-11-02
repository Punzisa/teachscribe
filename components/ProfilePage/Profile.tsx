import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { Avatar, TouchableOpacity } from 'react-native-ui-lib'
import icon from '@/assets/images/camera_icon.png'
import { Colors } from '@/constants/Colors'
import { useSession } from '@/context/auth'
import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { dataChangeSubject } from '@/context/storage'
import { containerStyles } from '../forms/LessonPlan/constants'

interface ProfileProps {
  salutation: string
  firstName: string
  lastName: string
  schoolName: string
  phoneNumber?: string
  avatarUrl?: string
  onSave?: (data: ProfileData) => void
}

interface ProfileData {
  salutation: string
  firstName: string
  lastName: string
  schoolName: string
  phoneNumber: string
}

const Profile: React.FC<ProfileProps> = ({
  salutation: initialSalutation = 'Mr.',
  firstName: initialFirstName,
  lastName: initialLastName,
  schoolName: initialSchoolName,
  phoneNumber: initialPhoneNumber = '',
  avatarUrl = 'https://i.pravatar.cc/300?img=51',
  onSave,
}) => {
  const [imageUri, setImageUri] = useState<string | null>(null)

  const { signOut } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [salutation, setSalutation] = useState(initialSalutation) // Add this
  const [firstName, setFirstName] = useState(initialFirstName)
  const [lastName, setLastName] = useState(initialLastName)
  const [schoolName, setSchoolName] = useState(initialSchoolName)
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber)

  const editAvatar = () => {
    console.log('Edit button pressed')
    pickImage()
  }

  const loadSavedImage = async () => {
    try {
      const savedImage = await AsyncStorage.getItem('profileImage')
      if (savedImage) {
        setImageUri(savedImage)
      }
    } catch (error) {
      console.error('Error loading image:', error)
    }
  }

  useEffect(() => {
    // Load saved image when component mounts
    loadSavedImage()
  }, [])

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    })

    console.log(result)

    if (!result.canceled) {
      const uri = result.assets[0].uri
      try {
        setImageUri(uri)

        await AsyncStorage.setItem('profileImage', uri)
        dataChangeSubject.next('profileImage')
      } catch (error) {
        console.error('Failed to save image', error)
      }
    }
  }

  const handleSave = () => {
    // Validate fields
    if (!firstName.trim() || !lastName.trim() || !schoolName.trim()) {
      Alert.alert('Error', 'Please fill in all required fields')
      return
    }

    // Phone number validation (optional)
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}$/
    if (phoneNumber && !phoneRegex.test(phoneNumber)) {
      Alert.alert('Error', 'Please enter a valid phone number')
      return
    }

    const updatedData = {
      salutation,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      schoolName: schoolName.trim(),
      phoneNumber: phoneNumber.trim(),
    }

    onSave?.(updatedData)
    setIsEditing(false)
  }

  const signOutAlert = () => {
    Alert.alert(
      'Confirm Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => signOut(),
          style: 'default',
        },
      ],
      { cancelable: true }
    )
  }

  const renderField = (label: string, value: string, onChangeText: (text: string) => void) => {
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>{label}:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={`Enter ${label.toLowerCase()}`}
          />
        ) : (
          <Text style={styles.value}>{value}</Text>
        )}
      </View>
    )
  }

  const renderSalutation = () => {
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Salutation:</Text>
        {isEditing ? (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={salutation}
              onValueChange={(itemValue) => setSalutation(itemValue)}
              style={styles.picker}
              mode="dropdown">
              <Picker.Item label="Mr." value="Mr." />
              <Picker.Item label="Mrs." value="Mrs." />
              <Picker.Item label="Ms." value="Ms." />
            </Picker>
          </View>
        ) : (
          <Text style={styles.value}>{salutation}</Text>
        )}
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <Avatar
          source={{ uri: imageUri! }}
          size={150}
          badgeProps={{
            onPress: editAvatar,
            size: 40,
            icon: icon,
            iconStyle: { backgroundColor: Colors.primary },
            containerStyle: {
              padding: 40,
            },
          }}
          badgePosition="BOTTOM_RIGHT"
        />
        {renderSalutation()}
        {renderField('First Name', firstName, setFirstName)}
        {renderField('Last Name', lastName, setLastName)}
        {renderField('School Name', schoolName, setSchoolName)}
        {renderField('Phone Number', phoneNumber, setPhoneNumber)}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: isEditing ? Colors.secondary : '#007AFF' }]}
            onPress={() => {
              if (isEditing) {
                handleSave()
              } else {
                setIsEditing(true)
              }
            }}>
            <Text style={styles.buttonText}>{isEditing ? 'Save Changes' : 'Edit Profile'}</Text>
          </TouchableOpacity>

          {isEditing && (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#666' }]}
              onPress={() => {
                setIsEditing(false)
                // Reset values to initial state
                setSalutation(initialSalutation) // Add this
                setFirstName(initialFirstName)
                setLastName(initialLastName)
                setSchoolName(initialSchoolName)
                setPhoneNumber(initialPhoneNumber)
              }}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.signOutButton} onPress={signOutAlert}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    alignItems: 'center',
    padding: 20,
  },
  fieldContainer: {
    width: '100%',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
    paddingVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
    gap: 10,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signOutButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: 'white',
    marginTop: 5,
  },
  picker: {
    width: '100%',
  },
})

export default Profile
