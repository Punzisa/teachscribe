import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { View } from 'react-native'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { LessonData } from './forms/LessonPlan/LessonPlan'

interface LessonView {
  lessonName: string
  schoolName: string
  teacherName: string
  status: 'Approved' | 'Submitted' | 'Not yet submitted'
  date: Date
  lessonObjectives: string
  teachingAids: string
  teachingActivities: string
  pupilActivities: string
  teachersSignature: string
}

const lessonData: LessonView = {
  lessonName: 'Waves as Energy',
  schoolName: 'TeachScribe Secondary School',
  teacherName: 'Mr. Ngongo',
  date: new Date(),
  status: 'Approved',
  lessonObjectives:
    'Students will be able to describe the properties of electromagnetic waves, identify the sources of each of the rays in the electromagnetic spectrum and describe the method of detection of each of the main components of the electromagnetic spectrum.',
  teachingAids: 'Chart showing electromagnetic spectrum',
  teachingActivities: 'Give notes on chapters 2-3 from textbook and then give exercises 1 to 5.',
  pupilActivities:
    'Students will start the lesson with a fun and interactive game where they match fraction cards to visual representations. This activity aims to familiarize students with the concept of fractions in a tangible way.',
  teachersSignature: 'Mr. Ngongo',
}

export default function ViewLesson() {
  const params = useLocalSearchParams<{ lesson: string }>()
  const lesson: LessonData = params.lesson ? JSON.parse(params.lesson) : null

  const colorScheme = useColorScheme()
  const router = useRouter()

  const closeButtonPressed = () => {
    router.back()
  }

  const formatActivitesKey = (key: string): string => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())
  }
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
      <Text style={styles.subtitle}>Teacher Name: {lessonData.teacherName}</Text>
      <Text style={styles.subtitle}>Date: {lessonData.date.toDateString()}</Text>
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
      <View style={styles.teachersSignature}>
        <Text>Teacher's Signature:</Text>
        <Text>{lessonData.teachersSignature}</Text>
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
