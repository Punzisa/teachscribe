import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native'
import { useEffect, useState } from 'react'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import TextInputField from '../../LessonPlan/TextInputField'
import { Colors } from '@/constants/Colors'
import { SOWData, SOWEntry } from './CreateSchemesOfWork'

interface AddWeekEntryProps {
  isVisible: boolean
  onClose: () => void
  sowData: {
    entries: SOWEntry[]
  }
  updateSOWData: (newData: Partial<SOWData>) => void
}

export default function AddWeekEntry({
  isVisible,
  onClose,
  sowData,
  updateSOWData,
}: AddWeekEntryProps) {
  const [entry] = useState<SOWEntry>({
    id: '',
    expectedExperiments: '',
    methodology: '',
    topics: '',
    week: '',
    learningOutcome: '',
    reference: '',
  })
  const [isFormValid, setIsFormValid] = useState(false)

  const validateEntry = () => {
    type RequiredFields = Pick<
      SOWEntry,
      'week' | 'topics' | 'learningOutcome' | 'methodology' | 'expectedExperiments' | 'reference'
    >

    const requiredFields: Record<keyof RequiredFields, string> = {
      week: 'Week Number',
      topics: 'Topics',
      learningOutcome: 'Learning Outcome',
      methodology: 'Methodology',
      expectedExperiments: 'Expected Experiments',
      reference: 'Reference',
    }

    const missingFields = []

    for (const [key, label] of Object.entries(requiredFields) as [keyof RequiredFields, string][]) {
      if (!entry[key] || entry[key].trim().length === 0) {
        missingFields.push(label)
      }
    }

    return {
      isValid: missingFields.length === 0,
      missingFields,
    }
  }

  useEffect(() => {
    const validation = validateEntry()
    setIsFormValid(validation.isValid)
  }, [entry])

  const handleSaveEntryModal = () => {
    const validation = validateEntry()

    if (validation.isValid) {
      entry.id = new Date().toISOString()
      updateSOWData({ entries: [...sowData.entries, entry] })
      onClose()
    } else {
      Alert.alert(
        'Incomplete Entry',
        `Please fill in the following required fields:\n\n${validation.missingFields.join('\n')}`,
        [
          {
            text: 'OK',
            style: 'default',
          },
        ]
      )
    }
  }

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add Weekly Entry</Text>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <MaterialIcons name="close" color="#64748B" size={24} />
            </Pressable>
          </View>

          <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.inputSection}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Week</Text>
                <TextInputField
                  setTextValue={entry.week}
                  onInputChange={(text: string) => (entry.week = text)}
                  placeholder="Enter week number"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Topics</Text>
                <TextInputField
                  setTextValue={entry.topics}
                  onInputChange={(text: string) => (entry.topics = text)}
                  placeholder="Enter topics to be covered"
                  multiline
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Learning Outcome</Text>
                <TextInputField
                  setTextValue={entry.learningOutcome}
                  onInputChange={(text: string) => (entry.learningOutcome = text)}
                  placeholder="Enter expected learning outcomes"
                  multiline
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Methodology</Text>
                <TextInputField
                  setTextValue={entry.methodology}
                  onInputChange={(text: string) => (entry.methodology = text)}
                  placeholder="Enter teaching methodology"
                  multiline
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Expected Experiments</Text>
                <TextInputField
                  setTextValue={entry.expectedExperiments}
                  onInputChange={(text: string) => (entry.expectedExperiments = text)}
                  placeholder="Enter expected experiments"
                  multiline
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Reference</Text>
                <TextInputField
                  setTextValue={entry.reference}
                  onInputChange={(text: string) => (entry.reference = text)}
                  placeholder="Enter references"
                  multiline
                />
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveEntryModal}>
              <Ionicons name="save-outline" size={20} color="#FFF" />
              <Text style={styles.saveButtonText}>Save Entry</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '90%',
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
  },
  closeButton: {
    padding: 8,
  },
  formContainer: {
    maxHeight: '80%',
  },
  inputSection: {
    padding: 16,
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4A5568',
  },
  input: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
})
