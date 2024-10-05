import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { LessonData } from '../forms/LessonPlan/LessonPlan'
import { dataChangeSubject, loadList } from '@/context/storage'

interface Lesson {
  id: string
  title: string
  grade: string
  subject: string
  approvalStatus: string
  feedback: string
}

const dummyData: Lesson[] = [
  {
    id: '1',
    title: 'Math Lesson 1',
    grade: 'Grade 5',
    subject: 'Mathematics',
    approvalStatus: 'Approved',
    feedback: 'Great progress!',
  },
  {
    id: '2',
    title: 'Science Lesson 2',
    grade: 'Grade 6',
    subject: 'Science',
    approvalStatus: 'Pending',
    feedback: 'Needs improvement in experiments.',
  },
]

const DropDownButton = ({ title, onPress }: { title: string; onPress: any }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.buttonTitle}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

const LessonCard: React.FC<{ lesson: LessonData }> = ({ lesson }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [heightAnimation] = useState(new Animated.Value(0))
  const router = useRouter()

  const toggleDropdown = () => {
    const toValue = isOpen ? 0 : 60
    setIsOpen(!isOpen)

    Animated.timing(heightAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }

  return (
    <LinearGradient
      colors={['#fffffc', '#c7c7c7']}
      start={{ x: 0.5, y: 0.6 }}
      end={{ x: 0.9, y: 0.9 }}
      style={styles.card}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={styles.cardTitle}>{lesson.title}</Text>
          <Text style={styles.cardSubtitle}>
            {lesson.class}
          </Text>
        </View>
        <TouchableOpacity onPress={toggleDropdown}>
          <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={28} color={'black'} />
        </TouchableOpacity>
      </View>
      <Animated.View style={[styles.dropdown, { height: heightAnimation }]}>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
          <DropDownButton title="Edit" onPress={() => alert('Edit')} />
          <DropDownButton
            title="View"
            onPress={() => router.push({
              pathname: '/(lesson)/view_lesson',
              params: { lesson: JSON.stringify(lesson) },
            })}
          />
          {/* <DropDownButton title="Submit" onPress={() => alert('Submit lesson')} /> */}
        </View>
        <Text>Description: {lesson.description}</Text>
        <Text>Teaching Activites: {lesson.activities.teachingActivities}</Text>
      </Animated.View>
    </LinearGradient>
  )
}

const UpcomingLessons = () => {
  const [lessons, setLessons] = useState<LessonData[] | null>(null)

  const getData = async () => {
    const loadedData = await loadList<LessonData>('lessons')
    setLessons(loadedData)
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

  const topTwoLessons = lessons?.slice(0,2)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Lessons</Text>
      {topTwoLessons !== undefined && topTwoLessons.map((item) => (
        <LessonCard key={item.id} lesson={item} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  buttonTitle: {
    color: Colors.primary,
    fontSize: 16,
    marginBottom: 5,
  },
  container: {
    padding: 16,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#444',
  },
  dropdown: {
    marginTop: 8,
  },
})

export default UpcomingLessons
