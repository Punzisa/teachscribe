import React, { useState } from 'react'
import { Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

type ButtonOption = 'All' | 'Lesson Plans' | 'Schemes of Work' | 'Assessment'

interface GradientButtonProps {
  title: ButtonOption
  onPress: (option: ButtonOption) => void
  colors: string[]
}

const GradientButton: React.FC<GradientButtonProps> = ({ title, onPress, colors }) => (
  <TouchableOpacity onPress={() => onPress(title)}>
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </LinearGradient>
  </TouchableOpacity>
)

const HorizontalButtonList: React.FC = () => {
  const handlePress = (option: ButtonOption) => {
    console.log(`Selected: ${option}`)
    setSelected(option)
  }

  const [selected, setSelected] = useState<ButtonOption>('All')

  const notSelected = ['#1f1f10', '#0f2f0f']
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <GradientButton
        title="All"
        onPress={handlePress}
        colors={selected === 'All' ? ['#4c669f', '#3b5998', '#192f6a'] : notSelected}
      />
      <GradientButton
        title="Lesson Plans"
        onPress={handlePress}
        colors={selected === 'Lesson Plans' ? ['#4c669f', '#3b5998', '#192f6a'] : notSelected}
      />
      <GradientButton
        title="Schemes of Work"
        onPress={handlePress}
        colors={selected === 'Schemes of Work' ? ['#11998e', '#38ef7d'] : notSelected}
      />
      <GradientButton
        title="Assessment"
        onPress={handlePress}
        colors={selected === 'Assessment' ? ['#ee0979', '#ff6a00'] : notSelected}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default HorizontalButtonList
