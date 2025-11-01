import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";

//form validation
import * as Yup from 'yup'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Formik } from 'formik'


const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min 4 character')
    .max(16, 'Should be max 16 character')
    .required('Length is required')
})

export default function App() {

  const [password, setPassword] = useState('')
  const [passGenerator, setpassGenerator] = useState(false)
  const [lowerCase, setLowerCase] = useState(true)
  const [upperCase, setUpperCase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)

  const generatePasswordString = (passwordLength: number) => {
    let characterList = ''
    const uperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz'
    const digitsChars = '123456789'
    const specialChars = '!@#$%^&*()_+-={}[]|'

    if (upperCase) {
      characterList += uperCaseChars
    }
    if (lowerCase) {
      characterList += lowerCaseChars
    }
    if (numbers) {
      characterList += digitsChars
    }
    if (symbols) {
      characterList += specialChars
    }

    const passwordResults = createPassword(characterList, passwordLength)
    setPassword(passwordResults)
    setpassGenerator(true)
  }
  const createPassword = (character: string, passwordLength: number) => {
    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * character.length)
      result += character.charAt(characterIndex)

    }
    return result
    console.log('Aziz')
  }
  const resetPasswordState = () => {
    setPassword('')
    setpassGenerator(false)
    setLowerCase(true)
    setUpperCase(false)
    setNumbers(false)
    setSymbols(false)
  }
  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={passwordSchema}

            onSubmit={values => {
              console.log(values);
              generatePasswordString(Number(values.passwordLength))
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
              /* and other goodies */
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}

                  </View>
                  <TextInput style={styles.inputStyle} value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder='Ex:8'
                    keyboardType='numeric'
                  />
                </View>

                <View style={styles.inputWrapper1}>
                  <Text style={styles.heading}>Include Lowercase</Text>
                  <BouncyCheckbox
                    useBuiltInState={false}
                    isChecked={lowerCase}
                    onPress={() => setLowerCase(!lowerCase)}
                    fillColor='#1fc51cff'
                  />
                </View>

                <View style={styles.inputWrapper1}>
                  <Text style={styles.heading}>Include Uppercase</Text>
                  <BouncyCheckbox
                    useBuiltInState={false}
                    isChecked={upperCase}
                    onPress={() => setUpperCase(!upperCase)}
                    fillColor='#a6c51cff'
                  />
                </View>

                <View style={styles.inputWrapper1}>
                  <Text style={styles.heading}>Include Numbers</Text>
                  <BouncyCheckbox
                    useBuiltInState={false}
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor='#1c2ac5ff'
                  />
                </View>

                <View style={styles.inputWrapper1}>
                  <Text style={styles.heading}>Include Symbols</Text>
                  <BouncyCheckbox
                    useBuiltInState={false}
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor='#c21cc5ff'
                  />
                </View>


                <View style={styles.formAction}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.primaryBtnTxt}>Generate password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset()
                      resetPasswordState()
                    }}
                  >
                    <Text style={styles.secondaryBtnTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {passGenerator ? (
          <View style={[styles.card, styles.elivatedCard]}>
            <Text style={styles.subTitle}>Results</Text>
            <Text style={styles.description}>Long press to copy</Text>
            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputWrapper1:{
    paddingHorizontal:16,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formAction: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  heading: {
    fontSize: 18,
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  elivatedCard: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000'
  },
})