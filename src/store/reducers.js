import { combineReducers } from 'redux'

import {
  USER
} from './actions'

import { getCookie } from '@/utils/format-utils'

const defaultState = {
  level : parseInt(getCookie('user_level'))
}

function user(
  state = defaultState,
  action
) {
  switch (action.type) {
    case USER: 
      return {...state, level: action.level}
    default:
      return state
  }
}

function data(
  state = defaultState,
  action
) {
  switch (action.type) {
    case 'DATA': 
      return {...state, data: action.data}
    default:
      return state
  }
}

export default combineReducers({
  user,
  data
})