import { primary, primaryBackground } from '@/constants/Colors'
import { StyleSheet } from 'react-native'

export const nextBtnStyle = {
  color: primary,
  backgroundColor: primaryBackground,
  fontWeight: 'bold',
  padding: 10,
  overflow: 'hidden',
  borderRadius: 6,
}

export const previousBtnStyle = {
  color: primary,
  fontWeight: 'bold',
  padding: 10,
}

export const containerStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 50,
  },
})
