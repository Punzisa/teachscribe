import React from 'react'
import AppButton from '@/components/Button'

interface SocialLoginButtonsProps extends React.ComponentProps<typeof AppButton> {
  socialLoginIcon: Record<string, React.ReactNode>
  title?: string
}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
  socialLoginIcon,
  onPress,
  title,
  ...rest
}) => {
  return (
    <>
      {Object.entries(socialLoginIcon).map(([key, value]) => (
        <AppButton key={key} {...rest} icon={value} onPress={() => onPress && onPress(key as any)}>
          {title} {key}
        </AppButton>
      ))}
    </>
  )
}

export default SocialLoginButtons
