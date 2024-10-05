import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'

interface Lesson {
  id: string
  title: string
  grade: string
  subject: string
  approvalStatus: string
  feedback: string
}

const dummyData: Lesson[] = [
  {
    id: '1',
    title: 'Math Lesson 1',
    grade: 'Grade 5',
    subject: 'Mathematics',
    approvalStatus: 'Approved',
    feedback: 'Great progress!',
  },
  {
    id: '2',
    title: 'Science Lesson 2',
    grade: 'Grade 6',
    subject: 'Science',
    approvalStatus: 'Pending',
    feedback: 'Needs improvement in experiments.',
  },
]

const DropDownButton = ({ title, onPress }: { title: string; onPress: any }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.buttonTitle}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

const LessonCard: React.FC<{ item: Lesson }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [heightAnimation] = useState(new Animated.Value(0))
  const router = useRouter()

  const toggleDropdown = () => {
    const toValue = isOpen ? 0 : 60
    setIsOpen(!isOpen)

    Animated.timing(heightAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }

  return (
    <LinearGradient
      colors={['#fffffc', '#e8e8e8']}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.7, y: 0.8 }}
      style={styles.card}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardSubtitle}>
            {item.grade} - {item.subject}
          </Text>
        </View>
        <TouchableOpacity onPress={toggleDropdown}>
          <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={28} color={'black'} />
        </TouchableOpacity>
      </View>
      <Animated.View style={[styles.dropdown, { height: heightAnimation }]}>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
          <DropDownButton title="Edit" onPress={() => alert('Edit')} />
          <DropDownButton
            title="View Lesson"
            onPress={() => router.push(`/(lesson)/view_lesson`)}
          />
          <DropDownButton title="Submit" onPress={() => alert('Submit lesson')} />
        </View>
        <Text>Status: {item.approvalStatus}</Text>
        <Text>Feedback: {item.feedback}</Text>
      </Animated.View>
      {/* </View> */}
    </LinearGradient>
  )
}

const UpcomingLessons = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Lessons</Text>
      {dummyData.map((item) => (
        <LessonCard key={item.id} item={item} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  buttonTitle: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: 'normal',
  },
  container: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'medium',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  dropdown: {
    marginTop: 8,
  },
})

export default UpcomingLessons
