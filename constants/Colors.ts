/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4'
const tintColorDark = '#fff'

export const primary = '#3083FF'
export const primaryBackground = '#3083FF30'
export const lightGrey = '#ccc'

export const Colors = {
  primary: '#0079FF',
  secondary: '#6DC5D1',
  black: '#000',
  white: '#fff',
  green: '#31C737',
  red: '#E53E3E',
  medium: '#6e6969',
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
}

export const socialLoginIcon = {
  google: require('@/assets/google.png'),
  facebook: require('@/assets/facebook.png'),
  // microsoft: require('@/assets/microsoft.png'),
}
