import { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { ROWData, ROWEntry } from './CreateRecordsOfWork'
import { Colors } from '@/constants/Colors'
import AddWeekEntry from './AddWeekEntry'

interface ROWProps {
  rowData: {
    entries: ROWEntry[]
  }
  updateSOWData: (newData: Partial<ROWData>) => void
}

const WeeklyEntries: React.FC<ROWProps> = ({ rowData, updateSOWData }) => {
  const [showNewEntryModal, setShowNewEntryModal] = useState<boolean>(false)

  const toggleShowNewEntryModal = () => {
    setShowNewEntryModal(!showNewEntryModal)
  }

  const handleDeleteEntry = (entryToDelete: ROWEntry) => {
    const updatedEntries = rowData.entries.filter((entry) => entry.id !== entryToDelete.id)
    updateSOWData({ entries: updatedEntries })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Weekly Progress Records</Text>
          <Text style={styles.headerSubtitle}>Document and track learner progress</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={toggleShowNewEntryModal}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {rowData.entries.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Ionicons name="documents-outline" size={48} color={Colors.primary} />
            <Text style={styles.emptyStateTitle}>No Entries Yet</Text>
            <Text style={styles.emptyStateDescription}>
              Add your first weekly progress entry to get started
            </Text>
          </View>
        ) : (
          <View style={styles.entriesList}>
            {rowData.entries.map((entry) => (
              <View key={entry.id} style={styles.entryCard}>
                <View style={styles.weekBadge}>
                  <Ionicons name="time-outline" size={16} color={Colors.primary} />
                  <Text style={styles.weekBadgeText}>Week {entry.week}</Text>
                </View>

                <View style={styles.entryContent}>
                  <Text style={styles.entryTitle}>Progress Comments</Text>
                  <Text style={styles.entryText}>{entry.commentsOnLearnersProgress}</Text>
                </View>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteEntry(entry)}>
                  <Ionicons name="trash-outline" size={20} color="#DC2626" />
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
          rowData={rowData}
          updateROWData={updateSOWData}
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
    backgroundColor: '#FFFFFF',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#718096',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },

  contentContainer: {
    flex: 1,
    padding: 16,
  },
  emptyStateContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  weekBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: `${Colors.primary}15`,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
  },
  weekBadgeText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  entryContent: {
    gap: 8,
    paddingRight: 24,
  },
  entryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
  },
  entryText: {
    fontSize: 15,
    color: '#2D3748',
    lineHeight: 22,
  },
  deleteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
  },
})

export default WeeklyEntries
