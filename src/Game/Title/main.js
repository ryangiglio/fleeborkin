// React
import React, { Component } from 'react'
import PropTypes from 'prop-types'

const Main = (props) => {
  const { resetGame, startGame, finishGame } = props

  return (
    <div id="title">
      <h1>Team Neila Scinahcem</h1>

      <p>You and your teammate are making emergency repairs to your space ship.</p>
      <p>Mission control is transmitting instructions, but there's no radio reception down in the engine bay!</p>
      <p>One of you has to stay up top and shout the instructions down to the other making the repairs.</p>
      <p>You don't have much time before the ship explodes, for some reason! Also, you're aliens, so this will be much harder than it sounds.</p>
      <p>Good luck!</p>

      <h2>Instructions</h2>
      <p>Never perform spaceship maintenance without proper protection. Put on your helmets.</p>
      <p>Each player listens to one ear of the headphones. Only the player on the left needs the mouse.</p>
      <p><b>Right Channel - The Receiver</b></p>
      <p>The player with the right channel is receiving instructions from mission control for how to repair the ship. They will repeat the name of the part you need to find, one at a time, until you've found all 6. It's your job to tell your teammate which part they need to find.</p>
      <p><b>Left Channel - The Mechanic</b></p>
      <p>The player with the left channel is repairing the ship. Mousing over each part will tell you its name. Your goal is to find and click on the part whose name your teammate is relaying from mission control.</p>
      <p><b>Find all 6 before time runs out and you win!</b></p>
      <p><button onClick={startGame}>Start Game</button></p>
    </div>
  )
}

Main.propTypes = {}

Main.defaultProps = {}

export default Main
