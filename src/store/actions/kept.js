import { LOADING_KEPT, DELETE_KEPT_ITEM, SAVE_ITEM } from '../types'

export const loadingKept = () => {
  return {
    type: LOADING_KEPT
  }
}

export const deleteKeptItem = (id) => {
  return {
    type: DELETE_KEPT_ITEM,
    payload: id
  }
}

export const saveItem = (newItem) => {
  return {
    type: SAVE_ITEM,
    payload: newItem
  }
}

