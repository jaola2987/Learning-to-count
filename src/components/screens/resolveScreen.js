import React,  { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Keyboard, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native"
import { useHistory } from "react-router-dom"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Header from '../header'
import { RESOLVE_SCREEN, RESULT_SCREEN } from '../const'
import WrapperScreen from '../wrapperScreen'
import TouchableHighlightMain from '../touchableHighlightMain'
import { saveResolve, cleanseResolve } from '../../store/actions/resolve'
import { saveResult, openResult } from '../../store/actions/result'
import { THEME } from '../../theme/theme'

export const ResolveScreen = () => {

  const [valueAnswer, setValueAnswer] = useState('')
  const [numberOne, setNumberOne] = useState(null)
  const [numberTwo, setNumberTwo] = useState(null)
  const [maxQuantity, setMaxQuantity] = useState(1)
  const [right, setRight] = useState(false)
  const [save, setSave] = useState(false)

  let history = useHistory()

  const dispatch = useDispatch()

  const initialData = useSelector(state => state.resolve.initiaDataState)

  const examples = useSelector(state => state.resolve.resolveState)

  const inputFocus = useRef(null)

  const resultTrue =  useSelector(state => state.resolve.resolveState.filter(item => item.answer == item.correctAnswer))

  const percent = Math.round(resultTrue.length / initialData.quantity * 100)
  
  function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1)
    return Math.round(rand);
  }

  useEffect(() => {
    setNumberOne(randomInteger(1, initialData.maxCount))
    setNumberTwo(randomInteger(1, initialData.maxCount))
  }, [])

  useEffect(() => {
    if (examples.length){
      const date =  Date.now().toString()      
      dispatch(saveResult({
        date: date,
        actName: initialData.actName,
        value: initialData.value,
        actIcon: initialData.actIcon,
        maxCount: initialData.maxCount,
        quantity: initialData.quantity,
        examples: examples,
        percent: percent
      })),
      dispatch(cleanseResolve()),  
      dispatch(openResult(date))
    }
  }, [save])

  let count, sign, numberOneDisplayed, numberTwoDisplayed

    switch (initialData.value) {
      case 'plus': {
        sign = '+'
        numberOneDisplayed = numberOne
        numberTwoDisplayed = numberTwo
        count = numberOneDisplayed + numberTwoDisplayed
        break;
      }
      case 'minus': {
        if (numberOne > numberTwo){
          numberOneDisplayed = numberOne
          numberTwoDisplayed = numberTwo
          count = numberOneDisplayed - numberTwoDisplayed
        } else {
          numberOneDisplayed = numberTwo
          numberTwoDisplayed = numberOne
          count = numberOneDisplayed - numberTwoDisplayed
        }  
        sign = '-'      
        break;
      }
      case 'multiplication': {
        sign = 'x'
        numberOneDisplayed = numberOne
        numberTwoDisplayed = numberTwo
        count = numberOneDisplayed * numberTwoDisplayed
        break;
      }
      case 'division': {
        sign = '/'
        numberOneDisplayed = numberOne * numberTwo
        numberTwoDisplayed = numberTwo
        count = numberOneDisplayed  / numberTwoDisplayed
        break; 
      }                   
      default:
        sign = ''
        count = ''
        numberOneDisplayed = ''
        numberTwoDisplayed = ''
    }     
  
  function handleClick() {
      if(initialData.quantity - maxQuantity){
        setTimeout(() => {
          history.push(RESOLVE_SCREEN.path)
          setNumberOne(randomInteger(1, initialData.maxCount)),
          setNumberTwo(randomInteger(1, initialData.maxCount)),
          setMaxQuantity(maxQuantity + 1),
          setValueAnswer(''),
          setRight(false),
          inputFocus.current.focus()
        }, 700) 
        } else {
          setTimeout(() => {
            setSave(!save)   
          }, 400),
          setTimeout(() => { 
            history.push(RESULT_SCREEN.path) 
          }, 700)    
      }
    }

  return (
    <WrapperScreen>
      <Header title={RESOLVE_SCREEN.title} />
      <SafeAreaView style={styles.blockWrapper}>
        <View style={styles.blockQuantity}>
  <Text style={styles.textQuantity}>{maxQuantity} из {initialData.quantity}</Text>  
        </View>
        <View style={styles.blockCount}>
          <Text style={styles.blockCountText}>{numberOneDisplayed}</Text> 
          <Text style={styles.blockCountText}>{sign}</Text>
          <Text style={styles.blockCountText}>{numberTwoDisplayed}</Text>
          <Text style={styles.blockCountText}>=</Text>
          <TextInput
            ref={inputFocus}
            keyboardType='number-pad'
            onChangeText={answer => setValueAnswer(answer)}
            value={valueAnswer}
            autoFocus={true}
            style={styles.blockCountAnswertInput}  
          />
        </View>
        <View style={styles.blocResult}>
          {right == false && (
            <TouchableHighlightMain
            text={'ОТВЕТИТЬ'}
            onPress={() => {           
              setRight(true),
              Keyboard.dismiss(),                                  
              dispatch(saveResolve({
                id: maxQuantity,
                numberOne: numberOneDisplayed,
                numberTwo: numberTwoDisplayed,
                sign: sign,
                answer: valueAnswer,
                correctAnswer: count
              })),
              handleClick()
            }}     
          />
          )}          
          {right && (
            <View>
              {valueAnswer == count 
                ? 
                <View style={styles.blocResultAnswer}>
                  <MaterialCommunityIcons
                      name='check-circle'
                      size={50} 
                      color={THEME.success.main}
                    />  
                  <Text style={textTrue}>ПРАВИЛЬНО!</Text>
                </View> 
                : 
                <View style={styles.blocResultAnswer}>
                  <MaterialCommunityIcons
                      name='close-circle'
                      size={50} 
                      color={THEME.error.main}
                    />  
                  <Text style={textFalse}>ОШИБКА</Text>
                </View>  
              }
            </View>
          )}                   
        </View>
      </SafeAreaView>     
    </WrapperScreen>
  )
}

const styles = StyleSheet.create({
  blockWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: THEME.background.dark,
  },
  blockQuantity: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  textQuantity: {
    fontSize: THEME.typography.h3,
  },
  blockCount: {
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blockCountText: {
    fontSize: THEME.typography.big,
    paddingHorizontal: 10,
  }, 
  blockCountAnswertInput: {
    fontSize: THEME.typography.big,
    height: 70, 
    width: 100, 
    borderColor: THEME.border.main, 
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: THEME.background.default,
    marginTop: 10,

  },
  blocResult: {
    flex: 3,
  },
  blocResultButton: {
    paddingHorizontal: 50,
    paddingVertical: 30,
    backgroundColor: THEME.button_color.primary,
    borderRadius: 10,
    margin: 15,
  },
  blocResultButtonText: {
    fontSize: THEME.typography.button,
    color: THEME.text.contrast,
    textAlign: 'center',
  },
  blocResultAnswer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  blocResultAnswerText: {
    fontSize: THEME.typography.h1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginTop: 5,
  },
  blocResultAnswerTextFalse: {
    color: THEME.error.main,
  },
  blocResultAnswerTextTrue: {
    color: THEME.success.main,
  }
})

const textFalse = StyleSheet.compose(styles.blocResultAnswerText, styles.blocResultAnswerTextFalse)

const textTrue = StyleSheet.compose(styles.blocResultAnswerText, styles.blocResultAnswerTextTrue)
