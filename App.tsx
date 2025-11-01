import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

//form validation
import * as Yup from 'yup'

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min 4 character')
    .max(16, 'Should be max 16 character')
    .required('Length is required')
})

export default function App() {

  const [password, setPassword] = useState('')
  const [passGenerator, setpassGenerator]= useState(false)
  const [lowerCase, setLowerCase]= useState(true)
  const [upperCase, setUpperCase]= useState(false)
  const [nummbers, setNumbers]= useState(false)
  const [symbols, setSymbols]= useState(false)

  const generatePasswordString= (passwordLength: number)=>{
    let characterList=''
    const uperCaseChars='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowerCaseChars='abcdefghijklmnopqrstuvwxyz'
    const digitsChars='123456789'
    const specialChars='!@#$%^&*()_+-={}[]|'

    if (upperCase) {
      characterList += uperCaseChars
    }
    if (lowerCase) {
      characterList += lowerCaseChars
    }
    if (nummbers) {
      characterList += digitsChars
    }
    if (symbols) {
      characterList += specialChars
    }

    const passwordResults=createPassword(characterList, passwordLength)
    setPassword(passwordResults)
    setpassGenerator(true)
  } 
  const createPassword= (character:string, passwordLength: number)=>{
    let result =''
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex= Math.round(Math.random()*character.length)
      result +=character.charAt(characterIndex)
      
    }
    return result
    console.log('Aziz')
  }
  const resetPasswordState=()=>{
    setPassword('')
    setpassGenerator(false)
    setLowerCase(true)
    setUpperCase(false)
    setNumbers(false)
    setSymbols(false)
  }
  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

const styles = StyleSheet.create({})