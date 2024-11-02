import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { LessonData } from './forms/LessonPlan/LessonPlan'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { dataChangeSubject } from '@/context/storage'

interface TeacherData {
  salutation: string
  firstName: string
  lastName: string
}

export default function ViewLesson() {
  const params = useLocalSearchParams<{ lesson: string }>()
  const lesson: LessonData = params.lesson
    ? { ...JSON.parse(params.lesson), date: new Date(JSON.parse(params.lesson).date) }
    : null
  const [teacherData, setTeacherData] = useState<TeacherData>()
  const colorScheme = useColorScheme()
  const router = useRouter()

  const closeButtonPressed = () => {
    router.back()
  }

  const formatActivitesKey = (key: string): string => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())
  }

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const profileData = await AsyncStorage.getItem('profile')
        if (profileData) {
          const parsedData: TeacherData = JSON.parse(profileData)
          setTeacherData(parsedData)
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
    <ScrollView style={styles.container}>
      <View style={styles.titleAndButton}>
        <Text style={styles.title}>{lesson.title}</Text>
        <TouchableOpacity onPress={closeButtonPressed}>
          <Ionicons name="close" size={28} color={colorScheme === 'light' ? 'black' : 'white'} />
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Subject: {lesson.subject}</Text>
      <Text style={styles.subtitle}>Classroom: {lesson.class}</Text>
      <Text style={styles.subtitle}>
        Teacher Name: {teacherData?.salutation} {teacherData?.firstName} {teacherData?.lastName}
      </Text>
      <Text style={styles.subtitle}>Date: {lesson.date.toLocaleDateString()}</Text>
      <Text style={styles.subtitle}>Time: {lesson.date.toLocaleTimeString()}</Text>
      <Text style={styles.subtitle}>Duration: {lesson.duration}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text>{lesson.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Objectives</Text>
        {lesson.objectives.map((objective, index) => (
          <Text key={index}>• {objective}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activities</Text>
        {Object.entries(lesson.activities).map(([key, value]) => (
          <View key={key} style={styles.activity}>
            <Text style={styles.activityTitle}>{formatActivitesKey(key)}:</Text>
            <Text>{value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 100,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  titles: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleAndButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  activityType: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  activity: {
    marginBottom: 8,
  },
  activityTitle: {
    fontWeight: 'bold',
  },
  teachersSignature: {
    flex: 1,
    flexDirection: 'row',
    gap: 16,
    fontSize: 16,
  },
})
