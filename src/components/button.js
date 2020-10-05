import React from 'react'
import { StyleSheet, Text} from "react-native"
import { Link } from "react-router-native"
import { THEME } from '../theme/theme'


export default ButtonMain = ({ text, onPress, link = '/' }) => {
  return (
    <Link onPress={onPress} to={link}  style={styles.link} transitionEnterTimeout={1000} underlayColor="#f0f4f7">
      <Text style={styles.linkText}>{text}</Text>        
    </Link>    
  )
}

const styles = StyleSheet.create({
  link: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: THEME.button_color.primary,
    borderRadius: 10,
    margin: 15,
  },
  linkText: {
    fontSize: THEME.typography.button,
    color: THEME.text.contrast,
    textAlign: 'center',
  },
})