import * as constants from './constants'

export const resetGame = () => ({
  type: `${constants.NAME}/GAME_RESET`,
})

export const startGame = () => ({
  type: `${constants.NAME}/GAME_STARTED`,
})

export const finishGame = (playerWon) => ({
  type: `${constants.NAME}/GAME_FINISHED`,
  playerWon,
})
