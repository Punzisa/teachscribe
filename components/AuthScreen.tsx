import { GestureResponderEvent } from 'react-native'

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import SocialLoginButtons from './SocialLoginButtons'
import AppButton from './Button'
import { Link } from 'expo-router'

interface AuthScreenProps {
  uniqueKey?: string
  title: string
  handleEmailSignIn: (key: string) => void
  socialLoginIcon: any
  link: string
  linkText: string
}

const AuthScreen: React.FC<AuthScreenProps> = ({
  uniqueKey,
  title,
  handleEmailSignIn,
  socialLoginIcon,
  link,
  linkText,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>Welcome to Punzisa</Text>
        <Text style={styles.welcomeSubtitle}>
          {uniqueKey === 'home'
            ? 'Sign in to access your account'
            : 'Create an account to get started'}
        </Text>
      </View>

      <SocialLoginButtons title={title} socialLoginIcon={socialLoginIcon} />

      <View style={styles.dividerContainer}>
        <Text style={styles.dividerText}>Or</Text>
        <AppButton key={'signIn'} onPress={() => handleEmailSignIn('signIn')}>
          {title} with email
        </AppButton>
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>
            {uniqueKey === 'home' ? "Don't have an account?" : 'Already have an account?'}
          </Text>
          <TouchableOpacity>
            <Link style={styles.link} href={link}>
              {linkText}
            </Link>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By continuing, you acknowledge that you have read and understood our Terms of Service and
          Privacy Policy
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  welcomeContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  welcomeSubtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
  dividerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  dividerText: {
    color: '#6B7280',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  linkText: {
    color: '#6B7280',
  },
  link: {
    color: '#3B82F6',
    marginLeft: 8,
  },
  termsContainer: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  termsText: {
    color: '#6B7280',
    textAlign: 'center',
    fontSize: 14,
  },
})

export default AuthScreen
