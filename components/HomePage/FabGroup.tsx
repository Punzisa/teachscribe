import { Colors } from '@/constants/Colors'
import { Href, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { FAB } from 'react-native-paper'

const FabGroup = () => {
  const [open, setOpen] = useState(false)

  const handleRoute = (route: Href<string | object>) => {
    router.push(route)
    setOpen(false)
  }

  const handleFabPress = () => {
    setOpen(!open)
  }

  const router = useRouter()

  return (
    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
      {open && (
        <>
          <FAB
            icon="school"
            label="Lesson Plans"
            color="white"
            onPress={() => handleRoute('/(lesson)/lesson_plan')}
            style={styles.fab}
          />
          <FAB
            icon="notebook"
            color="white"
            label="Schemes of Work"
            onPress={() => console.log('Phone pressed')}
            style={styles.fab}
          />
          <FAB
            icon="record"
            color="white"
            label="Records of Work"
            onPress={() => console.log('Message pressed')}
            style={styles.fab}
          />
        </>
      )}
      <FAB
        icon={open ? 'close' : 'plus'}
        color="white"
        onPress={handleFabPress}
        style={{ backgroundColor: Colors.primary }}
      />
    </View>
  )
}

export default FabGroup

const styles = StyleSheet.create({
  fab: {
    backgroundColor: Colors.primary,
    margin: 8,
  },
})
