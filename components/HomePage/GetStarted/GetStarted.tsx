import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CardButton from './CardButton'

const GetStarted = () => {
  const data = [
    {
      id: '1',
      text: 'Lesson Plans',
      route: '(lesson)/lesson_plans',
      colors: ['#893E9C', '#F82B73'],
    },
    { id: '2', text: 'Schemes of Work', route: '/route2', colors: ['#548AD8', '#8A4BD3'] },
    { id: '3', text: 'Assessment', route: '/route3', colors: ['#065867', '#4683D3'] },
    { id: '4', text: 'How Tools', route: '/route4', colors: ['#F33E62', '#F79334'] },
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Get Started</Text>
      <View style={styles.gridContainer}>
        {data.map((item) => (
          <View key={item.id} style={styles.gridItem}>
            <CardButton text={item.text} route={item.route} colors={item.colors} />
          </View>
        ))}
      </View>
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
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    height: 80,
    marginBottom: 16,
  },
})

export default GetStarted
