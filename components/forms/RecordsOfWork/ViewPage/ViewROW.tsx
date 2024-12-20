import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useLocalSearchParams, useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { dataChangeSubject } from '@/context/storage'
import { ROWData } from '../CreatePage/CreateRecordsOfWork'

interface TeacherData {
  salutation: string
  firstName: string
  lastName: string
}

export default function ViewROW() {
  const params = useLocalSearchParams<{ recordOfWork: string }>()
  const recordOfWork: ROWData = params.recordOfWork ? { ...JSON.parse(params.recordOfWork) } : null
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
        <Text style={styles.title}>{recordOfWork.subject}</Text>
        <TouchableOpacity onPress={closeButtonPressed}>
          <Ionicons name="close" size={28} color={colorScheme === 'light' ? 'black' : 'white'} />
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Term: {recordOfWork.term}</Text>
      <Text style={styles.subtitle}>Subject: {recordOfWork.subject}</Text>
      <Text style={styles.subtitle}>Grade: {recordOfWork.grade}</Text>
      <Text style={styles.subtitle}>Year: {recordOfWork.year}</Text>
      <Text style={styles.subtitle}>Classroom: {recordOfWork.grade}</Text>
      <Text style={styles.subtitle}>
        Teacher: {teacherData?.salutation} {teacherData?.firstName} {teacherData?.lastName}
      </Text>

      {recordOfWork.entries.map((entry) => (
        <View key={entry.id} style={styles.section}>
          <Text style={styles.sectionTitle}>{entry.week}</Text>
          <Text style={styles.subtitle}>Work Covered: {entry.workCovered}</Text>
          <Text style={styles.subtitle}>
            Comments on Resources/References: {entry.commentsOnResourcesReferences}
          </Text>
          <Text style={styles.subtitle}>Method Strategies: {entry.methodStrategies}</Text>
          <Text style={styles.subtitle}>
            Comments on Learners' Progress: {entry.commentsOnLearnersProgress}
          </Text>

          <Text style={styles.subtitle}>HOD's Remarks: {entry.hodRemarks}</Text>
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
