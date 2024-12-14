import { Modal, View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
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
    return (
      entry.week.length > 0 &&
      entry.workCovered.length > 0 &&
      entry.commentsOnResourcesReferences.length > 0 &&
      entry.methodStrategies.length > 0 &&
      entry.commentsOnLearnersProgress.length > 0 &&
      entry.hodRemarks.length > 0
    )
  }

  const handleSaveEntryModal = () => {
    if (validateEntry()) {
      entry.id = new Date().toISOString()
      updateROWData({ entries: [...rowData.entries, entry] })
    }
    onClose()
  }
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#000" size={22} />
          </Pressable>
        </View>
        <View style={{ gap: 5 }}>
          <Text>Week:</Text>
          <TextInputField
            setTextValue={entry.week}
            onInputChange={(text: string) => (entry.week = text)}
            placeholder="Week"
          />
          <Text>Work Covered:</Text>
          <TextInputField
            setTextValue={entry.workCovered}
            onInputChange={(text: string) => (entry.workCovered = text)}
            placeholder="Work Covered"
          />
          <Text>Comments on Resources/References:</Text>
          <TextInputField
            setTextValue={entry.commentsOnResourcesReferences}
            onInputChange={(text: string) => (entry.commentsOnResourcesReferences = text)}
            placeholder="Comments on Resources/References"
          />
          <Text>Method Strategies:</Text>
          <TextInputField
            setTextValue={entry.methodStrategies}
            onInputChange={(text: string) => (entry.methodStrategies = text)}
            placeholder="Method Strategies"
          />
          <Text>Comments on Learners' Progress:</Text>
          <TextInputField
            setTextValue={entry.commentsOnLearnersProgress}
            onInputChange={(text: string) => (entry.commentsOnLearnersProgress = text)}
            placeholder="Comments on Learners' Progress"
          />
          <Text>HOD's Remarks:</Text>
          <TextInputField
            setTextValue={entry.hodRemarks}
            onInputChange={(text: string) => (entry.hodRemarks = text)}
            placeholder="HOD's Remarks"
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveEntryModal}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#ddd',
    borderRadius: 18,
    position: 'absolute',
    top: 20,
    left: 10,
    right: 10,
    padding: 10,
    width: 'auto',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  titleContainer: {
    height: 30,
    paddingTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
})
