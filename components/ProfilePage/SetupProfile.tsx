import React, { useState } from 'react'
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
import { TouchableOpacity } from 'react-native-ui-lib'
import { Colors } from '@/constants/Colors'
import { saveData } from '@/context/storage'
import { useUser } from '@clerk/clerk-expo'
import { ProfileData } from './Profile'
import { useRouter } from 'expo-router'

const SetupProfile = () => {
  const { user } = useUser()
  const router = useRouter()

  const [profile, setProfile] = useState<ProfileData>({
    salutation: '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    schoolName: '',
    phoneNumber: user?.phoneNumbers[0]?.phoneNumber || '',
  })

  const firstNameAlreadyExists = user?.firstName !== ''
  const lastNameAlreadyExists = user?.lastName !== ''

  const handleSubmit = async () => {
    if (!profile.firstName.trim() || !profile.lastName.trim() || !profile.schoolName.trim()) {
      Alert.alert('Error', 'Please fill in all required fields')
      return
    }

    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}$/
    if (profile.phoneNumber && !phoneRegex.test(profile.phoneNumber)) {
      Alert.alert('Error', 'Please enter a valid phone number')
      return
    }

    try {
      // Save profile data
      const profileData = {
        salutation: profile.salutation,
        firstName: profile.firstName.trim(),
        lastName: profile.lastName.trim(),
        schoolName: profile.schoolName.trim(),
        phoneNumber: profile.phoneNumber.trim(),
      }

      // Update Clerk user metadata
      await user?.update({
        firstName: profileData.firstName.trim(),
        lastName: profileData.lastName.trim(),
        unsafeMetadata: {
          signedUp: true,
          schoolName: profileData.schoolName.trim(),
          phoneNumber: profileData.phoneNumber.trim(),
        },
      })
      saveData('profile', profileData)

      router.push('/(tabs)')
    } catch (error) {
      console.error('Error saving profile:', error)
      Alert.alert('Error', 'Failed to save profile data')
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Complete Your Profile</Text>
          <Text style={styles.headerSubtitle}>Please provide your information to continue</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Salutation</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={profile.salutation}
                onValueChange={(text) =>
                  setProfile((prevProfile) => ({ ...prevProfile, salutation: text }))
                }
                style={styles.picker}>
                <Picker.Item label="Select salutation" value="" />
                <Picker.Item label="Mr." value="Mr." />
                <Picker.Item label="Mrs." value="Mrs." />
                <Picker.Item label="Ms." value="Ms." />
              </Picker>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>First Name *</Text>
            <TextInput
              editable={!firstNameAlreadyExists}
              style={styles.input}
              value={profile.firstName}
              onChangeText={(text) =>
                setProfile((prevProfile) => ({ ...prevProfile, firstName: text }))
              }
              placeholder="Enter your first name"
              placeholderTextColor="#A0AEC0"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Last Name *</Text>
            <TextInput
              editable={!lastNameAlreadyExists}
              style={styles.input}
              value={profile.lastName}
              onChangeText={(text) =>
                setProfile((prevProfile) => ({ ...prevProfile, lastName: text }))
              }
              placeholder="Enter your last name"
              placeholderTextColor="#A0AEC0"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>School Name *</Text>
            <TextInput
              style={styles.input}
              value={profile.schoolName}
              onChangeText={(text) =>
                setProfile((prevProfile) => ({ ...prevProfile, schoolName: text }))
              }
              placeholder="Enter your school name"
              placeholderTextColor="#A0AEC0"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={profile.phoneNumber}
              onChangeText={(text) =>
                setProfile((prevProfile) => ({ ...prevProfile, phoneNumber: text }))
              }
              placeholder="Enter your phone number"
              placeholderTextColor="#A0AEC0"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Complete Setup</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
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
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4A5568',
    marginBottom: 8,
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
  },
  picker: {
    height: 50,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
})

export default SetupProfile
