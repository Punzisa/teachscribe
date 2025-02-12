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
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useAuth } from '@clerk/clerk-expo'
import { coolDownAsync } from 'expo-web-browser'

export interface ProfileData {
  salutation: string
  firstName: string
  lastName: string
  schoolName: string
  phoneNumber: string
}

const Profile = () => {
  const [imageUri, setImageUri] = useState<string | null>(null)

  const { signOut } = useAuth()
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

  const renderAvatar = () => {
    if (imageUri) {
      return (
        <Avatar
          source={{ uri: imageUri }}
          size={120}
          badgeProps={{
            onPress: editAvatar,
            size: 36,
            icon: icon,
            iconStyle: styles.badgeIcon,
            containerStyle: styles.badgeContainer,
          }}
          badgePosition="BOTTOM_RIGHT"
        />
      )
    }

    return (
      <View style={styles.placeholderAvatar}>
        <MaterialCommunityIcons name="account" size={60} color="white" />
        <TouchableOpacity style={styles.editAvatarButton} onPress={editAvatar}>
          <MaterialCommunityIcons name="camera" size={20} color="white" />
        </TouchableOpacity>
      </View>
    )
  }

  const renderField = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    icon: string
  ) => {
    return (
      <View style={styles.fieldContainer}>
        <View style={styles.labelContainer}>
          <Ionicons name={icon} size={20} color={Colors.primary} />
          <Text style={styles.label}>{label}</Text>
        </View>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={`Enter ${label.toLowerCase()}`}
            placeholderTextColor="#A0AEC0"
          />
        ) : (
          <Text style={styles.value}>{value || `No ${label.toLowerCase()} provided`}</Text>
        )}
      </View>
    )
  }

  const renderSalutation = () => {
    return (
      <View style={styles.fieldContainer}>
        <View style={styles.labelContainer}>
          <Ionicons name="person-outline" size={20} color={Colors.primary} />
          <Text style={styles.label}>Salutation</Text>
        </View>
        {isEditing ? (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={salutation}
              onValueChange={(itemValue) => setSalutation(itemValue)}
              style={styles.picker}>
              <Picker.Item label="Mr." value="Mr." />
              <Picker.Item label="Mrs." value="Mrs." />
              <Picker.Item label="Ms." value="Ms." />
            </Picker>
          </View>
        ) : (
          <Text style={styles.value}>{salutation || 'No salutation selected'}</Text>
        )}
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarContainer}>{renderAvatar()}</View>

        <View style={styles.formContainer}>
          {renderSalutation()}
          {renderField('First Name', firstName, setFirstName, 'person-outline')}
          {renderField('Last Name', lastName, setLastName, 'people-outline')}
          {renderField('School Name', schoolName, setSchoolName, 'school-outline')}
          {renderField('Phone Number', phoneNumber, setPhoneNumber, 'call-outline')}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, isEditing ? styles.saveButton : styles.editButton]}
            onPress={() => {
              if (isEditing) {
                handleSave()
              } else {
                setIsEditing(true)
              }
            }}>
            <Ionicons
              name={isEditing ? 'save-outline' : 'create-outline'}
              size={20}
              color="white"
            />
            <Text style={styles.buttonText}>{isEditing ? 'Save Changes' : 'Edit Profile'}</Text>
          </TouchableOpacity>

          {isEditing && (
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => {
                setIsEditing(false)
                loadProfile()
              }}>
              <Ionicons name="close-outline" size={20} color="white" />
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.signOutButton} onPress={signOutAlert}>
            <Ionicons name="log-out-outline" size={20} color={Colors.red} />
            <Text style={[styles.buttonText, { color: Colors.red }]}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#718096',
  },
  avatarContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  badgeIcon: {
    backgroundColor: Colors.primary,
  },
  badgeContainer: {
    padding: 36,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4A5568',
  },
  value: {
    fontSize: 16,
    color: '#2D3748',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
  },
  input: {
    fontSize: 16,
    color: '#2D3748',
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
  },
  pickerContainer: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    marginTop: 4,
  },
  picker: {
    height: 50,
  },
  buttonContainer: {
    padding: 16,
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 8,
    gap: 8,
  },
  editButton: {
    backgroundColor: Colors.primary,
  },
  saveButton: {
    backgroundColor: '#48BB78',
  },
  cancelButton: {
    backgroundColor: '#718096',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.red,
    padding: 14,
    borderRadius: 8,
    gap: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  placeholderAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})

export default Profile
