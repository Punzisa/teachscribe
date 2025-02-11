import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, View, Animated, Dimensions } from 'react-native'
import { FAB } from 'react-native-paper'

const FabGroup = () => {
  const [open, setOpen] = useState(false)
  const [animation] = useState(new Animated.Value(0))
  const router = useRouter()

  const handleRoute = (route: string) => {
    handleClose()
    setTimeout(() => router.push(route), 300)
  }

  const handleOpen = () => {
    setOpen(true)
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start()
  }

  const handleClose = () => {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start(() => setOpen(false))
  }

  const handleFabPress = () => {
    if (open) {
      handleClose()
    } else {
      handleOpen()
    }
  }

  const screenHeight = Dimensions.get('window').height

  const fabItems = [
    {
      icon: 'school',
      label: 'Lesson Plans',
      route: '/(lesson)/lesson_plan',
      color: Colors.primary,
      delay: 0,
    },
    {
      icon: 'notebook',
      label: 'Schemes of Work',
      route: '/(schemes_of_work)/create_schemes_of_work',
      color: Colors.primary,
      delay: 10,
    },
    {
      icon: 'record',
      label: 'Records of Work',
      route: '/(records_of_work)/create_records_of_work',
      color: Colors.primary,
      delay: 20,
    },
  ]

  return (
    <>
      {open && (
        <Animated.View
          style={[
            styles.overlay,
            {
              opacity: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
              }),
            },
          ]}
          pointerEvents={open ? 'auto' : 'none'}
          onTouchStart={handleClose}
        />
      )}
      <View style={styles.container}>
        {open &&
          fabItems.map((item, index) => (
            <Animated.View
              key={item.route}
              style={{
                transform: [
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [screenHeight, 0],
                    }),
                  },
                ],
                opacity: animation,
              }}>
              <FAB
                icon={item.icon}
                label={item.label}
                onPress={() => handleRoute(item.route)}
                style={[styles.fab, { backgroundColor: item.color }]}
                color="white"
                animated={true}
              />
            </Animated.View>
          ))}
        <FAB
          icon={open ? 'close' : 'plus'}
          color="white"
          onPress={handleFabPress}
          style={[styles.mainFab, { backgroundColor: open ? '#E53935' : Colors.primary }]}
          animated={true}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    alignItems: 'flex-end',
    gap: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 1,
  },
  fab: {
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 28,
  },
  mainFab: {
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default FabGroup
