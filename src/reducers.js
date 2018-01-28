import { combineReducers } from 'redux'
import * as Game from './Game'

export default combineReducers({
  Game: Game.reducer,
})
