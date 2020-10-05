import { SAVE_RESULT, LOADING_RESULT, OPEN_RESULT, DELETE_RESULT } from './../types'

const initialState = {
  resultState: [],
  reportState: []
}

export const resultReducer = (state = initialState, action) => {
  switch (action.type) {
      case LOADING_RESULT: 
        return {
        ...state,
        reportState: action.payload
        }
      case SAVE_RESULT: 
        return {
        ...state,
        reportState: [{...action.payload}, ...state.reportState]
        }
      case OPEN_RESULT: 
        return {
          ...state,
          resultState: action.payload
        }
      case DELETE_RESULT:
        return {
          ...state,
          reportState: state.reportState.filter(item => item.id !== action.payload)
        }
    default: return state
  }  
}