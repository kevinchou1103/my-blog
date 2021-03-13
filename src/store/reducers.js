import { combinReducers } from 'redux'

import { getCookie } from '../utils/format-utils'
import {
  USER
} from './actions'

const info = getCookie('user')
function user(
  state = {power: info},
  action
) {
  switch (action.type) {
    case USER: 
      return state
  }
}


export default combinReducers({
  user
})