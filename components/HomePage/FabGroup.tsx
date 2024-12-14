import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { FAB } from 'react-native-paper'

const FabGroup = () => {
  const [open, setOpen] = useState(false)

  const handleRoute = (route) => {
    router.push(route)
    setOpen(false)
  }

  const handleFabPress = () => {
    setOpen(!open)
  }

  const router = useRouter()

  return (
    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-end' }}>
      {open && (
        <>
          <FAB
            icon="school"
            label="Lesson Plans"
            color="black"
            onPress={() => handleRoute('/(lesson)/lesson_plan')}
            style={styles.fab}
          />
          <FAB
            icon="notebook"
            color="black"
            label="Schemes of Work"
            onPress={() => handleRoute('/(schemes_of_work)/create_schemes_of_work')}
            style={styles.fab}
          />
          <FAB
            icon="record"
            color="black"
            label="Records of Work"
            onPress={() => handleRoute('/(records_of_work)/create_records_of_work')}
            style={styles.fab}
          />
        </>
      )}
      <FAB
        icon={open ? 'close' : 'plus'}
        color="white"
        onPress={handleFabPress}
        style={{ backgroundColor: open ? 'black' : Colors.primary }}
      />
    </View>
  )
}

export default FabGroup

const styles = StyleSheet.create({
  fab: {
    backgroundColor: Colors.light.background,
    marginBottom: 12,
  },
})
