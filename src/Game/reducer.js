import Immutable from 'seamless-immutable'
import * as constants from './constants'

const initialState = Immutable({
  gameState: constants.GAME_STATES.STARTED,
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
      
    case `${constants.NAME}/GAME_STARTED`:
      return {
        ...state,
        gameState: constants.GAME_STATES.STARTED,
      }
      
    case `${constants.NAME}/GAME_FINISHED`:
      return {
        ...state,
        gameState: constants.GAME_STATES.FINISHED,
        playerWon: action.playerWon,
      }

    default:
      return state
  }
}

export default reducer
