import React, { useCallback, useEffect } from 'react'
import AppButton from '@/components/Button'

import * as WebBrowser from 'expo-web-browser'
import { useSSO } from '@clerk/clerk-expo'
import { OAuthStrategy } from '@clerk/types'
import { useRouter } from 'expo-router'

export type SSOProvider = 'google' | 'facebook'

const OAUTH_STRATEGY_MAP: Record<SSOProvider, string> = {
  google: 'oauth_google',
  facebook: 'oauth_facebook',
} as const

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession()

interface SocialLoginButtonsProps {
  title: string
  socialLoginIcon: any
}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
  socialLoginIcon,
  title,
  ...rest
}) => {
  useWarmUpBrowser()
  const { startSSOFlow } = useSSO()
  const router = useRouter()

  const onPressSSO = useCallback(async (provider: SSOProvider) => {
    try {
      const strategy = OAUTH_STRATEGY_MAP[provider]

      if (!strategy) {
        throw new Error(`Unsupported SSO provider: ${provider}`)
      }

      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
        strategy: strategy as OAuthStrategy,
      })

      // If sign in was successful, set the active session
      if (createdSessionId) {
        await setActive!({ session: createdSessionId })
        router.replace('/(tabs)')
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }, [])

  return (
    <>
      {Object.entries(socialLoginIcon).map(([key, value]) => (
        <AppButton key={key} {...rest} icon={value} onPress={() => onPressSSO(key as SSOProvider)}>
          {title} {key}
        </AppButton>
      ))}
    </>
  )
}

export default SocialLoginButtons
