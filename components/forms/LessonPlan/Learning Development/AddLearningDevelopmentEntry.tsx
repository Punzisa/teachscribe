import { Modal, View, Text, Pressable, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import TextInputField from '../TextInputField'
import { Colors } from '@/constants/Colors'
import { LearningDevelopment, LessonData } from '../LessonPlan'

interface AddNewLearningDevelopmentEntryProps {
  isVisible: boolean
  onClose: () => void
  lessonData: {
    learningDevelopmentEntries: LearningDevelopment[]
  }
  updateLessonData: (newData: Partial<LessonData>) => void
}

export default function AddLearningDevelopmentEntry({
  isVisible,
  onClose,
  lessonData,
  updateLessonData: updateSOWData,
}: AddNewLearningDevelopmentEntryProps) {
  const [entry] = useState<LearningDevelopment>({
    id: '',
    time: '',
    teacherActivites: '',
    learnerActivities: '',
  })

  const validateEntry = () => {
    return (
      entry.time.length > 0 &&
      entry.teacherActivites.length > 0 &&
      entry.learnerActivities.length > 0
    )
  }

  const handleSaveEntryModal = () => {
    if (validateEntry()) {
      entry.id = new Date().toISOString()
      updateSOWData({
        learningDevelopmentEntries: [...lessonData.learningDevelopmentEntries, entry],
      })
      onClose()
    } else {
      Alert.alert('Invalid Entry', 'Please fill in all required fields before saving.', [
        {
          text: 'OK',
          style: 'default',
        },
      ])
    }
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
          <Text>Time:</Text>
          <TextInputField
            setTextValue={entry.time}
            onInputChange={(text: string) => (entry.time = text)}
            placeholder="Time"
          />
          <Text>Teacher Activities:</Text>
          <TextInputField
            setTextValue={entry.teacherActivites}
            onInputChange={(text: string) => (entry.teacherActivites = text)}
            placeholder="Teacher Activities"
            multiline
          />
          <Text>Learner Activities:</Text>
          <TextInputField
            setTextValue={entry.learnerActivities}
            onInputChange={(text: string) => (entry.learnerActivities = text)}
            placeholder="Learner Activities"
            multiline
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
