// Profile.tsx
import React from 'react'
import { View, Text, Image, StyleSheet, Alert } from 'react-native'
import { Avatar, TouchableOpacity } from 'react-native-ui-lib'
import icon from '@/assets/images/edit_icon.png'
import SignOut from '../SignOut'
import { Colors } from '@/constants/Colors'
import teacherImg from '@/assets/teacher.jpg'

interface ProfileProps {
  firstName: string
  lastName: string
  schoolName: string
  avatarUrl?: string
}

const Profile: React.FC<ProfileProps> = ({
  firstName,
  lastName,
  schoolName,
  avatarUrl = 'https://i.pravatar.cc/300?img=51', // Placeholder image URL
}) => {
  const editAvatar = () => {
    console.log('Edit button pressed')
  }

  const signOut = () => {
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
          onPress: () => SignOut(),
          style: 'default',
        },
      ],
      { cancelable: true }
    )
  }
  return (
    <View style={styles.container}>
      <Avatar
        source={teacherImg}
        size={150}
        badgeProps={{
          onPress: editAvatar,
          size: 40,
          icon: icon,
          iconStyle: { backgroundColor: Colors.secondary },
        }}
        badgePosition="BOTTOM_RIGHT"
      />
      <Text style={styles.name}>
        {firstName} {lastName}
      </Text>
      <Text style={styles.school}>{schoolName}</Text>
      <TouchableOpacity
        style={styles.signOutButton}
        onPress={() => {
          signOut()
        }}>
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  school: {
    fontSize: 18,
    color: '#666',
  },
  signOutButton: {
    marginTop: 20,
    backgroundColor: 'red', // Customize the background color as needed
    padding: 10, // Adjust the padding as needed
    borderRadius: 5, // Adjust the border radius as needed'
  },
})

export default Profile
