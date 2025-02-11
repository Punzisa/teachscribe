import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useLocalSearchParams, useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { dataChangeSubject } from '@/context/storage'
import { ROWData } from '../CreatePage/CreateRecordsOfWork'
import { Colors } from '@/constants/Colors'

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
          <Text style={styles.title}>{recordOfWork.subject}</Text>
          <Text style={styles.subtitle}>Record of Work Details</Text>
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

        {renderInfoItem('calendar-outline', 'Term', recordOfWork.term)}
        {renderInfoItem('book-outline', 'Subject', recordOfWork.subject)}
        {renderInfoItem('school-outline', 'Grade', recordOfWork.grade)}
        {renderInfoItem('calendar-number-outline', 'Year', recordOfWork.year)}
        {renderInfoItem('business-outline', 'Classroom', recordOfWork.grade)}
        {renderInfoItem(
          'person-outline',
          'Teacher',
          `${teacherData?.salutation} ${teacherData?.firstName} ${teacherData?.lastName}`
        )}
      </View>

      <View style={styles.entriesContainer}>
        <View style={styles.sectionHeader}>
          <Ionicons name="list-outline" size={24} color={Colors.primary} />
          <Text style={styles.sectionTitle}>Weekly Records</Text>
        </View>

        {recordOfWork.entries.map((entry, index) => (
          <View key={entry.id} style={styles.weekCard}>
            <View style={styles.weekBadge}>
              <Ionicons name="time-outline" size={20} color={Colors.primary} />
              <Text style={styles.weekText}>{entry.week}</Text>
            </View>

            <View style={styles.entryContent}>
              <View style={styles.entryItem}>
                <View style={styles.entryHeader}>
                  <Ionicons name="checkmark-circle-outline" size={20} color={Colors.primary} />
                  <Text style={styles.entryLabel}>Work Covered</Text>
                </View>
                <Text style={styles.entryText}>{entry.workCovered}</Text>
              </View>

              <View style={styles.entryItem}>
                <View style={styles.entryHeader}>
                  <Ionicons name="library-outline" size={20} color={Colors.primary} />
                  <Text style={styles.entryLabel}>Resources & References</Text>
                </View>
                <Text style={styles.entryText}>{entry.commentsOnResourcesReferences}</Text>
              </View>

              <View style={styles.entryItem}>
                <View style={styles.entryHeader}>
                  <Ionicons name="bulb-outline" size={20} color={Colors.primary} />
                  <Text style={styles.entryLabel}>Method Strategies</Text>
                </View>
                <Text style={styles.entryText}>{entry.methodStrategies}</Text>
              </View>

              <View style={styles.entryItem}>
                <View style={styles.entryHeader}>
                  <Ionicons name="trending-up-outline" size={20} color={Colors.primary} />
                  <Text style={styles.entryLabel}>Learners' Progress</Text>
                </View>
                <Text style={styles.entryText}>{entry.commentsOnLearnersProgress}</Text>
              </View>

              <View style={[styles.entryItem, styles.remarksContainer]}>
                <View style={styles.entryHeader}>
                  <Ionicons name="chatbox-outline" size={20} color="#4CAF50" />
                  <Text style={[styles.entryLabel, { color: '#4CAF50' }]}>HOD's Remarks</Text>
                </View>
                <Text style={styles.remarksText}>{entry.hodRemarks}</Text>
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
    shadowOffset: { width: 0, height: 2 },
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
  entriesContainer: {
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
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  weekBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: '#EDF2F7',
  },
  weekText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  entryContent: {
    padding: 16,
    gap: 20,
  },
  entryItem: {
    gap: 8,
  },
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  entryLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4A5568',
  },
  entryText: {
    fontSize: 16,
    color: '#2D3748',
    lineHeight: 24,
    paddingLeft: 28,
  },
  remarksContainer: {
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#4CAF50',
  },
  remarksText: {
    fontSize: 16,
    color: '#2D3748',
    lineHeight: 24,
    paddingLeft: 28,
    fontStyle: 'italic',
  },
})
