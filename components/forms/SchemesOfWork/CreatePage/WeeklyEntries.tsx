import { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

import { SOWData, SOWEntry } from './CreateSchemesOfWork'
import { Colors } from '@/constants/Colors'
import AddWeekEntry from './AddWeekEntry'

interface SOWProps {
  sowData: {
    entries: SOWEntry[]
  }
  updateSOWData: (newData: Partial<SOWData>) => void
}

const WeeklyEntries: React.FC<SOWProps> = ({ sowData, updateSOWData }) => {
  const [showNewEntryModal, setShowNewEntryModal] = useState<boolean>(false)

  const toggleShowNewEntryModal = () => {
    setShowNewEntryModal(!showNewEntryModal)
  }

  const handleDeleteEntry = (entryToDelete: SOWEntry) => {
    const updatedEntries = sowData.entries.filter((entry) => entry.id !== entryToDelete.id)
    updateSOWData({ entries: updatedEntries })
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity style={styles.newEntryButton} onPress={toggleShowNewEntryModal}>
          <Text style={styles.newEntryButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      {sowData.entries.length === 0 ? (
        <View style={styles.noEntryContainer}>
          <Text style={{ textAlign: 'center' }}>No Entries Added</Text>
        </View>
      ) : (
        <View>
          {sowData.entries.map((entry) => (
            <View key={entry.id} style={styles.entryContainer}>
              <View style={{ flexDirection: 'column', gap: 4, width: '80%' }}>
                <Text style={styles.weekText}>Week: {entry.week}</Text>
                <Text style={{ flexWrap: 'wrap' }}>{entry.learningOutcome}</Text>
              </View>
              <>
                <TouchableOpacity onPress={() => handleDeleteEntry(entry)}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </>
            </View>
          ))}
        </View>
      )}
      {showNewEntryModal && (
        <AddWeekEntry
          isVisible={showNewEntryModal}
          onClose={toggleShowNewEntryModal}
          sowData={sowData}
          updateSOWData={updateSOWData}
        />
      )}
    </View>
  )
}

export default WeeklyEntries

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
  weekText: {
    fontWeight: '500',
  },
  deleteButtonText: {
    color: 'red',
  },
})
