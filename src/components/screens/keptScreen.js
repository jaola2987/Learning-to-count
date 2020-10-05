import React, { useMemo } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import { useDispatch, useSelector } from 'react-redux'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Link } from "react-router-native"
import Header from '../header'
import { KEPT_SCREEN, RESOLVE_SCREEN } from '../const'
import FullScreenText from '../fullScreenText'
import WrapperScreen from '../wrapperScreen'
import { loadingKept, deleteKeptItem } from '../../store/actions/kept'
import { initialData } from '../../store/actions/resolve'
import { THEME } from '../../theme/theme'

export const KeptScreen = () => {

  const dispatch = useDispatch()

  useMemo(() => {
    dispatch(loadingKept())
  }, [dispatch])

  const savedItems = useSelector(state => state.kept.keptState)

  return (
    <WrapperScreen>
      <Header title={KEPT_SCREEN.title} />
      {savedItems.length === 0 
        ? 
        <FullScreenText text={KEPT_SCREEN.empty}/> 
        :        
        <ScrollView style={styles.listWrapper}>
          <SafeAreaView>
            {savedItems.map(item => {
              return (      
                <View key={item.id.toString()} style={styles.listItem}>
                  <Link 
                    style={styles.listIconPlay}
                    to={RESOLVE_SCREEN.path}
                    onPress={() => 
                      dispatch(initialData({
                        id: Date.now().toString(),
                        actName: item.actName,
                        value: item.value,
                        actIcon: item.actIcon,
                        maxCount: item.maxCount,
                        quantity: item.quantity
                    }))}
                  >
                    <View style={styles.listItemLink}>
                      <MaterialCommunityIcons
                        name='play-circle'
                        size={40} 
                        color={THEME.button_color.primary}
                      /> 
                      <MaterialCommunityIcons 
                        name={item.actIcon}
                        size={24} 
                      />
                      <Text style={styles.listText}>{item.actName} до {item.maxCount}</Text>
                      <Text style={styles.listSubtext}>({item.quantity} примеров)</Text> 
                    </View>
                  </Link>   
                  <MaterialCommunityIcons 
                    name='delete'
                    size={35} 
                    color={THEME.button_color.primary}
                    onPress={() => dispatch(deleteKeptItem(item.id))}
                  />
                </View>
              )}
            )} 
          </SafeAreaView> 
        </ScrollView>       
      }
    </WrapperScreen>
  )
}

const styles = StyleSheet.create({
  listWrapper: {
    padding: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: THEME.border.main,
    borderRadius: 5,
    backgroundColor: THEME.background.tertiary,
    marginBottom: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  listItemLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  listText: {
    fontSize: THEME.typography.h5,
    marginHorizontal: 5,
  },
  listSubtext: {
    fontSize: THEME.typography.subtitln,  
  },
  listIconPlay: {
    marginRight: 5,
  }
})
