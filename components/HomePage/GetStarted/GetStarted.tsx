import React from 'react'
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native'
import CardButton from './CardButton'

const { width } = Dimensions.get('screen')
const cardWidth = width / 2 - 20 - 5 // Adjust size as needed

const GetStarted = () => {
  const data = [
    {
      id: '1',
      text: 'Lesson Plans',
      route: '(lesson)/view_lesson',
      colors: ['#893E9C', '#F82B73'],
    },
    { id: '2', text: 'Schemes of Work', route: '/route2', colors: ['#548AD8', '#8A4BD3'] },
    { id: '3', text: 'Assessment', route: '/route3', colors: ['#065867', '#4683D3'] },
    { id: '4', text: 'How Tools', route: '/route4', colors: ['#F33E62', '#F79334'] },
  ]

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <CardButton text={item.text} route={item.route} colors={item.colors} />
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Get Started</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
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
    width: cardWidth,
    height: 60,
    margin: 5, // Space between cards
  },
})

export default GetStarted
