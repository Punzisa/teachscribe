import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import { Easing } from 'react-native-reanimated'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const SIZE = 180
const STROKE_WIDTH = 10
const RADIUS = SIZE / 2 - STROKE_WIDTH / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const CircularProgress: React.FC = () => {
  const progress = new Animated.Value(0)
  const [showCheckmark, setShowCheckmark] = useState(false)

  const router = useRouter()
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setShowCheckmark(true)
      setTimeout(() => {
        router.replace({
          pathname: '/(tabs)',
          params: { reload: '0' },
        })
      }, 1000)
    })
  })

  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [CIRCUMFERENCE, 0],
  })

  return (
    <View style={styles.container}>
      {showCheckmark ? (
        <Ionicons name="checkmark-circle" size={SIZE + STROKE_WIDTH} color={Colors.green} />
      ) : (
        <View>
          <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
            <Circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              stroke={'#dbe7fa'}
              strokeWidth={STROKE_WIDTH}
              fill="none"
            />

            <AnimatedCircle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              stroke={Colors.green}
              strokeWidth={STROKE_WIDTH}
              fill="none"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
            />
          </Svg>
          <View style={styles.textContainer}>
            <Text>Creating lesson...</Text>
          </View>
        </View>
      )}
    </View>
  )
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

export default CircularProgress

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
