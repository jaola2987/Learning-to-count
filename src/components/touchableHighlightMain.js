import React from 'react'
import { StyleSheet, Text, TouchableHighlight} from "react-native"
import { THEME } from '../theme/theme'

export default TouchableHighlightMain = ({ text, onPress}) => {
  return (
    <TouchableHighlight
      style={styles.blockButton}
      activeOpacity={0.6}
      underlayColor={THEME.button_color.secondary}
      onPress={onPress}     
    >
      <Text style={styles.blocktButtonText}>{text}</Text> 
    </TouchableHighlight> 
  )
}

const styles = StyleSheet.create({
  blockButton: {
    paddingHorizontal: 50,
    paddingVertical: 30,
    backgroundColor: THEME.button_color.primary,
    borderRadius: 10,
    margin: 15,
  },
  blocktButtonText: {
    fontSize: THEME.typography.button,
    color: THEME.text.contrast,
    textAlign: 'center',
  },
})

