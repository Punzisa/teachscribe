import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useColorScheme } from '@/hooks/useColorScheme'
import ClassroomDropdown from './ClassroomDropdown'
import { Colors } from '@/constants/Colors'
import { dataChangeSubject, loadList, removeFromList } from '@/context/storage'

export interface Lesson {
  id: string
  title: string
  subject: string
  description: string
  activity: string
  classroom: string
}

interface LessonProps {
  lesson: Lesson
}

const Lesson: React.FC<LessonProps> = ({ lesson }) => {
  const colorScheme = useColorScheme()
  const [showDropdown, setShowDropdown] = useState(false)

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  const buttons = [
    { id: '1', title: 'Edit' },
    { id: '2', title: 'Export' },
    { id: '3', title: 'Copy' },
    { id: '4', title: 'View' },
    { id: '5', title: 'Delete' },
    { id: '6', title: 'Submit' },
  ]

  const handlePress = (button: string) => {
    if (button === 'Delete') {
      removeFromList('lessons', lesson.id)
    }
  }

  return (
    <View style={styles.lessonContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.lessonTitle}>{lesson.title}</Text>
        <TouchableOpacity key={lesson.id} onPress={toggleDropdown}>
          <Ionicons
            name={showDropdown ? 'chevron-up' : 'chevron-down'}
            size={24}
            color={colorScheme === 'dark' ? 'white' : 'black'}
          />
        </TouchableOpacity>
      </View>
      {showDropdown && (
        <View>
          <View style={styles.lessonButtons}>
            {buttons.map((item) => (
              <TouchableOpacity key={item.id} onPress={() => handlePress(item.title)}>
                <Text style={styles.lessonButtonText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.lessonSubTitles}>Description</Text>
          <Text>{lesson.description}</Text>
          <View style={{ height: 10 }} />
          <Text style={styles.lessonSubTitles}>Activity</Text>
          <Text>{lesson.activity}</Text>
        </View>
      )}
    </View>
  )
}

export default function LessonPlans() {
  const options = [
    { id: '1', label: '12-4' },
    { id: '2', label: '12-6' },
    { id: '3', label: '11-6' },
    { id: '4', label: '10-3' },
  ]

  const [lessons, setLessons] = useState<Lesson[] | null>(null)
  const [selectedClassroom, setSelectedClassroom] = useState<string>('')
  const [classroomOptions, setClassroomOptions] = useState<{ id: string; label: string }[]>([])

  const handleClassroomSelect = (value: string) => {
    setSelectedClassroom(value)
  }

  const getData = async () => {
    const loadedData = await loadList<Lesson>('lessons')
    setLessons(loadedData)

    // Generate classroom options from loaded data
    const uniqueClassrooms = Array.from(new Set(loadedData?.map((lesson) => lesson.classroom)))
    const newOptions = uniqueClassrooms.map((classroom, index) => ({
      id: (index + 1).toString(),
      label: classroom,
    }))
    setClassroomOptions(newOptions)
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
    (lesson) => selectedClassroom === '' || lesson.classroom === selectedClassroom
  )

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.sectionTitle}>Classroom</Text>
        <ClassroomDropdown
          options={classroomOptions}
          onSelect={handleClassroomSelect}
          placeholder="Select Classroom"
        />
      </View>
      <View style={styles.lessons}>
        <Text style={styles.sectionTitle}>Lessons</Text>
        {selectedClassroom &&
          filteredLessons &&
          filteredLessons.map((lesson) => <Lesson key={lesson.id} lesson={lesson} />)}
        {!selectedClassroom && (
          <View style={styles.selectClassroom}>
            <Text style={styles.selectClassroomText}>Classroom not selected</Text>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  lessonContainer: {
    padding: 10,
    backgroundColor: 'white',
  },

  selectClassroom: {
    backgroundColor: 'white',
    padding: 20,
  },
  selectClassroomText: {
    fontSize: 16,
    textAlign: 'center',
  },
  lessons: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lessonTitle: {
    fontSize: 17,
    fontWeight: '400',
  },
  lessonSubTitles: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 5,
  },
  lessonButtons: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,
    borderBottomWidth: 1,
    gap: 8,
    borderBottomColor: '#D5D8DE',
    marginBottom: 10,
  },
  lessonButtonText: {
    color: Colors.primary,
    fontSize: 16,
  },
})
