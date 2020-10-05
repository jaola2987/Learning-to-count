import { SAVE_RESULT, LOADING_RESULT, OPEN_RESULT, DELETE_RESULT } from '../types'

export const loadingResult = () => {
  return async dispatch => {
    const response = await fetch('https://learning-to-count-7b3dd.firebaseio.com/result.json', {
      method: 'GET',
      headers: {'Content-Type':'application/json'},
    })
    const data = await response.json()
    const result = Object.keys(data).map(key => ({... data[key], id: key}))
    //console.log('response', result)
    dispatch({
      type: LOADING_RESULT,
      payload: result
    })
  }
}

export const saveResult = (saveItem) => {
  return async dispatch => {
    const response = await fetch('https://learning-to-count-7b3dd.firebaseio.com/result.json', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ ...saveItem })
    })
    const data = await response.json()
    dispatch({
      type: SAVE_RESULT,
      payload: {...saveItem, id: data.name}
    })
  }
}

export const openResult = (date) => {
  return async dispatch => {
    const response = await fetch('https://learning-to-count-7b3dd.firebaseio.com/result.json', {
      method: 'GET',
      headers: {'Content-Type':'application/json'},
    })
    const data = await response.json()
    const result = await Object.keys(data).map(key => ({... data[key], id: key}))
    const openResult = result.filter(item => item.date == date)
    dispatch({
      type: OPEN_RESULT,
      payload: openResult
    })
  }
}

export const deleteResult = (id) => {
  return async dispatch => {
    await fetch(`https://learning-to-count-7b3dd.firebaseio.com/result/${id}.json`, {
      method: 'DELETE',
      headers: {'Content-Type':'application/json'},
    })
    dispatch({
      type: DELETE_RESULT,
      payload: id
    })
  }
}
