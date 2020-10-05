import React from 'react'
import { StyleSheet, Text, View } from "react-native"
import { START_SCREEN } from './const'
import ButtonMain from './button'
import { THEME } from '../theme/theme'

export default FullScreenText = ({ text }) => {
  return (
    <View style={styles.blokText}>
      <Text style={styles.textStyle}>
          {text}
      </Text>
      <ButtonMain text="Начать тренировку" link={START_SCREEN.path}/>
    </View>
  )
}

const styles = StyleSheet.create({
  blokText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
   },
  textStyle: {
    fontSize: THEME.typography.h2,
    textAlign: 'center'
  }
})