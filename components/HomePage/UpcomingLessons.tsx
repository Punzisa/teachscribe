import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { LessonData } from '../forms/LessonPlan/LessonPlan'
import { dataChangeSubject, loadList } from '@/context/storage'
import { ProfileData } from '../ProfilePage/Profile'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { generateAndSharePDF } from '../LessonsPage/ExportLessonPdf'

const DropDownButton = ({ title, onPress }: { title: string; onPress: any }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.buttonTitle}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

const LessonCard: React.FC<{ lesson: LessonData; teacherProfile: ProfileData }> = ({
  lesson,
  teacherProfile,
}) => {
  const router = useRouter()

  return (
    <View style={styles.card}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={styles.cardTitle}>{lesson.title}</Text>
          <Text style={styles.cardSubtitle}>{lesson.class}</Text>
          <Text>{lesson.date.toDateString()}</Text>
        </View>
        <View>
          <DropDownButton
            title="View"
            onPress={() =>
              router.push({
                pathname: '/(lesson)/view_lesson',
                params: { lesson: JSON.stringify(lesson) },
              })
            }
          />
          <DropDownButton
            title="Export"
            onPress={() => generateAndSharePDF(lesson, teacherProfile!)}
          />
        </View>
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
      <Text style={styles.title}>Upcoming Lessons</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContentContainer}>
        {classrooms.map((classroom) => (
          <TouchableOpacity
            key={classroom}
            style={[styles.pillButton, selectedClass === classroom && styles.pillButtonActive]}
            onPress={() => filterLessonsByClass(classroom)}>
            <Text
              style={[
                styles.pillButtonText,
                selectedClass === classroom && styles.pillButtonTextActive,
              ]}>
              {classroom}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {filteredLessons !== null &&
        filteredLessons.map((item) => (
          <LessonCard key={item.id} lesson={item} teacherProfile={teacherProfile!} />
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
  buttonTitle: {
    color: Colors.primary,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 5,
  },
  container: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardSubtitle: {
    fontSize: 16,
  },
  dropdown: {
    marginTop: 8,
  },
  filterContainer: {
    maxHeight: 50,
    marginBottom: 16,
  },
  filterContentContainer: {
    paddingHorizontal: 4,
  },
  pillButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#2563EB',
  },
  pillButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  pillButtonTextActive: {
    color: '#FFFFFF',
  },
})

export default UpcomingLessons
