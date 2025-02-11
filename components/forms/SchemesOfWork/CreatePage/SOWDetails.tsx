import { Text, View, StyleSheet, ScrollView } from 'react-native'
import TextInputField from '@/components/forms/LessonPlan/TextInputField'
import { SOWData } from './CreateSchemesOfWork'
import { primary } from '@/constants/Colors'

interface SOWDetailsProps {
  SOWData: SOWData
  updateSOWData: (newData: Partial<SOWData>) => void
}

const SOWDetails: React.FC<SOWDetailsProps> = ({ SOWData, updateSOWData }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.formContainer}>
        {/* Academic Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Academic Information</Text>
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Subject</Text>
              <TextInputField
                setTextValue={SOWData.subject}
                onInputChange={(text: string) => updateSOWData({ subject: text })}
                placeholder="Enter subject"
              />
            </View>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Grade</Text>
              <TextInputField
                setTextValue={SOWData.grade}
                onInputChange={(text: string) => updateSOWData({ grade: text })}
                placeholder="Enter grade"
              />
            </View>
          </View>
        </View>

        {/* Term Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Term Details</Text>
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Term</Text>
              <TextInputField
                setTextValue={SOWData.term}
                onInputChange={(text: string) => updateSOWData({ term: text })}
                placeholder="Enter term"
              />
            </View>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Year</Text>
              <TextInputField
                setTextValue={SOWData.year}
                onInputChange={(text: string) => updateSOWData({ year: text })}
                placeholder="Enter year"
              />
            </View>
          </View>
        </View>

        {/* Schedule Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Schedule</Text>
          <Text style={styles.label}>Periods Per Week</Text>
          <TextInputField
            setTextValue={SOWData.periodsPerWeek}
            onInputChange={(text: string) => updateSOWData({ periodsPerWeek: text })}
            placeholder="Enter number of periods per week"
          />
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
  formContainer: {
    padding: 16,
    gap: 24,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: primary,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  halfWidth: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2C3E50',
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
})

export default SOWDetails
