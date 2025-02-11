import { Text, View, StyleSheet, ScrollView } from 'react-native'
import TextInputField from '@/components/forms/LessonPlan/TextInputField'
import { ROWData } from './CreateRecordsOfWork'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

interface ROWDetailsProps {
  SOWData: ROWData
  updateSOWData: (newData: Partial<ROWData>) => void
}

const ROWDetails: React.FC<ROWDetailsProps> = ({ SOWData, updateSOWData }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Subject Field */}
          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Ionicons name="book-outline" size={20} color={Colors.primary} />
              <Text style={styles.label}>Subject</Text>
            </View>
            <TextInputField
              setTextValue={SOWData.subject}
              onInputChange={(text: string) => updateSOWData({ subject: text })}
              placeholder="Enter subject name"
            />
          </View>

          {/* Grade Field */}
          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Ionicons name="school-outline" size={20} color={Colors.primary} />
              <Text style={styles.label}>Grade</Text>
            </View>
            <TextInputField
              setTextValue={SOWData.grade}
              onInputChange={(text: string) => updateSOWData({ grade: text })}
              placeholder="Enter grade level"
            />
          </View>

          {/* Term Field */}
          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Ionicons name="calendar-outline" size={20} color={Colors.primary} />
              <Text style={styles.label}>Term</Text>
            </View>
            <TextInputField
              setTextValue={SOWData.term}
              onInputChange={(text: string) => updateSOWData({ term: text })}
              placeholder="Enter term"
            />
          </View>

          {/* Year Field */}
          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Ionicons name="time-outline" size={20} color={Colors.primary} />
              <Text style={styles.label}>Year</Text>
            </View>
            <TextInputField
              setTextValue={SOWData.year}
              onInputChange={(text: string) => updateSOWData({ year: text })}
              placeholder="Enter academic year"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    padding: 16,
    gap: 24,
  },
  formSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    gap: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  inputGroup: {
    gap: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4A5568',
  },
  input: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
})

export default ROWDetails
