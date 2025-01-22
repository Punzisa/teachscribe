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
import Evaluation, { ActivitiesType } from './Evaluation'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { addNewItem } from '@/context/storage'
import LearningDevelopmentEntries from './Learning Development/LearningDevelopmentEntries'

export interface LearningDevelopment {
  id: string
  time: string
  teacherActivites: string
  learnerActivities: string
}
export interface LessonData {
  id: string
  title: string
  description: string
  duration: string
  subject: string
  class: string
  objectives: string[]
  activities: ActivitiesType
  date: Date
  resources: string
  references: string
  majorLearningOutcome: string
  evidenceOfAttainment: string
  rationale: string
  learningDevelopmentEntries: LearningDevelopment[]
  teacherEvaluation: string
  pupilEvaluation: string
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
    date: new Date(),
    resources: '',
    references: '',
    majorLearningOutcome: '',
    evidenceOfAttainment: '',
    rationale: '',
    learningDevelopmentEntries: [],
    teacherEvaluation: '',
    pupilEvaluation: '',
  })

  const updateLessonData = (newData: Partial<LessonData>) => {
    setLessonData((prevData) => ({ ...prevData, ...newData }))
  }

  const handleSubmit = () => {
    console.log('Submitting lesson data:', lessonData)
    addNewItem('lessons', lessonData)
    router.push(`/(lesson)/creating_document`)
  }
  return (
    <ProgressSteps
      activeStepIconBorderColor={primary}
      activeLabelColor={primary}
      activeStepNumColor={primary}
      completedStepIconColor={primary}
      completedProgressBarColor={primary}>
      <ProgressStep
        label="Details"
        onNext={() => {}}
        onPrevious={() => {}}
        nextBtnTextStyle={nextBtnStyle}
        previousBtnTextStyle={previousBtnStyle}>
        <View style={containerStyles.container}>
          <LessonDetails lessonData={lessonData} updateLessonData={updateLessonData} />
        </View>
      </ProgressStep>
      <ProgressStep
        label="Objectives"
        onNext={() => {}}
        onPrevious={() => {}}
        nextBtnTextStyle={nextBtnStyle}
        previousBtnTextStyle={previousBtnStyle}>
        <View style={containerStyles.container}>
          <LessonObjectives lessonData={lessonData} updateLessonData={updateLessonData} />
        </View>
      </ProgressStep>
      <ProgressStep
        label="Evaluation"
        onNext={() => {}}
        onPrevious={() => {}}
        nextBtnTextStyle={nextBtnStyle}
        previousBtnTextStyle={previousBtnStyle}>
        <View style={containerStyles.container}>
          <Evaluation lessonData={lessonData} updateLessonData={updateLessonData} />
        </View>
      </ProgressStep>
      <ProgressStep
        label="Lesson Development"
        onPrevious={() => {}}
        onSubmit={handleSubmit}
        nextBtnTextStyle={nextBtnStyle}
        previousBtnTextStyle={previousBtnStyle}>
        <View style={containerStyles.container}>
          <LearningDevelopmentEntries lessonData={lessonData} updateLessonData={updateLessonData} />
        </View>
      </ProgressStep>
    </ProgressSteps>
  )
}
