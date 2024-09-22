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
import Activities from './Activities'
import { useRouter } from 'expo-router'

export default function LessonPlan() {
  const router = useRouter();
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
        <View style={containerStyles.container}>
          <LessonObjectives />
        </View>
      </ProgressStep>
      <ProgressStep
        label="Activities"
        onPrevious={() => {}}
        onSubmit={() => {router.replace(`/(lesson)/creating_lesson`)}}
        nextBtnTextStyle={nextBtnStyle}
        previousBtnTextStyle={previousBtnStyle}>
        <View style={containerStyles.container}>
          <Activities />
        </View>
      </ProgressStep>
    </ProgressSteps>
  )
}
