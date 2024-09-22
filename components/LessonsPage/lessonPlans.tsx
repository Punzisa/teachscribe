import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { View } from 'react-native'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useRouter } from 'expo-router'
import CustomDropdown from './CustomDropdown'
import { Colors } from '@/constants/Colors'

interface lesson {
  id: string
  title: string
  description: string
  activity: string
}

interface LessonProps {
  lesson: lesson
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
    { id: '5', title: 'Submit' },
  ]

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
              <TouchableOpacity key={item.id}>
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

  const lessons = [
    {
      id: '1',
      title: 'Waves as Energy',
      description: 'Description for Lesson 1',
      activity: 'Activity for Lesson 1',
    },
    {
      id: '2',
      title: 'Matter',
      description: 'Description for Lesson 2',
      activity: 'Activity for Lesson 2',
    },
    {
      id: '3',
      title: 'Physical Quantities',
      description: 'Description for Lesson 3',
      activity: 'Activity for Lesson 3',
    },
    {
      id: '4',
      title: 'Radioactivity',
      description: 'Description for Lesson 4',
      activity: 'Activity for Lesson 4',
    },
  ]

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.sectionTitle}>Classroom</Text>
        <CustomDropdown options={options} placeholder="Select Classroom" />
      </View>
      <View style={styles.lessons}>
        <Text style={styles.sectionTitle}>Lessons</Text>
        {lessons.map((lesson) => (
          <Lesson key={lesson.id} lesson={lesson} />
        ))}
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

  classroom: {},
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
