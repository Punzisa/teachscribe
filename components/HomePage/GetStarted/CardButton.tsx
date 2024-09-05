import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'

const CardButton = ({ text, route, colors }: { text: string; route: string; colors: string[] }) => {
  const router = useRouter()
  return (
    <TouchableOpacity onPress={() => router.push(route)} style={styles.buttonContainer}>
      <LinearGradient
        colors={colors}
        style={styles.gradient}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 1, y: 0.8 }}>
        <Text style={styles.buttonText}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 'auto',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
})

export default CardButton
