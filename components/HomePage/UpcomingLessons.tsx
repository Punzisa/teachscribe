import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { LessonData } from '../forms/LessonPlan/LessonPlan'
import { dataChangeSubject, loadList } from '@/context/storage'
import HorizontalButtonList from './HorizontalButtonList'
import { generateAndSharePDF } from '../LessonsPage/lessonPlans'

const DropDownButton = ({ title, onPress }: { title: string; onPress: any }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.buttonTitle}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

const LessonCard: React.FC<{ lesson: LessonData }> = ({ lesson }) => {
  const router = useRouter()

  return (
    <LinearGradient
      colors={['#fffffc', '#dfdfdf', '#fffffc']}
      start={{ x: 0.3, y: 0.4 }}
      end={{ x: 0.9, y: 0.9 }}
      style={styles.card}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={styles.cardTitle}>{lesson.title}</Text>
          <Text style={styles.cardSubtitle}>{lesson.class}</Text>
        </View>
        <View>
          <DropDownButton
            title="View"
            onPress={() =>
              router.push({
                pathname: '/(lesson)/view_lesson',
                params: { lesson: JSON.stringify(lesson) },
              })
            }
          />
          <DropDownButton title="Export" onPress={() => generateAndSharePDF(lesson)} />
        </View>
      </View>
    </LinearGradient>
  )
}

const UpcomingLessons = () => {
  const [lessons, setLessons] = useState<LessonData[] | null>(null)

  const getData = async () => {
    const loadedData = await loadList<LessonData>('lessons')
    setLessons(loadedData)
  }
  useEffect(() => {
    getData()
    const subscription = dataChangeSubject.subscribe((changedKey) => {
      if (changedKey === 'lessons') {
        getData()
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const topTwoLessons = lessons?.slice(0, 2)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Lessons</Text>
      <HorizontalButtonList />
      {topTwoLessons !== undefined &&
        topTwoLessons.map((item) => <LessonCard key={item.id} lesson={item} />)}
    </View>
  )
}

const styles = StyleSheet.create({
  buttonTitle: {
    color: Colors.primary,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  container: {
    paddingHorizontal: 16,
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
    elevation: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardSubtitle: {
    fontSize: 16,
  },
  dropdown: {
    marginTop: 8,
  },
})

export default UpcomingLessons
