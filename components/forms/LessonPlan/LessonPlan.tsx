import { View } from 'react-native'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps'

import {
  nextBtnStyle,
  previousBtnStyle,
  containerStyles,
} from '@/components/forms/LessonPlan/constants'
import { primary } from '@/constants/Colors'
import LessonDetails from '@/components/forms/LessonPlan/LessonDetails'
import LessonObjectives from '@/components/forms/LessonPlan/LessonObjectives'
import Activities, { ActivitiesType } from './Activities'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { addNewItem } from '@/context/storage'

export interface LessonData {
  id: string
  title: string
  description: string
  duration: string
  subject: string
  class: string
  objectives: string[]
  activities: ActivitiesType
}

export default function LessonPlan() {
  const router = useRouter()
  const [lessonData, setLessonData] = useState<LessonData>({
    id: '',
    title: '',
    description: '',
    duration: '',
    subject: '',
    class: '',
    objectives: [],
    activities: {
      teachingAids: '',
      teachingActivities: '',
      pupilActivities: '',
    },
  })

  const updateLessonData = (newData: Partial<LessonData>) => {
    setLessonData((prevData) => ({ ...prevData, ...newData }))
  }

  const handleSubmit = () => {
    console.log('Submitting lesson data:', lessonData)
    addNewItem('lessons', lessonData)
    router.push(`/(lesson)/creating_lesson`)
  }
  return (
    <ProgressSteps
      activeStepIconBorderColor={primary}
      activeLabelColor={primary}
      activeStepNumColor={primary}
      completedStepIconColor={primary}
      completedProgressBarColor={primary}>
      <ProgressStep
        label="Lesson Details"
        onNext={() => {}}
        onPrevious={() => {}}
        nextBtnTextStyle={nextBtnStyle}
        previousBtnTextStyle={previousBtnStyle}>
        <View style={containerStyles.container}>
          <LessonDetails lessonData={lessonData} updateLessonData={updateLessonData} />
        </View>
      </ProgressStep>
      <ProgressStep
        label="Lesson Objectives"
        onNext={() => {}}
        onPrevious={() => {}}
        nextBtnTextStyle={nextBtnStyle}
        previousBtnTextStyle={previousBtnStyle}>
        <View style={containerStyles.container}>
          <LessonObjectives lessonData={lessonData} updateLessonData={updateLessonData} />
        </View>
      </ProgressStep>
      <ProgressStep
        label="Activities"
        onPrevious={() => {}}
        onSubmit={handleSubmit}
        nextBtnTextStyle={nextBtnStyle}
        previousBtnTextStyle={previousBtnStyle}>
        <View style={containerStyles.container}>
          <Activities lessonData={lessonData} updateLessonData={updateLessonData} />
        </View>
      </ProgressStep>
    </ProgressSteps>
  )
}
