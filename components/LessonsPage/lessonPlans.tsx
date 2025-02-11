import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useColorScheme } from '@/hooks/useColorScheme'
import ClassDropdown from './ClassDropdown'
import { Colors } from '@/constants/Colors'
import { dataChangeSubject, loadList, removeFromList } from '@/context/storage'
import { LessonData } from '../forms/LessonPlan/LessonPlan'
import { useRouter } from 'expo-router'
import { ProfileData } from '../ProfilePage/Profile'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { generateAndSharePDF } from './ExportLessonPdf'

interface LessonProps {
  lesson: LessonData
}

const Lessons: React.FC<LessonProps> = ({ lesson }) => {
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

  const actionButtons = [
    { id: '4', title: 'View', icon: 'eye-outline', color: Colors.primary },
    { id: '2', title: 'Export', icon: 'share-outline', color: '#4CAF50' },
    { id: '5', title: 'Delete', icon: 'trash-outline', color: '#DC3545' },
  ]

  const handlePress = (button: string) => {
    if (button === 'Export') {
      generateAndSharePDF(lesson, teacherProfile!)
    }
    if (button === 'Delete') {
      removeFromList('lessons', lesson.id)
    }
    if (button === 'View') {
      router.push({
        pathname: '/(lesson)/view_lesson',
        params: { lesson: JSON.stringify(lesson) },
      })
    }
  }

  return (
    <View style={styles.lessonCard}>
      <TouchableOpacity style={styles.cardHeader} onPress={toggleDropdown} activeOpacity={0.7}>
        <View style={styles.headerContent}>
          <View style={styles.titleSection}>
            <Ionicons name="book-outline" size={20} color={Colors.primary} />
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
          </View>
          <View style={styles.classBadge}>
            <Text style={styles.classText}>{lesson.class}</Text>
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

          <View style={styles.lessonDetails}>
            <View style={styles.detailItem}>
              <View style={styles.detailHeader}>
                <Ionicons name="information-circle-outline" size={20} color={Colors.primary} />
                <Text style={styles.detailTitle}>Description</Text>
              </View>
              <Text style={styles.detailText}>{lesson.description}</Text>
            </View>

            <View style={styles.detailItem}>
              <View style={styles.detailHeader}>
                <Ionicons name="clipboard-outline" size={20} color={Colors.primary} />
                <Text style={styles.detailTitle}>Teaching Activity</Text>
              </View>
              <Text style={styles.detailText}>{lesson.activities.teachingActivities}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

export default function LessonPlans() {
  const [lessons, setLessons] = useState<LessonData[] | null>(null)
  const [selectedClass, setSelectedClass] = useState<string>('')
  const [classOptions, setClassOptions] = useState<{ id: string; label: string }[]>([])

  const handleClassSelect = (value: string) => {
    setSelectedClass(value)
  }

  const getData = async () => {
    const loadedData = await loadList<LessonData>('lessons')
    const lessonsWithDateObjects = loadedData?.map((lesson) => ({
      ...lesson,
      date: new Date(lesson.date), // Convert string date to Date object
    }))
    setLessons(lessonsWithDateObjects!)

    // Generate classroom options from loaded data
    const uniqueClasses = Array.from(new Set(loadedData?.map((lesson) => lesson.class)))
    const newOptions = uniqueClasses.map((classroom, index) => ({
      id: (index + 1).toString(),
      label: classroom,
    }))
    setClassOptions(newOptions)
  }

  useEffect(() => {
    getData()
    const subscription = dataChangeSubject.subscribe((changedKey) => {
      if (changedKey === 'lessons') {
        getData()
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const filteredLessons = lessons?.filter(
    (lesson) => selectedClass === '' || lesson.class === selectedClass
  )

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lesson Plans</Text>
        <Text style={styles.headerSubtitle}>{lessons?.length || 0} lessons available</Text>
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Filter by Class</Text>
        <ClassDropdown
          options={classOptions}
          onSelect={handleClassSelect}
          placeholder="Select Class"
        />
      </View>

      <View style={styles.lessonsContainer}>
        {selectedClass &&
          filteredLessons?.map((lesson) => <Lessons key={lesson.id} lesson={lesson} />)}

        {!selectedClass && (
          <View style={styles.emptyState}>
            <Ionicons name="library-outline" size={48} color={Colors.primary} />
            <Text style={styles.emptyStateText}>Select a class to view lessons</Text>
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
  lessonsContainer: {
    padding: 16,
    gap: 16,
  },
  lessonCard: {
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
    justifyContent: 'space-between',
    gap: 12,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  classBadge: {
    backgroundColor: '#EDF2F7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  classText: {
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
  lessonDetails: {
    gap: 16,
  },
  detailItem: {
    gap: 8,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4A5568',
  },
  detailText: {
    fontSize: 16,
    color: '#2D3748',
    lineHeight: 24,
    paddingLeft: 28,
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
