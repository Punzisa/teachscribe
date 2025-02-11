import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import CardButton from './CardButton'

const GetStarted = () => {
  const data = [
    {
      id: '1',
      text: 'Lesson Plans',
      description: 'Create and manage your lesson plans',
      route: '(lesson)/lesson_plans',
      colors: ['#893E9C', '#F82B73'],
      icon: 'book-outline',
    },
    {
      id: '2',
      text: 'Schemes of Work',
      description: 'Organize your teaching schedule',
      route: '/(schemes_of_work)/schemes_of_work',
      colors: ['#548AD8', '#8A4BD3'],
      icon: 'calendar-outline',
    },
    {
      id: '3',
      text: 'Records of Work',
      description: 'Track your teaching progress',
      route: '/(records_of_work)/records_of_work',
      colors: ['#065867', '#4683D3'],
      icon: 'document-text-outline',
    },
  ]

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Get Started</Text>
        <Text style={styles.subtitle}>Choose what you want to work on</Text>
      </View>
      <View style={styles.gridContainer}>
        {data.map((item) => (
          <View key={item.id} style={styles.gridItem}>
            <CardButton
              text={item.text}
              description={item.description}
              route={item.route}
              colors={item.colors}
              icon={item.icon}
            />
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  gridItem: {
    width: '100%',
    height: 120,
  },
})

export default GetStarted
