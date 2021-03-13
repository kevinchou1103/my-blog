import { createStore} from 'redux'

import reducer from './reducers'

let initState = {
  power:0
}

const store = createStore(reducer, initState)