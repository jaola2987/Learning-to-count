import { INITIAL_DATA, SAVE_RESOLVE, CLEANSE_RESOLVE } from './../types'

const initialState = {
  initiaDataState: [],
  resolveState: []
}

export const resolveReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_DATA: 
      return {
        ...state,
        initiaDataState: action.payload
        }
      case SAVE_RESOLVE: 
        return {
        ...state,
        resolveState: [{...action.payload}, ...state.resolveState]
        }
      case CLEANSE_RESOLVE: 
        return {
        ...state,
        resolveState: []
        }
    default: return state
  }  
}