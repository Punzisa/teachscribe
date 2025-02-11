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
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import TextInputField from '../../LessonPlan/TextInputField'
import { Colors } from '@/constants/Colors'
import { ROWData, ROWEntry } from './CreateRecordsOfWork'

interface AddWeekEntryProps {
  isVisible: boolean
  onClose: () => void
  rowData: {
    entries: ROWEntry[]
  }
  updateROWData: (newData: Partial<ROWData>) => void
}

export default function AddWeekEntry({
  isVisible,
  onClose,
  rowData,
  updateROWData,
}: AddWeekEntryProps) {
  const [entry] = useState<ROWEntry>({
    id: '',
    week: '',
    workCovered: '',
    commentsOnResourcesReferences: '',
    methodStrategies: '',
    commentsOnLearnersProgress: '',
    hodRemarks: '',
  })

  const validateEntry = () => {
    type RequiredFields = Pick<
      ROWEntry,
      | 'week'
      | 'workCovered'
      | 'commentsOnResourcesReferences'
      | 'methodStrategies'
      | 'commentsOnLearnersProgress'
      | 'hodRemarks'
    >

    const requiredFields: Record<keyof RequiredFields, string> = {
      week: 'Week Number',
      workCovered: 'Work Covered',
      commentsOnResourcesReferences: 'Resources & References',
      methodStrategies: 'Method Strategies',
      commentsOnLearnersProgress: "Learners' Progress",
      hodRemarks: "HOD's Remarks",
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

  const handleSaveEntryModal = () => {
    const validation = validateEntry()

    if (validation.isValid) {
      entry.id = new Date().toISOString()
      updateROWData({ entries: [...rowData.entries, entry] })
      onClose()
    } else {
      Alert.alert(
        'Incomplete Entry',
        `Please fill in the following required fields:\n\n${validation.missingFields.join('\n')}`,
        [{ text: 'OK', style: 'default' }]
      )
    }
  }

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add Weekly Entry</Text>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#64748B" />
            </Pressable>
          </View>

          {/* Form Content */}
          <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.formContent}>
              {/* Week Input */}
              <View style={styles.inputGroup}>
                <View style={styles.labelContainer}>
                  <Ionicons name="calendar-outline" size={20} color={Colors.primary} />
                  <Text style={styles.label}>Week</Text>
                </View>
                <TextInputField
                  setTextValue={entry.week}
                  onInputChange={(text: string) => (entry.week = text)}
                  placeholder="Enter week number"
                />
              </View>

              {/* Work Covered Input */}
              <View style={styles.inputGroup}>
                <View style={styles.labelContainer}>
                  <Ionicons name="book-outline" size={20} color={Colors.primary} />
                  <Text style={styles.label}>Work Covered</Text>
                </View>
                <TextInputField
                  setTextValue={entry.workCovered}
                  onInputChange={(text: string) => (entry.workCovered = text)}
                  placeholder="Describe work covered"
                  multiline
                />
              </View>

              {/* Resources Input */}
              <View style={styles.inputGroup}>
                <View style={styles.labelContainer}>
                  <Ionicons name="library-outline" size={20} color={Colors.primary} />
                  <Text style={styles.label}>Resources & References</Text>
                </View>
                <TextInputField
                  setTextValue={entry.commentsOnResourcesReferences}
                  onInputChange={(text: string) => (entry.commentsOnResourcesReferences = text)}
                  placeholder="Add comments on resources used"
                  multiline
                />
              </View>

              {/* Method Strategies Input */}
              <View style={styles.inputGroup}>
                <View style={styles.labelContainer}>
                  <Ionicons name="bulb-outline" size={20} color={Colors.primary} />
                  <Text style={styles.label}>Method Strategies</Text>
                </View>
                <TextInputField
                  setTextValue={entry.methodStrategies}
                  onInputChange={(text: string) => (entry.methodStrategies = text)}
                  placeholder="Describe teaching strategies"
                  multiline
                />
              </View>

              {/* Learners Progress Input */}
              <View style={styles.inputGroup}>
                <View style={styles.labelContainer}>
                  <Ionicons name="trending-up-outline" size={20} color={Colors.primary} />
                  <Text style={styles.label}>Learners' Progress</Text>
                </View>
                <TextInputField
                  setTextValue={entry.commentsOnLearnersProgress}
                  onInputChange={(text: string) => (entry.commentsOnLearnersProgress = text)}
                  placeholder="Comment on learners' progress"
                  multiline
                />
              </View>

              {/* HOD Remarks Input */}
              <View style={styles.inputGroup}>
                <View style={styles.labelContainer}>
                  <Ionicons name="chatbox-outline" size={20} color={Colors.primary} />
                  <Text style={styles.label}>HOD's Remarks</Text>
                </View>
                <TextInputField
                  setTextValue={entry.hodRemarks}
                  onInputChange={(text: string) => (entry.hodRemarks = text)}
                  placeholder="Add HOD's remarks"
                  multiline
                />
              </View>
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[styles.saveButton, !validateEntry() && styles.saveButtonDisabled]}
              onPress={handleSaveEntryModal}
              disabled={!validateEntry()}>
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
    maxHeight: '70%',
  },
  formContent: {
    padding: 16,
    gap: 20,
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
    padding: 12,
  },
  modalFooter: {
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
  saveButtonDisabled: {
    backgroundColor: '#A0AEC0',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
})
