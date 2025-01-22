import { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'

import { Colors } from '@/constants/Colors'
import AddLearningDevelopmentEntry from './AddLearningDevelopmentEntry'
import { LearningDevelopment, LessonData } from '../LessonPlan'

interface LearningDevelopmentEntriesProps {
  lessonData: {
    learningDevelopmentEntries: LearningDevelopment[]
  }
  updateLessonData: (newData: Partial<LessonData>) => void
}

const LearningDevelopmentEntries: React.FC<LearningDevelopmentEntriesProps> = ({
  lessonData,
  updateLessonData,
}) => {
  const [showNewEntryModal, setShowNewEntryModal] = useState<boolean>(false)

  const toggleShowNewEntryModal = () => {
    setShowNewEntryModal(!showNewEntryModal)
  }

  const handleDeleteEntry = (entryToDelete: LearningDevelopment) => {
    const updatedEntries = lessonData.learningDevelopmentEntries.filter(
      (entry) => entry.id !== entryToDelete.id
    )
    updateLessonData({ learningDevelopmentEntries: updatedEntries })
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity style={styles.newEntryButton} onPress={toggleShowNewEntryModal}>
          <Text style={styles.newEntryButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      {lessonData.learningDevelopmentEntries.length === 0 ? (
        <View style={styles.noEntryContainer}>
          <Text style={{ textAlign: 'center' }}>No Entries Added</Text>
        </View>
      ) : (
        <ScrollView>
          {lessonData.learningDevelopmentEntries.map((entry) => (
            <View key={entry.id} style={styles.entryContainer}>
              <View style={{ flexDirection: 'column', gap: 4, width: '80%' }}>
                <View>
                  <Text style={styles.entryTitle}>Time:</Text>
                  <Text>{entry.time}</Text>
                </View>
                <Text style={styles.entryTitle}>Teacher Activities:</Text>
                <Text style={{ flexWrap: 'wrap' }}>{entry.teacherActivites}</Text>
                <Text style={styles.entryTitle}>Learner Activities:</Text>
                <Text style={{ flexWrap: 'wrap' }}>{entry.learnerActivities}</Text>
              </View>
              <>
                <TouchableOpacity onPress={() => handleDeleteEntry(entry)}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </>
            </View>
          ))}
        </ScrollView>
      )}
      {showNewEntryModal && (
        <AddLearningDevelopmentEntry
          isVisible={showNewEntryModal}
          onClose={toggleShowNewEntryModal}
          lessonData={lessonData}
          updateLessonData={updateLessonData}
        />
      )}
    </View>
  )
}

export default LearningDevelopmentEntries

const styles = StyleSheet.create({
  noEntryContainer: {
    backgroundColor: '#fff',
    padding: 20,
  },
  newEntryButton: {
    backgroundColor: Colors.primary,
    marginBottom: 20,
    width: 70,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  newEntryButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  entryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
    backgroundColor: '#fff',
    borderWidth: 0.2,
    borderRadius: 3,
    borderColor: '#222',
    padding: 10,
    marginBottom: 10,
  },
  entryTitle: {
    fontWeight: '500',
  },
  deleteButtonText: {
    color: 'red',
  },
})
