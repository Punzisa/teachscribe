import { View } from 'react-native'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps'

import {
  nextBtnStyle,
  previousBtnStyle,
  containerStyles,
} from '@/components/forms/LessonPlan/constants'
import { primary } from '@/constants/Colors'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { addNewItem } from '@/context/storage'
import SOWDetails from './SOWDetails'
import WeeklyEntries from './WeeklyEntries'

export interface SOWEntry {
  id: string
  week: string
  topics: string
  learningOutcome: string
  methodology: string
  expectedExperiments: string
  reference: string
}
export interface SOWData {
  id: string
  subject: string
  grade: string
  term: string
  year: string
  periodsPerWeek: string
  entries: SOWEntry[]
}

export default function CreateSchemesOfWork() {
  const router = useRouter()
  const [sowData, setSowData] = useState<SOWData>({
    id: new Date().toISOString(),
    subject: '',
    grade: '',
    term: '',
    year: new Date().getFullYear().toString(),
    periodsPerWeek: '',
    entries: [],
  })

  const updateSOWData = (newData: Partial<SOWData>) => {
    setSowData((prevData) => ({ ...prevData, ...newData }))
  }

  const handleSubmit = () => {
    console.log('Submitting schemes of work data:', sowData)
    addNewItem('schemes_of_work', sowData)
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
        label="Schemes of Work Details"
        onNext={() => {}}
        onPrevious={() => {}}
        nextBtnTextStyle={nextBtnStyle}
        previousBtnTextStyle={previousBtnStyle}>
        <View style={containerStyles.container}>
          <SOWDetails SOWData={sowData} updateSOWData={updateSOWData} />
        </View>
      </ProgressStep>
      <ProgressStep
        label="Weekly Entries"
        onPrevious={() => {}}
        onSubmit={handleSubmit}
        nextBtnTextStyle={nextBtnStyle}
        previousBtnTextStyle={previousBtnStyle}>
        <View style={containerStyles.container}>
          <WeeklyEntries sowData={sowData} updateSOWData={updateSOWData} />
        </View>
      </ProgressStep>
    </ProgressSteps>
  )
}
