import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors, lightGrey } from '@/constants/Colors'

interface LessonObjectiveCardProps {
  objective: string
  onEdit: (objective: string) => void
  onDelete: (objective: string) => void
}

const LessonObjectiveCard: React.FC<LessonObjectiveCardProps> = ({
  objective,
  onEdit,
  onDelete,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.objectiveText}>{objective}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => onEdit(objective)}>
          <Ionicons name="pencil-outline" size={22} color={Colors.black} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(objective)}>
          <Ionicons name="close" size={22} color={Colors.black} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

interface LessonObjectivesListProps {
  lessonObjectives: string[]
  onEdit: (objective: string) => void
  onDelete: (objective: string) => void
}

const LessonObjectivesList: React.FC<LessonObjectivesListProps> = ({
  lessonObjectives,
  onEdit,
  onDelete,
}) => {
  return (
    <View>
      {lessonObjectives.map((objective, index) => (
        <LessonObjectiveCard
          key={index}
          objective={objective}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: lightGrey,
  },
  objectiveText: {
    fontSize: 14,
    flex: 1,
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default LessonObjectivesList
