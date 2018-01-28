// React
import React, { Component } from 'react'
import PropTypes from 'prop-types'

const Main = (props) => {
  const { playerWon } = props

  return (
    <div id="finished">
      { playerWon
        ? <h1>You Win!</h1>
        : <h1>BOOM! You lose.</h1>
      }

      <p><button onClick={() => document.location.reload()}>Play Again</button></p>
    </div>
  )
}

Main.propTypes = {}

Main.defaultProps = {}

export default Main

