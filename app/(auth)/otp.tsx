import AppButton from '@/components/Button'
import { StyledText, StyledView } from '@/constants/nativewindWrapper'
import { router } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  TouchableOpacity,
} from 'react-native'

const OTPVerificationScreen = () => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', ''])
  const [timer, setTimer] = useState<number>(152)
  const inputs = useRef<(TextInput | null)[]>([])

  const handleChangeText = (text: string, index: number) => {
    const newOtp = [...otp]
    newOtp[index] = text
    setOtp(newOtp)

    if (text && index < inputs.current.length - 1) {
      inputs.current[index + 1]?.focus()
    }
  }

  const handleKeyPress = (
    nativeEvent: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    //@ts-ignore
    if (nativeEvent.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        const newOtp = [...otp]
        newOtp[index - 1] = ''
        setOtp(newOtp)
        inputs.current[index - 1]?.focus()
      } else {
        const newOtp = [...otp]
        newOtp[index] = ''
        setOtp(newOtp)
      }
    }
  }

  // Function to format the timer
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  }

  // Function to handle submit button press
  const handleSubmit = () => {
    const otpCode = otp.join('')
    console.log('OTP Code:', otpCode)
    // Add your OTP verification logic here
    router.replace('/(tabs)')
  }

  // Function to handle resend button press
  const handleResend = () => {
    console.log('Resend OTP')
    // Add your resend OTP logic here
  }

  // useEffect hook to handle timer countdown
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
      return () => clearInterval(countdown)
    }
  }, [timer])

  return (
    <StyledView className="flex-1 justify-start pt-10 items-center bg-white">
      <StyledText style={styles.headerText}>OTP Verification</StyledText>
      <StyledText>Enter the code from the SMS we sent to +8801774280874</StyledText>
      <StyledView style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChangeText(text, index)}
            ref={(ref) => (inputs.current[index] = ref)}
            //@ts-ignore
            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent, index)}
          />
        ))}
      </StyledView>
      <StyledText style={styles.timerText}>{formatTime(timer)}</StyledText>

      <AppButton style={{ width: 200 }} onPress={handleSubmit}>
        Submit
      </AppButton>

      <TouchableOpacity onPress={handleResend} style={styles.resendButton}>
        <StyledText style={styles.resendButtonText}>I didn't receive any code. RESEND</StyledText>
      </TouchableOpacity>
    </StyledView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    padding: 10,
    width: 40,
    height: 40,
    marginHorizontal: 5,
  },
  timerText: {
    fontSize: 18,
    color: '#f00',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#ff7f50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  resendButton: {
    marginTop: 20,
  },
  resendButtonText: {
    color: '#007bff',
    fontSize: 14,
  },
})

export default OTPVerificationScreen
