import React from 'react'
import {View, StyleSheet, Text} from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { THEME } from '../theme/theme'

export default Header = ( {title} ) => {
  return (
    <View style={styles.headerContainer}>
      <MaterialCommunityIcons 
        name="alert" 
        size={30} 
        color={THEME.icon} 
      />
      <Text style={styles.headerTitle}>
        {title}
      </Text>
      <MaterialCommunityIcons 
        name="settings" 
        size={30} 
        color={THEME.icon} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    height: 90,
    flex: 0,
    backgroundColor: THEME.background.secondary,
    paddingTop: 45,
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: THEME.typography.h2, 
    color: THEME.text.contrast, 
  }
})