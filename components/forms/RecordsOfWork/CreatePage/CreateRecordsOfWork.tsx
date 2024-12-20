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
import ROWDetails from './ROWDetails'
import WeeklyEntries from './WeeklyEntries'

export interface ROWEntry {
  id: string
  week: string
  workCovered: string
  commentsOnResourcesReferences: string
  methodStrategies: string
  commentsOnLearnersProgress: string
  hodRemarks: string
}
export interface ROWData {
  id: string
  subject: string
  grade: string
  term: string
  year: string
  entries: ROWEntry[]
}

export default function CreateRecordsOfWork() {
  const router = useRouter()
  const [rowData, setRowData] = useState<ROWData>({
    id: new Date().toISOString(),
    subject: '',
    grade: '',
    term: '',
    year: new Date().getFullYear().toString(),
    entries: [],
  })

  const updateSOWData = (newData: Partial<ROWData>) => {
    setRowData((prevData) => ({ ...prevData, ...newData }))
  }

  const handleSubmit = () => {
    console.log('Submitting schemes of work data:', rowData)
    addNewItem('records_of_work', rowData)
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
        label="Records of Work Details"
        onNext={() => {}}
        onPrevious={() => {}}
        nextBtnTextStyle={nextBtnStyle}
        previousBtnTextStyle={previousBtnStyle}>
        <View style={containerStyles.container}>
          <ROWDetails SOWData={rowData} updateSOWData={updateSOWData} />
        </View>
      </ProgressStep>
      <ProgressStep
        label="Week Entries"
        onPrevious={() => {}}
        onSubmit={handleSubmit}
        nextBtnTextStyle={nextBtnStyle}
        previousBtnTextStyle={previousBtnStyle}>
        <View style={containerStyles.container}>
          <WeeklyEntries rowData={rowData} updateSOWData={updateSOWData} />
        </View>
      </ProgressStep>
    </ProgressSteps>
  )
}
