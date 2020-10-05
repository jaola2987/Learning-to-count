import React, { useMemo } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import { useDispatch, useSelector } from 'react-redux'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Link } from "react-router-native"
import Header from '../header'
import { STATISTICS_SCREEN, RESULT_SCREEN } from '../const'
import FullScreenText from '../fullScreenText'
import WrapperScreen from '../wrapperScreen'
import { loadingResult, openResult, deleteResult } from '../../store/actions/result'
import { THEME } from '../../theme/theme'

export const StatisticsScreen = () => {

  const dispatch = useDispatch()

  useMemo(() => {
    dispatch(loadingResult())
  }, [dispatch])

  const reportItems = useSelector(state => state.result.reportState)

  //console.log('reportState', reportItems)

  return (
    <WrapperScreen>
      <Header title={STATISTICS_SCREEN.title} />
      {reportItems.length === 0 
        ? 
        <FullScreenText text={STATISTICS_SCREEN.empty}/> 
        :        
        <ScrollView style={styles.listWrapper}>
          <SafeAreaView>
            {reportItems.map(item => {
              const date = new Date(Number(item.date))
              return (      
                <View key={item.id.toString()} style={styles.listItem}>
                  <Link
                    style={styles.listLink}
                    to={RESULT_SCREEN.path}
                    onPress={() => 
                      dispatch(openResult(item.date))
                    }
                  >
                    <View style={styles.listItemLink}>
                      <Text style={styles.listDate}>{date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}</Text>
                      <Text style={styles.listText}>{item.actName} до {item.maxCount}</Text>
                      <View style={item.percent > 70 ? circleTrue : circleFalse}>
                        <Text style={styles.listPercentText}>{item.percent}%</Text>
                      </View>
                    </View>
                  </Link>   
                  <MaterialCommunityIcons 
                    name='delete'
                    size={35} 
                    color={THEME.button_color.primary}
                      onPress={() => dispatch(deleteResult(item.id))}
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
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: THEME.border.main,
    borderRadius: 5,
    backgroundColor: THEME.background.tertiary,
    marginBottom: 5,
    padding: 10,
  },
  listLink: {
    flex: 1,
    marginHorizontal: 5,
  },
  listItemLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listDate: {
    fontSize: THEME.typography.body,
  },
  listText: {
    fontSize: THEME.typography.h5,
    marginHorizontal: 2,
  },
  listPercentCircle: {
    borderRadius: 300,
    borderWidth: 3,
    minWidth: 50,
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2, 
    marginLeft: 10,
  },
  listPercentCircleTrue: {
    borderColor: THEME.success.main
  },
  listPercentCircleFalse: {
    borderColor: THEME.error.main
  },
  listPercentText: {
    fontSize: THEME.typography.body,
    textAlign: 'center',
  }
})

const circleTrue =  StyleSheet.compose(styles.listPercentCircle, styles.listPercentCircleTrue)

const circleFalse =  StyleSheet.compose(styles.listPercentCircle, styles.listPercentCircleFalse)
