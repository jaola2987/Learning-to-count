import React ,  { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableHighlight, View } from "react-native"
import { useDispatch, useSelector } from 'react-redux'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Header from '../header'
import { RESULT_SCREEN, RESOLVE_SCREEN } from '../const'
import WrapperScreen from '../wrapperScreen'
import { initialData } from '../../store/actions/resolve'
import { THEME } from '../../theme/theme'
import ButtonMain from '../button'
import { sortBy } from 'lodash'

const TouchableHighlightTab = ({  text, onPress }) => {
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

export const ResultScreen = () => {

  const dispatch = useDispatch()

  const overallResult = useSelector(state => state.result.resultState)

  const [arrayExamples, setArrayExamples] = useState(overallResult[0].examples) 

  const resultTrue =  useSelector(state => state.result.resultState[0].examples.filter(item => item.answer == item.correctAnswer))

  const resultFalse =  useSelector(state => state.result.resultState[0].examples.filter(item => item.answer != item.correctAnswer))

  //const date = new Date(Number(overallResult[0].date))

  const sortExamples = sortBy(arrayExamples, 'id')

  console.log('1', overallResult)

  return (
    <WrapperScreen>
      <Header title={RESULT_SCREEN.title} />
      {overallResult[0] && (
        <SafeAreaView style={styles.wrapper}>
        <View style={styles.wrapperBlokResult}>
        {/* <Text style={styles.blokResultDatе}>{date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}</Text>  */}
          <View style={styles.blokResultDescription}>
            <MaterialCommunityIcons 
              name={overallResult[0].actIcon}
              size={24} 
            />
            <Text style={styles.blokResultDescriptionText}>{overallResult[0].actName} до {overallResult[0].maxCount}</Text>
            <ButtonMain 
              text="Повторить" 
              link={RESOLVE_SCREEN.path} 
              onPress={() => 
                dispatch(initialData({
                  id: Date.now().toString(),
                  actName: overallResult[0].actName,
                  value: overallResult[0].value,
                  actIcon: overallResult[0].actIcon,
                  maxCount: overallResult[0].maxCount,
                  quantity: overallResult[0].quantity
              }))}
            />                      
          </View>
          <View style={styles.blokResultPercent}>
          <View style={overallResult[0].percent > 70 ? circleTrue : circleFalse}>
            <Text style={styles.blokResultPercentText}>{overallResult[0].percent}%</Text> 
            <Text style={styles.blokResultPercentSubText}>{resultTrue.length} из {overallResult[0].quantity}</Text>
            </View>
          </View>
        </View>
        <View style={styles.wrapperBlokЕxamples}>
          <View style={styles.wrapperSorting}>
            <TouchableHighlightTab disabled text={'Все'} onPress={() => setArrayExamples(overallResult[0].examples)} />
            <TouchableHighlightTab text={'Правильные'} onPress={() => setArrayExamples(resultTrue)} />
            <TouchableHighlightTab text={'Ошибки'} onPress={() => setArrayExamples(resultFalse)} />
          </View>
          <ScrollView>
            {sortExamples.map(item => {
                return (      
                  <View key={item.id.toString()} style={item.correctAnswer - item.answer !== 0 ? blockFalse : blockTrue}>
                    <Text style={styles.blokЕxamplesText}>{item.id})</Text>
                    <Text style={styles.blokЕxamplesText}>{item.numberOne}</Text>
                    <Text style={styles.blokЕxamplesText}>{item.sign}</Text>
                    <Text style={styles.blokЕxamplesText}>{item.numberTwo}</Text>  
                    <Text style={styles.blokЕxamplesText}>=</Text>   
                    {item.answer === '' ?
                      <Text style={textFalse}>нет</Text>
                      :
                      <Text style={item.correctAnswer - item.answer !== 0 ? textFalse : styles.blokЕxamplesText}>{item.answer}</Text>
                    } 
                    {item.correctAnswer - item.answer !== 0 ?
                      <Text style={textTrue}>{item.correctAnswer}</Text>
                      :
                      <Text style={styles.blokЕxamplesText}>  </Text>
                    }            
                </View>
                )}
              )} 
          </ScrollView>
        </View>        
      </SafeAreaView>     
      )}       
    </WrapperScreen>
  )
}


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  wrapperBlokResult: {
    flex: 2,
    justifyContent: 'center',
    padding: 20,
  },
  blokResultDatе: {
    fontSize: THEME.typography.h6,
  },
  blokResultDescription: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  }, 
  blokResultDescriptionText: {
    fontSize: THEME.typography.h3,
    marginHorizontal: 5,
  },
  blokResultPercent: {
    alignItems: 'center',    
  },
  blokResultPercentCircle: {
    borderRadius: 300,
    borderWidth: 3,
    padding: 20,
    minWidth: 200,
    minHeight: 200,
    backgroundColor: THEME.background.dark
  },
  blokResultPercentCircleTrue: {
    borderColor: THEME.success.main
  },
  blokResultPercentCircleFalse: {
    borderColor: THEME.error.main
  },
  blokResultPercentText: {
    fontSize: THEME.typography.big,
    textAlign: 'center',
    marginTop: 20,
  },
  blokResultPercentSubText: {
    fontSize: THEME.typography.h3,
    textAlign: 'center',
  },
  wrapperSorting: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  wrapperBlokЕxamples: {
    flex: 3,
    marginHorizontal: 5,
  },
  blokЕxamples: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: THEME.border.main,
    borderRadius: 5,
    margin: 3,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  blokЕxamplesTrue: {
    backgroundColor: THEME.success.light,
    flex: 1,
  },
  blokЕxamplesFalse: {
    backgroundColor: THEME.error.light,
  },
  blokЕxamplesText: {
    fontSize: THEME.typography.h5,
    marginHorizontal: 5,
  },
  blokЕxamplesTextTrue: {
    color: THEME.success.main,
    fontWeight: 'bold',
  },
  blokЕxamplesTextFalse: {
    color: THEME.error.main,
    fontWeight: 'bold',
  },
  blockButton: {    
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: THEME.primary.main,
    borderRadius: 10,
    margin: 5,
  },
  blocktButtonText: {
    fontSize: THEME.typography.button,
    color: THEME.text.primary,
    textAlign: 'center',
  },
})

const blockFalse = StyleSheet.compose(styles.blokЕxamples, styles.blokЕxamplesFalse)

const blockTrue = StyleSheet.compose(styles.blokЕxamples, styles.blokЕxamplesTrue)

const textFalse = StyleSheet.compose(styles.blokЕxamplesText, styles.blokЕxamplesTextFalse)

const textTrue = StyleSheet.compose(styles.blokЕxamplesText, styles.blokЕxamplesTextTrue)

const circleTrue =  StyleSheet.compose(styles.blokResultPercentCircle, styles.blokResultPercentCircleTrue)

const circleFalse =  StyleSheet.compose(styles.blokResultPercentCircle, styles.blokResultPercentCircleFalse)