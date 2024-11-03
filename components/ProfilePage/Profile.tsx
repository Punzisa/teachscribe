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
import { dataChangeSubject, saveData } from '@/context/storage'
import { tabBarHeightAndPadding } from '@/constants/TabBarHeightAndPadding'

export interface ProfileData {
  salutation: string
  firstName: string
  lastName: string
  schoolName: string
  phoneNumber: string
}

const Profile = () => {
  const [imageUri, setImageUri] = useState<string | null>(null)

  const { signOut } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [salutation, setSalutation] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [schoolName, setSchoolName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const editAvatar = () => {
    console.log('Edit button pressed')
    pickImage()
  }

  const loadProfile = () => {
    AsyncStorage.getItem('profile')
      .then((profileString) => {
        if (profileString) {
          const profileData = JSON.parse(profileString)
          setSalutation(profileData.salutation)
          setFirstName(profileData.firstName)
          setLastName(profileData.lastName)
          setSchoolName(profileData.schoolName)
          setPhoneNumber(profileData.phoneNumber)
        }
      })
      .catch((error) => {
        console.error('Error loading profile:', error)
      })
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
    loadSavedImage()
    loadProfile()
  }, [])

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
    if (!firstName.trim() || !lastName.trim() || !schoolName.trim()) {
      Alert.alert('Error', 'Please fill in all required fields')
      return
    }

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
    saveData('profile', updatedData)
    dataChangeSubject.next('profile')

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
      style={[
        styles.container,
        {
          marginBottom:
            Platform.OS === 'ios'
              ? 0
              : tabBarHeightAndPadding.androidTabBarHeight / 2 +
                tabBarHeightAndPadding.androidTabBarPadding / 2,
        },
      ]}>
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
                setSalutation(salutation) // Add this
                setFirstName(firstName)
                setLastName(lastName)
                setSchoolName(schoolName)
                setPhoneNumber(phoneNumber)
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
    marginTop: 20,
    paddingHorizontal: 10,
  },
  scrollContainer: {
    alignItems: 'center',
    padding: 20,
  },
  fieldContainer: {
    width: '100%',
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
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
