import { LOADING_KEPT, DELETE_KEPT_ITEM, SAVE_ITEM } from '../types'

const initialState = {
  keptState: []
}

export const keptReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_KEPT: 
      return {
        ...state,
        keptState: state.keptState
      }
    case DELETE_KEPT_ITEM: 
      return {
        ...state,
        keptState: state.keptState.filter(item => item.id !== action.payload)
      }
    case SAVE_ITEM:
      return{
        ...state,
        keptState: [{...action.payload}, ...state.keptState]
      }
    default: return state
  }
}