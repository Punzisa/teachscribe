import { primary } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import teacherImg from '@/assets/teacher.jpg'
import { LinearGradient } from 'expo-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'

const Avatar = () => {
  return (
    <View style={styles.avatarContainer}>
      <Image source={teacherImg} style={styles.avatarImage} resizeMode="cover" />
    </View>
  )
}
const Greeting = () => {
  const [greeting, setGreeting] = useState('')
  const router = useRouter()
  useEffect(() => {
    const currentHour = new Date().getHours()
    if (currentHour >= 0 && currentHour < 12) {
      setGreeting('good morning')
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('good afternoon')
    } else {
      setGreeting('good evening')
    }
  }, [])

  return (
    <LinearGradient
      colors={[primary, '#6fe3e1']}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 1, y: 0.9 }}
      style={styles.container}>
      <View style={styles.topSection}>
        <View>
          <Text style={styles.headerText}>Hello Mr. Ngongo,</Text>
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
    borderRadius: 70 / 2,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 70 / 2,
  },
  topSection: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  container: {
    paddingHorizontal: 10,
    paddingVertical: 40,
    color: 'white',
    borderRadius: 20,
    marginBottom: 20,
    marginHorizontal: 5,
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
