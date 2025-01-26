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

  const validateROWData = (data: ROWData): string[] => {
    const errors: string[] = []

    // Validate basic fields
    if (!data.subject.trim()) errors.push('Subject is required')
    if (!data.grade.trim()) errors.push('Grade is required')
    if (!data.term.trim()) errors.push('Term is required')
    if (!data.year.trim()) errors.push('Year is required')

    // Validate entries
    if (data.entries.length === 0) {
      errors.push('At least one weekly entry is required')
    } else {
      data.entries.forEach((entry, index) => {
        if (!entry.week.trim()) errors.push(`Week is required for entry ${index + 1}`)
        if (!entry.workCovered.trim())
          errors.push(`Work covered is required for entry ${index + 1}`)
      })
    }

    return errors
  }

  const handleSubmit = () => {
    const validationErrors = validateROWData(rowData)

    if (validationErrors.length > 0) {
      alert('Please fix the following errors:\n\n' + validationErrors.join('\n'))
      return
    }

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
