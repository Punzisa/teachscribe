import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useLocalSearchParams, useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { dataChangeSubject } from '@/context/storage'
import { SOWData } from '../CreatePage/CreateSchemesOfWork'
import { Colors } from '@/constants/Colors'

interface TeacherData {
  salutation: string
  firstName: string
  lastName: string
}

export default function ViewSOW() {
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

  const renderInfoItem = (icon: string, label: string, value: string) => (
    <View style={styles.infoItem}>
      <Ionicons name={icon} size={20} color={Colors.primary} />
      <Text style={styles.infoLabel}>{label}:</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  )

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{schemeOfWork.subject}</Text>
          <Text style={styles.subtitle}>Scheme of Work Details</Text>
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

        {renderInfoItem('calendar-outline', 'Term', schemeOfWork.term)}
        {renderInfoItem('book-outline', 'Subject', schemeOfWork.subject)}
        {renderInfoItem('school-outline', 'Grade', schemeOfWork.grade)}
        {renderInfoItem('calendar-number-outline', 'Year', schemeOfWork.year)}
        {renderInfoItem('time-outline', 'Periods/Week', schemeOfWork.periodsPerWeek)}
        {renderInfoItem('business-outline', 'Classroom', schemeOfWork.grade)}
        {renderInfoItem(
          'person-outline',
          'Teacher',
          `${teacherData?.salutation} ${teacherData?.firstName} ${teacherData?.lastName}`
        )}
      </View>

      <View style={styles.weeklyEntriesContainer}>
        <View style={styles.sectionHeader}>
          <Ionicons name="list-outline" size={24} color={Colors.primary} />
          <Text style={styles.sectionTitle}>Weekly Schedule</Text>
        </View>

        {schemeOfWork.entries.map((entry, index) => (
          <View key={entry.id} style={styles.weekCard}>
            <View style={styles.weekHeader}>
              <View style={styles.weekBadge}>
                <Text style={styles.weekNumber}>Week</Text>
                <Text style={styles.weekText}>{entry.week}</Text>
              </View>
            </View>

            <View style={styles.weekContent}>
              <View style={styles.contentItem}>
                <Text style={styles.contentLabel}>Topics/Subtopics:</Text>
                <Text style={styles.contentText}>{entry.topics}</Text>
              </View>

              <View style={styles.contentItem}>
                <Text style={styles.contentLabel}>Expected Learning Outcome:</Text>
                <Text style={styles.contentText}>{entry.learningOutcome}</Text>
              </View>

              <View style={styles.contentItem}>
                <Text style={styles.contentLabel}>Methodology:</Text>
                <Text style={styles.contentText}>{entry.methodology}</Text>
              </View>

              <View style={styles.contentItem}>
                <Text style={styles.contentLabel}>Expected Experiments:</Text>
                <Text style={styles.contentText}>{entry.expectedExperiments}</Text>
              </View>

              <View style={styles.contentItem}>
                <Text style={styles.contentLabel}>Reference:</Text>
                <Text style={styles.contentText}>{entry.reference}</Text>
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
    width: 100,
  },
  infoValue: {
    flex: 1,
    fontSize: 16,
    color: '#2D3748',
  },
  weeklyEntriesContainer: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
  },
  weekCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  weekHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  weekBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  weekNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  weekText: {
    fontSize: 16,
    color: '#718096',
  },
  weekContent: {
    padding: 16,
    gap: 16,
  },
  contentItem: {
    gap: 4,
  },
  contentLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4A5568',
  },
  contentText: {
    fontSize: 16,
    color: '#2D3748',
    lineHeight: 24,
  },
})
