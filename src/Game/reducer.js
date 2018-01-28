import Immutable from 'seamless-immutable'
import * as constants from './constants'

const initialState = Immutable({
  gameState: constants.GAME_STATES.TITLE,
  playerWon: false,
})

function reducer (state = initialState, action) {
  state = Immutable(state)

  switch (action.type) {
    case `${constants.NAME}/GAME_RESET`:
      return {
        ...state,
        gameState: constants.GAME_STATES.TITLE,
      }
      
    case `${constants.NAME}/GAME_INSTRUCTIONS`:
      return {
        ...state,
        gameState: constants.GAME_STATES.INSTRUCTIONS,
      }
      
    case `${constants.NAME}/GAME_STARTED`:
      return {
        ...state,
        gameState: constants.GAME_STATES.STARTED,
      }

    default:
      return state
  }
}

export default reducer
