import { primary } from '@/constants/Colors'
import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { dataChangeSubject } from '@/context/storage'

interface ProfileGreetingData {
  salutation: string
  lastName: string
}

const Avatar = () => {
  const [imageUri, setImageUri] = useState<string | null>(null)

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
      <Image source={{ uri: imageUri! }} style={styles.avatarImage} resizeMode="cover" />
    </View>
  )
}
const Greeting = () => {
  const [greeting, setGreeting] = useState('')
  const [salutationAndLastName, setSalutationAndLastName] = useState<ProfileGreetingData | null>(
    null
  )

  const router = useRouter()
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
      start={{ x: 0.2, y: 0 }}
      end={{ x: 1, y: 0.9 }}
      style={styles.container}>
      <View style={styles.topSection}>
        <View>
          <Text style={styles.headerText}>
            Hello {salutationAndLastName?.salutation} {salutationAndLastName?.lastName},
          </Text>
          <Text style={styles.greeting}>{greeting}</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/(profile)/')}>
          <Avatar />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 80 / 2,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 80 / 2,
  },
  topSection: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    color: 'white',
    borderRadius: 20,
    marginTop: 5,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  greeting: {
    fontSize: 18,
    color: 'white',
  },
})

export default Greeting
