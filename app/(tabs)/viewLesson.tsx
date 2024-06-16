import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { View } from 'react-native'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { useColorScheme } from '@/hooks/useColorScheme'

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
  const colorScheme = useColorScheme();
  
  const closeButtonPressed = () => {
    console.log('Icon pressed');
  };
  return (
    <ScrollView className="mt-10 min-h-screen flex-1">
      <ThemedView style={styles.container} className="">
        <View className="mb-2 flex flex-row justify-between items-center">
          <View className="flex flex-row items-center justify-between gap-6">
            <ThemedView style={styles.titleContainer}>
              <ThemedText type="subtitle">Summary</ThemedText>
            </ThemedView>
            <View className={` ${colorScheme == 'light'? 'bg-green-400 text-yellow-800' : 'bg-green-600' }  rounded-lg  p-1.5`}>
              <Text className=''>{lessonData.status}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={closeButtonPressed}>
            <Ionicons name="close" size={28} color={colorScheme === 'light'? 'black': 'white'} />
          </TouchableOpacity>
        </View>
        <View className="mb-4">
          <View className="flex flex-row gap-2">
            <ThemedText type="defaultSemiBold">Lesson Name:</ThemedText>
            <ThemedText>{lessonData.lessonName}</ThemedText>
          </View>
          <View className="flex flex-row gap-4">
            <ThemedText type="defaultSemiBold">School Name:</ThemedText>
            <ThemedText>{lessonData.schoolName}</ThemedText>
          </View>
          <View className="flex flex-row gap-4">
            <ThemedText type="defaultSemiBold">Teacher Name:</ThemedText>
            <ThemedText>{lessonData.teacherName}</ThemedText>
          </View>
          <View className="flex flex-row gap-4">
            <ThemedText type="defaultSemiBold">Date:</ThemedText>
            <ThemedText>{lessonData.date.toDateString()}</ThemedText>
          </View>
        </View>

        <View className="mb-16 flex flex-col gap-2">
          <ThemedText type="defaultSemiBold">Lesson Objectives</ThemedText>
          <ThemedText>{lessonData.lessonObjectives}</ThemedText>

          <ThemedText type="defaultSemiBold">Teaching Aids</ThemedText>
          <ThemedText>{lessonData.teachingAids}</ThemedText>

          <ThemedText type="defaultSemiBold">Teaching Activities</ThemedText>
          <ThemedText>{lessonData.teachingActivities}</ThemedText>

          <ThemedText type="defaultSemiBold">Pupil's Activities</ThemedText>
          <ThemedText>{lessonData.pupilActivities}</ThemedText>
        </View>
        <View className="flex flex-row gap-4">
          <ThemedText type="defaultSemiBold">Teacher's Signature:</ThemedText>
          <ThemedText>{lessonData.teachersSignature}</ThemedText>
        </View>

      </ThemedView>
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
