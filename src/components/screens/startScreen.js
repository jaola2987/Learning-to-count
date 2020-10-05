import React, { useState, useEffect } from 'react'
import { Button, FlatList, Modal, SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native"
import { useDispatch } from 'react-redux'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Header from '../header'
import WrapperScreen from '../wrapperScreen'
import { START_SCREEN, RESOLVE_SCREEN } from '../const'
import { THEME } from '../../theme/theme'
import ButtonMain from '../button'
import { saveItem } from '../../store/actions/kept'
import { initialData } from '../../store/actions/resolve'

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.listItem, style]}>
    <MaterialCommunityIcons name={item.icon} size={24} color={THEME.text.primary} />
    <Text style={styles.listItemText}>{item.text}</Text>
  </TouchableOpacity>
)

export const StartScreen = () => {
  const [selectedId, setSelectedId] = useState(null)
  const [selectedObject, setSelectedObject] = useState({})
  const [modalVisible, setModalVisible] = useState(false)
  const [valueCount, onChangeCount] = useState('')
  const [valueExamples, onChangeExamples] = useState('')
  const [save, setSave] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const object = START_SCREEN.list.find(item => item.id === selectedId)
    setSelectedObject(object)
  }, [selectedId])

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? THEME.primary.dark : THEME.primary.main
    return (
      <Item
        item={item}
        onPress={() => {setSelectedId(item.id), setModalVisible(true)}}
        style={{ backgroundColor }}
      />
    )
  }
  
  return (
    <WrapperScreen>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalIconTopWrapper}>
              {save && (
                <MaterialCommunityIcons 
                  name='check-circle'
                  style={styles.modalCheck} 
                  size={40} 
                  onPress={() => {setModalVisible(!modalVisible) }}
                />
              )}                
                <MaterialCommunityIcons 
                  name='window-close'
                  style={styles.modalButtonClose} 
                  size={32} 
                  onPress={() => {
                    setModalVisible(!modalVisible), 
                    setSave(false), 
                    setSelectedId(null),  
                    onChangeCount(''), 
                    onChangeExamples('')
                  }}
                />
            </View>
              {selectedObject && (
                <View style={styles.selectedCountWrapper}>
                  <MaterialCommunityIcons 
                    name={selectedObject.icon} 
                    size={24} 
                    style={styles.selectedCounIcon}
                  />
                  <Text style={styles.selectedCountText}>{selectedObject.text} до</Text>
                  <TextInput
                    style={styles.selectedCountInput}
                    onChangeText={text => onChangeCount(text)}
                    value={valueCount} 
                    autoFocus={true} 
                    maxLength={2}
                    keyboardType='number-pad'    
                  />
                </View>
              )}                 
                <View style={styles.selectedCountWrapper}>
                  <TextInput
                    style={styles.selectedCountInput}
                    onChangeText={count => onChangeExamples(count)}
                    value={valueExamples}   
                    maxLength={2}                   
                    keyboardType='number-pad'    
                  />
                  <Text style={styles.selectedCountText}>примеров</Text>
                </View>          
            <Button
              title="Сохранить"
              onPress={() => {
                setSave(true), 
                dispatch(saveItem({
                  id: Date.now().toString(),
                  actName: selectedObject.text,
                  value: selectedObject.value, 
                  actIcon: selectedObject.icon,
                  maxCount: valueCount,
                  quantity: valueExamples
                }))}}
              color={THEME.button_color.sucsess}
            />
            <ButtonMain 
              text="Начать" 
              link={RESOLVE_SCREEN.path}
              onPress={() => 
                dispatch(initialData({
                  id: Date.now().toString(),
                  actName: selectedObject.text,
                  value: selectedObject.value,
                  actIcon: selectedObject.icon,
                  maxCount: valueCount,
                  quantity: valueExamples
              }))}                
            />           
          </View>
        </View>
      </Modal>
      
      <Header title={START_SCREEN.subtitle} />
        
      <SafeAreaView style={styles.wrapperList}> 
        <View style={styles.description}>
          <Text style={styles.descriptionText}>
            {START_SCREEN.description}
          </Text>
        </View>
        <View style={styles.list}>
          <FlatList            
            data={START_SCREEN.list}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            extraData={selectedId}
          />
        </View>
      </SafeAreaView>
    </WrapperScreen>    
  )
}

const styles = StyleSheet.create({
  wrapperList: {
    flex: 1,
    justifyContent: 'center', 
  },
  description: {
    flex: 1,    
    alignSelf: 'center',
    justifyContent: 'center',    
  },
  descriptionText: {
    fontSize: THEME.typography.h2, 
    padding: 25,
  },
  list: {
    flex: 4,
  },
  listItem: {
    flexDirection: 'row',    
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16, 
    borderRadius: 5,   
  },
  listItemText: {
    fontSize: THEME.typography.h5, 
    marginLeft: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -70,
  },
  modalView: {
    backgroundColor: THEME.background.tertiary,
    borderRadius: 10,
    padding: 25,
    shadowColor: THEME.button_color.shadow_color,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalIconTopWrapper: {
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButtonClose: {
    color: THEME.text.secondary,
    position: 'absolute',
    top: -15,
    right: -15,
  },
  modalCheck: {
    color: THEME.button_color.sucsess,
    position: 'absolute',
    top: -15,
  },
  selectedCountWrapper: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center',
  },
  selectedCountText: {
    textAlign: "center",
    fontSize: THEME.typography.h5, 
    paddingHorizontal: 10,
    marginTop: 5,
  },
  selectedCountInput: {
    height: 40, 
    width: 40, 
    borderColor: THEME.border.main, 
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: THEME.background.default,
  },
  selectedCounIcon: {
    color: THEME.text.primary,
    marginTop: 5,
  },
});
