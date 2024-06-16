import { View, Text } from 'react-native'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps'

import {
  nextBtnStyle,
  previousBtnStyle,
  containerStyles,
} from '@/components/forms/LessonPlan/constants'
import { primary } from '@/constants/Colors'
import LessonDetails from '@/components/forms/LessonPlan/LessonDetails'

export default function LessonPlan() {
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
          <LessonDetails />
        </View>
      </ProgressStep>
      <ProgressStep
        label="Lesson Objectives"
        onNext={() => {}}
        onPrevious={() => {}}
        nextBtnTextStyle={nextBtnStyle}
        previousBtnTextStyle={previousBtnStyle}>
        <View style={{ alignItems: 'center' }}>
          <Text>Lesson Objectives</Text>
        </View>
      </ProgressStep>
      <ProgressStep
        label="Activities"
        onPrevious={() => {}}
        onSubmit={() => {}}
        nextBtnTextStyle={nextBtnStyle}
        previousBtnTextStyle={previousBtnStyle}>
        <View style={{ alignItems: 'center' }}>
          <Text>Activities</Text>
        </View>
      </ProgressStep>
    </ProgressSteps>
  )
}
