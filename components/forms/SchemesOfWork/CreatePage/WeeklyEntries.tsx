import { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Weekly Entries</Text>
        <TouchableOpacity style={styles.addButton} onPress={toggleShowNewEntryModal}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.entriesContainer} showsVerticalScrollIndicator={false}>
        {sowData.entries.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Ionicons name="calendar-outline" size={48} color={Colors.primary} />
            <Text style={styles.emptyStateText}>No Entries Added</Text>
            <Text style={styles.emptyStateSubtext}>
              Tap the "Add Entry" button to create your first weekly entry
            </Text>
          </View>
        ) : (
          <View style={styles.entriesList}>
            {sowData.entries.map((entry) => (
              <View key={entry.id} style={styles.entryCard}>
                <View style={styles.weekBadge}>
                  <Text style={styles.weekBadgeText}>Week {entry.week}</Text>
                </View>
                <View style={styles.entryContent}>
                  <Text style={styles.learningOutcomeTitle}>Learning Outcome:</Text>
                  <Text style={styles.learningOutcomeText}>{entry.learningOutcome}</Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteEntry(entry)}>
                  <Ionicons name="trash-outline" size={20} color={Colors.primary} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
    gap: 8,
  },

  entriesContainer: {
    flex: 1,
    padding: 16,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 32,
    marginTop: 20,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
  },
  entriesList: {
    gap: 16,
  },
  entryCard: {
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
  weekBadge: {
    backgroundColor: Colors.primary + '20', // Adding 20% opacity
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 12,
  },
  weekBadgeText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  entryContent: {
    gap: 8,
  },
  learningOutcomeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
  },
  learningOutcomeText: {
    fontSize: 16,
    color: '#2D3748',
    lineHeight: 24,
  },
  deleteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
  },
})

export default WeeklyEntries
