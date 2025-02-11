import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useColorScheme } from '@/hooks/useColorScheme'
import ClassDropdown from '@/components/LessonsPage/ClassDropdown'
import { Colors } from '@/constants/Colors'
import { dataChangeSubject, loadList, removeFromList } from '@/context/storage'
import { SOWData } from '../CreatePage/CreateSchemesOfWork'
import { useRouter } from 'expo-router'
import { ProfileData } from '@/components/ProfilePage/Profile'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { generateAndSharePDF } from './ExportSOWPdf'

interface SchemesOfWorkCardProps {
  sow: SOWData
}

const SchemesOfWorkCard: React.FC<SchemesOfWorkCardProps> = ({ sow: sow }) => {
  const [teacherProfile, setTeacherProfile] = useState<ProfileData | null>(null)
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const profileData = await AsyncStorage.getItem('profile')
        if (profileData) {
          const parsedData: ProfileData = JSON.parse(profileData)
          setTeacherProfile(parsedData)
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
  const colorScheme = useColorScheme()
  const [showDropdown, setShowDropdown] = useState(false)
  const router = useRouter()
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  const handlePress = (button: string) => {
    if (button === 'Export') {
      generateAndSharePDF(sow, teacherProfile!)
    }
    if (button === 'Delete') {
      removeFromList('schemes_of_work', sow.id)
    }
    if (button === 'View') {
      router.push({
        pathname: '/(schemes_of_work)/view_schemes_of_work',
        params: { schemeOfWork: JSON.stringify(sow) },
      })
    }
  }

  const actionButtons = [
    { id: '4', title: 'View', icon: 'eye-outline', color: Colors.primary },
    { id: '2', title: 'Export', icon: 'share-outline', color: '#4CAF50' },
    { id: '5', title: 'Delete', icon: 'trash-outline', color: '#DC3545' },
  ]

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.cardHeader} onPress={toggleDropdown} activeOpacity={0.7}>
        <View style={styles.headerContent}>
          <View style={styles.subjectBadge}>
            <Ionicons name="book-outline" size={20} color={Colors.primary} />
            <Text style={styles.subjectText}>{sow.subject}</Text>
          </View>
          <View style={styles.termBadge}>
            <Text style={styles.termText}>{sow.term}</Text>
          </View>
        </View>
        <Ionicons
          name={showDropdown ? 'chevron-up' : 'chevron-down'}
          size={24}
          color={Colors.primary}
        />
      </TouchableOpacity>

      {showDropdown && (
        <View style={styles.cardContent}>
          <View style={styles.actionButtons}>
            {actionButtons.map((button) => (
              <TouchableOpacity
                key={button.id}
                style={[styles.actionButton, { backgroundColor: button.color }]}
                onPress={() => handlePress(button.title)}>
                <Ionicons name={button.icon} size={18} color="white" />
                <Text style={styles.actionButtonText}>{button.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Ionicons name="calendar-outline" size={20} color={Colors.primary} />
              <View>
                <Text style={styles.infoLabel}>Academic Year</Text>
                <Text style={styles.infoValue}>{sow.year}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Ionicons name="list-outline" size={20} color={Colors.primary} />
              <View>
                <Text style={styles.infoLabel}>Weeks Entered</Text>
                <Text style={styles.infoValue}>{sow.entries.length}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Ionicons name="school-outline" size={20} color={Colors.primary} />
              <View>
                <Text style={styles.infoLabel}>Grade</Text>
                <Text style={styles.infoValue}>{sow.grade}</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

export default function SchemesOfWork() {
  const [selectedGrade, setSelectedGrade] = useState<string>('')
  const [gradeOptions, setGradeOptions] = useState<{ id: string; label: string }[]>([])
  const [schemesOfWork, setSchemesOfWork] = useState<SOWData[] | null>(null)

  const handleGradeSelect = (value: string) => {
    setSelectedGrade(value)
  }

  const getData = async () => {
    const loadedData = await loadList<SOWData>('schemes_of_work')

    setSchemesOfWork(loadedData!)

    // Generate classroom options from loaded data
    const uniqueClasses = Array.from(new Set(loadedData?.map((sow) => sow.grade)))
    const newOptions = uniqueClasses.map((classroom, index) => ({
      id: (index + 1).toString(),
      label: classroom,
    }))
    setGradeOptions(newOptions)
  }

  useEffect(() => {
    getData()
    const subscription = dataChangeSubject.subscribe((changedKey) => {
      if (changedKey === 'schemes_of_work') {
        getData()
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const filteredSchemesOfWork = schemesOfWork?.filter(
    (sow) => selectedGrade === '' || sow.grade === selectedGrade
  )

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Schemes of Work</Text>
        <Text style={styles.headerSubtitle}>{schemesOfWork?.length || 0} schemes available</Text>
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Filter by Class</Text>
        <ClassDropdown
          options={gradeOptions}
          onSelect={handleGradeSelect}
          placeholder="Select Class"
        />
      </View>

      <View style={styles.content}>
        {selectedGrade &&
          filteredSchemesOfWork?.map((sow) => <SchemesOfWorkCard key={sow.id} sow={sow} />)}

        {!selectedGrade && (
          <View style={styles.emptyState}>
            <Ionicons name="school-outline" size={48} color={Colors.primary} />
            <Text style={styles.emptyStateText}>Select a class to view schemes</Text>
          </View>
        )}
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
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#718096',
  },
  filterSection: {
    padding: 16,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4A5568',
    marginBottom: 8,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  subjectBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  subjectText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  termBadge: {
    backgroundColor: '#EDF2F7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  termText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  cardContent: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  infoContainer: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#718096',
  },
  infoValue: {
    fontSize: 16,
    color: '#2D3748',
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 16,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
  },
})
