import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { LearningDevelopment, LessonData } from './forms/LessonPlan/LessonPlan'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { dataChangeSubject } from '@/context/storage'
import { Colors } from '@/constants/Colors'

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

  const renderInfoItem = (icon: string, label: string, value: string) => (
    <View style={styles.infoItem}>
      <Ionicons name={icon} size={20} color={Colors.primary} />
      <Text style={styles.infoLabel}>{label}:</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  )
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{lesson.title}</Text>
          <Text style={styles.subtitle}>Lesson Plan Details</Text>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={closeButtonPressed}>
          <Ionicons name="close" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="information-circle-outline" size={24} color={Colors.primary} />
          <Text style={styles.cardTitle}>Basic Information</Text>
        </View>

        {renderInfoItem('calendar-outline', 'Date', lesson.date.toLocaleDateString())}
        {renderInfoItem(
          'person-outline',
          'Teacher',
          `${teacherData?.salutation} ${teacherData?.firstName} ${teacherData?.lastName}`
        )}
        {renderInfoItem('school-outline', 'Class', lesson.class)}
        {renderInfoItem('book-outline', 'Subject', lesson.subject)}
        {renderInfoItem('time-outline', 'Time', lesson.date.toLocaleTimeString())}
        {renderInfoItem('hourglass-outline', 'Duration', lesson.duration)}
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="library-outline" size={24} color={Colors.primary} />
          <Text style={styles.cardTitle}>Resources & References</Text>
        </View>
        <View style={styles.resourcesContainer}>
          <View style={styles.resourceItem}>
            <Text style={styles.resourceLabel}>Resources:</Text>
            <Text style={styles.resourceText}>{lesson.resources}</Text>
          </View>
          <View style={styles.resourceItem}>
            <Text style={styles.resourceLabel}>References:</Text>
            <Text style={styles.resourceText}>{lesson.references}</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="document-text-outline" size={24} color={Colors.primary} />
          <Text style={styles.cardTitle}>Lesson Details</Text>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Description</Text>
            <Text style={styles.detailText}>{lesson.description}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Major Learning Outcome</Text>
            <Text style={styles.detailText}>{lesson.majorLearningOutcome}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Evidence of Attainment</Text>
            <Text style={styles.detailText}>{lesson.evidenceOfAttainment}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Rationale</Text>
            <Text style={styles.detailText}>{lesson.rationale}</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="git-branch-outline" size={24} color={Colors.primary} />
          <Text style={styles.cardTitle}>Learning Development</Text>
        </View>
        {lesson.learningDevelopmentEntries.map((entry: LearningDevelopment) => (
          <View key={entry.id} style={styles.developmentEntry}>
            <View style={styles.timeContainer}>
              <Ionicons name="time-outline" size={20} color={Colors.primary} />
              <Text style={styles.timeText}>{entry.time}</Text>
            </View>
            <View style={styles.activitiesContainer}>
              <View style={styles.activityItem}>
                <Text style={styles.activityLabel}>Teacher Activities:</Text>
                <Text style={styles.activityText}>{entry.teacherActivites}</Text>
              </View>
              <View style={styles.activityItem}>
                <Text style={styles.activityLabel}>Learner Activities:</Text>
                <Text style={styles.activityText}>{entry.learnerActivities}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
  },
  closeButton: {
    padding: 8,
  },
  card: {
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4A5568',
    width: 80,
  },
  infoValue: {
    flex: 1,
    fontSize: 16,
    color: '#2D3748',
  },
  resourcesContainer: {
    gap: 16,
  },
  resourceItem: {
    gap: 8,
  },
  resourceLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4A5568',
  },
  resourceText: {
    fontSize: 16,
    color: '#2D3748',
    lineHeight: 24,
  },
  detailsContainer: {
    gap: 20,
  },
  detailItem: {
    gap: 8,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4A5568',
  },
  detailText: {
    fontSize: 16,
    color: '#2D3748',
    lineHeight: 24,
  },
  developmentEntry: {
    borderLeftWidth: 2,
    borderLeftColor: Colors.primary,
    paddingLeft: 16,
    marginBottom: 20,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primary,
  },
  activitiesContainer: {
    gap: 16,
  },
  activityItem: {
    gap: 8,
  },
  activityLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4A5568',
  },
  activityText: {
    fontSize: 16,
    color: '#2D3748',
    lineHeight: 24,
  },
})
