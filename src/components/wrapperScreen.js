import React from 'react'
import { StyleSheet, View } from "react-native"

export default function WrapperScreen ( {children} ) {
  return  (
  <View style={styles.wrapperScreen}> 
    {children} 
  </View>
  )
}

const styles = StyleSheet.create({
  wrapperScreen: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
})