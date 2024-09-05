import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { View } from 'react-native'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useRouter } from 'expo-router'

interface LessonView {
  lessonName: string
  schoolName: string
  teacherName: string
  status: 'Approved' | 'Submitted' | 'Not yet submitted'
  date: Date
  lessonObjectives: string
  teachingAids: string
  teachingActivities: string
  pupilActivities: string
  teachersSignature: string
}

const lessonData: LessonView = {
  lessonName: 'Waves as Energy',
  schoolName: 'TeachScribe Secondary School',
  teacherName: 'Mr. Ngongo',
  date: new Date(),
  status: 'Approved',
  lessonObjectives:
    'Students will be able to describe the properties of electromagnetic waves, identify the sources of each of the rays in the electromagnetic spectrum and describe the method of detection of each of the main components of the electromagnetic spectrum.',
  teachingAids: 'Chart showing electromagnetic spectrum',
  teachingActivities: 'Give notes on chapters 2-3 from textbook and then give exercises 1 to 5.',
  pupilActivities:
    'Students will start the lesson with a fun and interactive game where they match fraction cards to visual representations. This activity aims to familiarize students with the concept of fractions in a tangible way.',
  teachersSignature: 'Mr. Ngongo',
}

export default function ViewLesson() {
  const colorScheme = useColorScheme()
  const router = useRouter()

  const closeButtonPressed = () => {
    router.replace('/(tabs)/')
  }
  return (
    <ScrollView className="mt-10 min-h-screen flex-1">
      <View style={styles.container} className="">
        <View className="mb-2 flex flex-row justify-between items-center">
          <View className="flex flex-row items-center justify-between gap-6">
            <View style={styles.titleContainer}>
              <Text>Summary</Text>
            </View>
            <View
              className={` ${colorScheme === 'light' ? 'bg-green-400 text-yellow-800' : 'bg-green-600'}  rounded-lg  p-1.5`}>
              <Text className="">{lessonData.status}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={closeButtonPressed}>
            <Ionicons name="close" size={28} color={colorScheme === 'light' ? 'black' : 'white'} />
          </TouchableOpacity>
        </View>
        <View className="mb-4">
          <View className="flex flex-row gap-2">
            <Text>Lesson Name:</Text>
            <Text>{lessonData.lessonName}</Text>
          </View>
          <View className="flex flex-row gap-4">
            <Text>School Name:</Text>
            <Text>{lessonData.schoolName}</Text>
          </View>
          <View className="flex flex-row gap-4">
            <Text>Teacher Name:</Text>
            <Text>{lessonData.teacherName}</Text>
          </View>
          <View className="flex flex-row gap-4">
            <Text>Date:</Text>
            <Text>{lessonData.date.toDateString()}</Text>
          </View>
        </View>

        <View className="mb-16 flex flex-col gap-2">
          <Text>Lesson Objectives</Text>
          <Text>{lessonData.lessonObjectives}</Text>

          <Text>Teaching Aids</Text>
          <Text>{lessonData.teachingAids}</Text>

          <Text>Teaching Activities</Text>
          <Text>{lessonData.teachingActivities}</Text>

          <Text>Pupil's Activities</Text>
          <Text>{lessonData.pupilActivities}</Text>
        </View>
        <View className="flex flex-row gap-4">
          <Text>Teacher's Signature:</Text>
          <Text>{lessonData.teachersSignature}</Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 100,
    minHeight: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  titles: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})
