import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { LessonData } from '../forms/LessonPlan/LessonPlan'
import { dataChangeSubject, loadList } from '@/context/storage'
import HorizontalButtonList from './HorizontalButtonList'
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
  const [lessons, setLessons] = useState<LessonData[] | null>(null)
  const [teacherProfile, setTeacherProfile] = useState<ProfileData | null>()
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
      date: new Date(lesson.date), // Convert string date to Date object
    }))
    setLessons(lessonsWithDateObjects!)
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

  const topTwoLessons = lessons?.slice(0, 2)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Lessons</Text>
      <HorizontalButtonList />
      {topTwoLessons !== undefined &&
        topTwoLessons.map((item) => (
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
})

export default UpcomingLessons
