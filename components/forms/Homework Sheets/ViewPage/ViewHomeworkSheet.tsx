import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useLocalSearchParams, useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { dataChangeSubject } from '@/context/storage'
import { SOWData } from '../CreatePage/CreateHomeworkSheet'

interface TeacherData {
  salutation: string
  firstName: string
  lastName: string
}

export default function ViewHomeworkSheet() {
  const params = useLocalSearchParams<{ schemeOfWork: string }>()
  const schemeOfWork: SOWData = params.schemeOfWork ? { ...JSON.parse(params.schemeOfWork) } : null
  const [teacherData, setTeacherData] = useState<TeacherData>()
  const colorScheme = useColorScheme()
  const router = useRouter()

  const closeButtonPressed = () => {
    router.back()
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
        <Text style={styles.title}>{schemeOfWork.subject}</Text>
        <TouchableOpacity onPress={closeButtonPressed}>
          <Ionicons name="close" size={28} color={colorScheme === 'light' ? 'black' : 'white'} />
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Term: {schemeOfWork.term}</Text>
      <Text style={styles.subtitle}>Subject: {schemeOfWork.subject}</Text>
      <Text style={styles.subtitle}>Grade: {schemeOfWork.grade}</Text>
      <Text style={styles.subtitle}>Year: {schemeOfWork.year}</Text>
      <Text style={styles.subtitle}>Periods Per Week: {schemeOfWork.periodsPerWeek}</Text>
      <Text style={styles.subtitle}>Classroom: {schemeOfWork.grade}</Text>
      <Text style={styles.subtitle}>
        Teacher: {teacherData?.salutation} {teacherData?.firstName} {teacherData?.lastName}
      </Text>

      {schemeOfWork.entries.map((entry) => (
        <View key={entry.id} style={styles.section}>
          <Text style={styles.sectionTitle}>{entry.week}</Text>
          <Text style={styles.subtitle}>Topics/Subtopics: {entry.topics}</Text>
          <Text style={styles.subtitle}>Expected Learning Outcome: {entry.learningOutcome}</Text>

          <Text style={styles.subtitle}>Methodology: {entry.methodology}</Text>
          <Text style={styles.subtitle}>Expected Experiments: {entry.expectedExperiments}</Text>

          <Text style={styles.subtitle}>Reference: {entry.reference}</Text>
        </View>
      ))}
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
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
