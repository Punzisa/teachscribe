import { Modal, View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
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

  const validateEntry = () => {
    return (
      entry.expectedExperiments.length > 0 &&
      entry.methodology.length > 0 &&
      entry.topics.length > 0 &&
      entry.week.length > 0 &&
      entry.learningOutcome.length > 0 &&
      entry.reference.length > 0
    )
  }

  const handleSaveEntryModal = () => {
    if (validateEntry()) {
      entry.id = new Date().toISOString()
      updateSOWData({ entries: [...sowData.entries, entry] })
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
          <Text>Topics:</Text>
          <TextInputField
            setTextValue={entry?.topics}
            onInputChange={(text: string) => (entry.topics = text)}
            placeholder="Topics"
          />
          <Text>Learning Outcome:</Text>
          <TextInputField
            setTextValue={entry?.learningOutcome}
            onInputChange={(text: string) => (entry.learningOutcome = text)}
            placeholder="Learning Outcome"
          />
          <Text>Methodology:</Text>
          <TextInputField
            setTextValue={entry.methodology}
            onInputChange={(text: string) => (entry.methodology = text)}
            placeholder="Methodology"
          />
          <Text>Expected Experiments:</Text>
          <TextInputField
            setTextValue={entry.expectedExperiments}
            onInputChange={(text: string) => (entry.expectedExperiments = text)}
            placeholder="Expected Experiments"
          />
          <Text>Reference:</Text>
          <TextInputField
            setTextValue={entry.reference}
            onInputChange={(text: string) => (entry.reference = text)}
            placeholder="Reference"
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
