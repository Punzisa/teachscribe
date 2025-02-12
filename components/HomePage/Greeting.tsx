import { primary } from '@/constants/Colors'
import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { dataChangeSubject } from '@/context/storage'
import { useExpoRouter } from 'expo-router/build/global-state/router-store'

interface ProfileGreetingData {
  salutation: string
  lastName: string
}

const Avatar = () => {
  const [imageUri, setImageUri] = useState<string | null>(null)
  const router = useExpoRouter()
  useEffect(() => {
    const loadImage = async () => {
      try {
        const savedImage = await AsyncStorage.getItem('profileImage')
        if (savedImage) {
          setImageUri(savedImage)
        }
      } catch (error) {
        console.error('Error loading image:', error)
      }
    }
    loadImage()
    const subscription = dataChangeSubject.subscribe((changedKey) => {
      if (changedKey === 'profileImage') {
        loadImage()
      }
    })

    return () => subscription.unsubscribe()
  }, [])
  return (
    <View style={styles.avatarContainer}>
      <TouchableOpacity onPress={() => router.push('/profile')}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.avatarImage} resizeMode="cover" />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <MaterialCommunityIcons name="account" size={40} color="white" />
          </View>
        )}
      </TouchableOpacity>
    </View>
  )
}
const Greeting = () => {
  const [greeting, setGreeting] = useState('')
  const [salutationAndLastName, setSalutationAndLastName] = useState<ProfileGreetingData | null>(
    null
  )

  useEffect(() => {
    const updateGreeting = () => {
      const currentHour = new Date().getHours()
      if (currentHour >= 0 && currentHour < 12) {
        setGreeting('good morning')
      } else if (currentHour >= 12 && currentHour < 18) {
        setGreeting('good afternoon')
      } else {
        setGreeting('good evening')
      }
    }
    updateGreeting()
    const now = new Date()
    const msUntilNextHour =
      (60 - now.getMinutes()) * 60 * 1000 - (now.getSeconds() * 1000 + now.getMilliseconds())

    const timeout = setTimeout(() => {
      updateGreeting()

      const interval = setInterval(updateGreeting, 3600000)

      return () => clearInterval(interval)
    }, msUntilNextHour)

    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const profileData = await AsyncStorage.getItem('profile')
        if (profileData) {
          const parsedData: ProfileGreetingData = JSON.parse(profileData)
          setSalutationAndLastName(parsedData)
        }
      } catch (error) {
        console.error('Error loading profile data:', error)
      }
    }

    loadProfileData()

    const subscription = dataChangeSubject.subscribe((changedKey) => {
      if (changedKey === 'profile') {
        loadProfileData()
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <LinearGradient
      colors={[primary, '#6fe3e1']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}>
      <View style={styles.topSection}>
        <View>
          <Text style={styles.headerText}>
            Hello {salutationAndLastName?.salutation} {salutationAndLastName?.lastName},
          </Text>
          <Text style={styles.greeting}>{greeting}</Text>
        </View>
        <Avatar />
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 3,
    borderRadius: 40,
    padding: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    elevation: 5,
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 40,
  },
  topSection: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    flexWrap: 'wrap-reverse',
    marginBottom: 15,
  },
  container: {
    paddingHorizontal: 25,
    paddingVertical: 45,
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '800',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginBottom: 5,
  },
  greeting: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.9)',
    textTransform: 'capitalize',
    letterSpacing: 0.5,
  },
})

export default Greeting
