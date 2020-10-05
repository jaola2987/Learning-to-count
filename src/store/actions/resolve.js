import { INITIAL_DATA, SAVE_RESOLVE, CLEANSE_RESOLVE } from '../types'

export const initialData = (updatedItem) => {
  return {
    type: INITIAL_DATA,
    payload: updatedItem
  }
}

export const saveResolve = (saveItem) => {
  return {
    type: SAVE_RESOLVE,
    payload: saveItem
  }
}

export const cleanseResolve = () => {
  return {
    type: CLEANSE_RESOLVE
  }
}