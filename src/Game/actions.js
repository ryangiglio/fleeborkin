import * as constants from './constants'

export const resetGame = () => ({
  type: `${constants.NAME}/GAME_RESET`,
})

export const goToInstructions = () => ({
  type: `${constants.NAME}/GAME_INSTRUCTIONS`,
})

export const startGame = () => ({
  type: `${constants.NAME}/GAME_STARTED`,
})
