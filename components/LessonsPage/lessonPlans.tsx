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

interface LessonProps {
  lesson: LessonData
}

const Lessons: React.FC<LessonProps> = ({ lesson }) => {
  const colorScheme = useColorScheme()
  const [showDropdown, setShowDropdown] = useState(false)
  const router = useRouter()
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  const buttons = [
    // { id: '1', title: 'Edit' },
    { id: '2', title: 'Export' },
    // { id: '3', title: 'Copy' },
    { id: '4', title: 'View' },
    { id: '5', title: 'Delete' },
    // { id: '6', title: 'Submit' },
  ]

  const handlePress = (button: string) => {
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
          <Text style={styles.lessonSubTitles}>Teaching Activity</Text>
          <Text>{lesson.activities.teachingActivities}</Text>
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
    setLessons(loadedData)

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
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.sectionTitle}>Class</Text>
        <ClassDropdown
          options={classOptions}
          onSelect={handleClassSelect}
          placeholder="Select Class"
        />
      </View>
      <View style={styles.lessons}>
        <Text style={styles.sectionTitle}>Lessons</Text>
        {selectedClass &&
          filteredLessons &&
          filteredLessons.map((lesson) => <Lessons key={lesson.id} lesson={lesson} />)}
        {!selectedClass && (
          <View style={styles.selectClass}>
            <Text style={styles.selectClassText}>Class not selected</Text>
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

  selectClass: {
    backgroundColor: 'white',
    padding: 20,
  },
  selectClassText: {
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
