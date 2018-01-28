// React
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as constants from './constants'

import Title from './Title'
import MainGame from './MainGame'
import Finished from './Finished'

const Main = (props) => {
  const { gameState } = props

  return (
    <div id="game">
      { gameState === constants.GAME_STATES.TITLE &&
        <Title />
      }
      { gameState === constants.GAME_STATES.STARTED &&
        <MainGame />
      }
      { gameState === constants.GAME_STATES.FINISHED &&
        <Finished />
      }
    </div>
  )
}

Main.propTypes = {
  gameState: PropTypes.number.isRequired,
}

Main.defaultProps = {}

export default Main
