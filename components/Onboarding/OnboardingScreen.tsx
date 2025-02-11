import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Colors } from '@/constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const { width, height } = Dimensions.get('window')

const onboardingData = [
  {
    id: '1',
    title: 'Welcome to Punzisa',
    description: 'Teaching made simple',
    icon: 'book-open-page-variant',
  },
  {
    id: '2',
    title: 'Lesson Plans',
    description: 'Create and manage detailed lesson plans with ease',
    icon: 'clipboard-text-outline',
  },
  {
    id: '3',
    title: 'Schemes of Work',
    description: 'Organize your teaching schedule and curriculum effectively',
    icon: 'calendar-clock',
  },
  {
    id: '4',
    title: 'Records of Work',
    description: 'Track and document your teaching progress seamlessly',
    icon: 'file-document-outline',
  },
]

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const router = useRouter()
  const scrollX = useRef(new Animated.Value(0)).current
  const slidesRef = useRef<FlatList>(null)

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0]?.index || 0)
  }).current

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  const scrollTo = async () => {
    if (currentIndex < onboardingData.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 })
    } else {
      try {
        await AsyncStorage.setItem('hasOnboarded', 'true')
        router.push('/(tabs)')
      } catch (err) {
        console.log('Error setting onboarding status:', err)
      }
    }
  }

  const skip = async () => {
    try {
      await AsyncStorage.setItem('hasOnboarded', 'true')
      router.push('/(tabs)')
    } catch (err) {
      console.log('Error setting onboarding status:', err)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.skipContainer}>
        <TouchableOpacity onPress={skip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={onboardingData}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name={item.icon} size={100} color={Colors.primary} />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

      <View style={styles.bottomContainer}>
        <View style={styles.paginationDots}>
          {onboardingData.map((_, index) => {
            const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [10, 20, 10],
              extrapolate: 'clamp',
            })

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            })

            return (
              <Animated.View
                style={[styles.dot, { width: dotWidth, opacity }]}
                key={index.toString()}
              />
            )
          })}
        </View>

        <TouchableOpacity style={styles.button} onPress={scrollTo}>
          <Text style={styles.buttonText}>
            {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  skipContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  skipText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '500',
  },
  slide: {
    width,
    height,
    alignItems: 'center',
    padding: 32,
    paddingTop: height * 0.2,
  },
  iconContainer: {
    width: 200,
    height: 200,
    backgroundColor: '#F7FAFC',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    paddingHorizontal: 24,
    lineHeight: 24,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    paddingHorizontal: 32,
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    marginHorizontal: 4,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
})

export default OnboardingScreen
