// React
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as constants from './constants'

import Title from './Title'
import Instructions from './Instructions'
import MainGame from './MainGame'

const Main = (props) => {
  const { gameState } = props

  return (
    <div id="game">
      { gameState === constants.GAME_STATES.TITLE &&
        <Title />
      }
      { gameState === constants.GAME_STATES.INSTRUCTIONS &&
        <Instructions />
      }
      { gameState === constants.GAME_STATES.STARTED &&
        <MainGame />
      }
    </div>
  )
}

Main.propTypes = {
  gameState: PropTypes.number.isRequired,
}

Main.defaultProps = {}

export default Main
