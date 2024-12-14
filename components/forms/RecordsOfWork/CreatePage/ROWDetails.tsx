import { Text, View } from 'react-native'
import TextInputField from '@/components/forms/LessonPlan/TextInputField'
import { ROWData } from './CreateRecordsOfWork'

interface SOWDetailsProps {
  SOWData: ROWData
  updateSOWData: (newData: Partial<ROWData>) => void
}
const ROWDetails: React.FC<SOWDetailsProps> = ({ SOWData, updateSOWData }) => {
  return (
    <View style={{ gap: 10 }}>
      <Text>Subject:</Text>
      <TextInputField
        setTextValue={SOWData.subject}
        onInputChange={(text: string) => updateSOWData({ subject: text })}
        placeholder="Subject"
      />
      <Text>Grade:</Text>
      <TextInputField
        setTextValue={SOWData.grade}
        onInputChange={(text: string) => updateSOWData({ grade: text })}
        placeholder="Grade"
      />
      <Text>Term:</Text>

      <TextInputField
        setTextValue={SOWData.term}
        onInputChange={(text: string) => updateSOWData({ term: text })}
        placeholder="Term"
      />
      <Text>Year:</Text>
      <TextInputField
        setTextValue={SOWData.year}
        onInputChange={(text: string) => updateSOWData({ year: text })}
        placeholder="Year"
      />
    </View>
  )
}

export default ROWDetails
