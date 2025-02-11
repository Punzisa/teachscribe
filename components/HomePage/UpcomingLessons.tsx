import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { LessonData } from '../forms/LessonPlan/LessonPlan'
import { dataChangeSubject, loadList } from '@/context/storage'
import { ProfileData } from '../ProfilePage/Profile'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { generateAndSharePDF } from '../LessonsPage/ExportLessonPdf'
import { Ionicons } from '@expo/vector-icons'

const ActionButton = ({
  title,
  icon,
  onPress,
  color,
}: {
  title: string
  icon: string
  onPress: any
  color: string
}) => {
  return (
    <TouchableOpacity style={[styles.actionButton, { backgroundColor: color }]} onPress={onPress}>
      <Ionicons name={icon} size={16} color="white" />
      <Text style={styles.actionButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}
const LessonCard: React.FC<{ lesson: LessonData; teacherProfile: ProfileData }> = ({
  lesson,
  teacherProfile,
}) => {
  const router = useRouter()
  const lessonDate = new Date(lesson.date)
  const isToday = new Date().toDateString() === lessonDate.toDateString()

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateDay}>{lessonDate.getDate()}</Text>
          <Text style={styles.dateMonth}>
            {lessonDate.toLocaleString('default', { month: 'short' })}
          </Text>
        </View>
        <View style={styles.lessonInfo}>
          <Text style={styles.cardTitle}>{lesson.title}</Text>
          <View style={styles.classContainer}>
            <Ionicons name="school-outline" size={16} color={Colors.primary} />
            <Text style={styles.classText}>{lesson.class}</Text>
          </View>
          {isToday && (
            <View style={styles.todayBadge}>
              <Text style={styles.todayText}>Today</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.cardActions}>
        <ActionButton
          title="View"
          icon="eye-outline"
          color={Colors.primary}
          onPress={() =>
            router.push({
              pathname: '/(lesson)/view_lesson',
              params: { lesson: JSON.stringify(lesson) },
            })
          }
        />
        <ActionButton
          title="Export"
          icon="share-outline"
          color="#4CAF50"
          onPress={() => generateAndSharePDF(lesson, teacherProfile!)}
        />
      </View>
    </View>
  )
}

const UpcomingLessons = () => {
  const [upcomingLessons, setUpcomingLessons] = useState<LessonData[] | null>(null)
  const [filteredLessons, setFilteredLessons] = useState<LessonData[] | null>(null)
  const [selectedClass, setSelectedClass] = useState<string>('All')
  const [teacherProfile, setTeacherProfile] = useState<ProfileData | null>()
  const [classrooms, setClassrooms] = useState<string[]>(['All'])
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const profileData = await AsyncStorage.getItem('profile')
        if (profileData) {
          const parsedData: ProfileData = JSON.parse(profileData)
          console.log('Loaded profile data:', parsedData)
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

  const getData = async () => {
    const loadedData = await loadList<LessonData>('lessons')
    const lessonsWithDateObjects = loadedData?.map((lesson) => ({
      ...lesson,
      date: new Date(lesson.date),
    }))
    const futureLessons = lessonsWithDateObjects?.filter((lesson) => lesson.date > new Date())
    futureLessons?.sort((a, b) => a.date.getTime() - b.date.getTime())
    setUpcomingLessons(futureLessons!)
    setFilteredLessons(futureLessons!)
    const uniqueClassrooms = ['All', ...new Set(futureLessons?.map((lesson) => lesson.class) || [])]
    setClassrooms(uniqueClassrooms)
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

  const filterLessonsByClass = (classroom: string) => {
    setSelectedClass(classroom)
    if (classroom === 'All') {
      setFilteredLessons(upcomingLessons)
    } else {
      setFilteredLessons(upcomingLessons?.filter((lesson) => lesson.class === classroom) || null)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Upcoming Lessons</Text>
        <Text style={styles.headerSubtitle}>{filteredLessons?.length || 0} lessons scheduled</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}>
        {classrooms.map((classroom) => (
          <TouchableOpacity
            key={classroom}
            style={[styles.filterButton, selectedClass === classroom && styles.filterButtonActive]}
            onPress={() => filterLessonsByClass(classroom)}>
            <Ionicons
              name="bookmark-outline"
              size={16}
              color={selectedClass === classroom ? 'white' : Colors.primary}
            />
            <Text
              style={[
                styles.filterButtonText,
                selectedClass === classroom && styles.filterButtonTextActive,
              ]}>
              {classroom}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.lessonsList} showsVerticalScrollIndicator={false}>
        {filteredLessons?.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={48} color={Colors.primary} />
            <Text style={styles.emptyStateText}>No upcoming lessons</Text>
            <Text style={styles.emptyStateSubtext}>
              Lessons will appear here when you create them
            </Text>
          </View>
        ) : (
          filteredLessons?.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} teacherProfile={teacherProfile!} />
          ))
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    marginHorizontal: 10,
    borderRadius: 10,
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
    fontSize: 14,
    color: '#718096',
  },
  filterContainer: {
    maxHeight: 60,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  filterContent: {
    padding: 12,
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#EDF2F7',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary,
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  lessonsList: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
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
    gap: 16,
  },
  dateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EDF2F7',
    borderRadius: 8,
    padding: 8,
    minWidth: 60,
  },
  dateDay: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
  },
  dateMonth: {
    fontSize: 14,
    color: '#718096',
    textTransform: 'uppercase',
  },
  lessonInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  classContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  classText: {
    fontSize: 14,
    color: Colors.primary,
  },
  todayBadge: {
    backgroundColor: '#48BB78',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  todayText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
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
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 12,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
  },
})

export default UpcomingLessons
