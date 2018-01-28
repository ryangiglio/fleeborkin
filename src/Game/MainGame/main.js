// React
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ShipComponent from './ShipComponent'
import { images, sounds } from '../../data'

const Main = (props) => {
  const { completedWidgets, unpickedWidgets, resetGame, finishGame, handleWidgetClick, timeLeft } = props
  console.log('completed', completedWidgets)
  console.log('unpicked', unpickedWidgets)

  return (
    <div id="main-game">
      <span id="timer">{timeLeft}</span>

      <div id="completed">
        { completedWidgets.map((widget, index) => (
          <ShipComponent
            key={widget.imgKey}
            completed={true}
            imgKey={widget.imgKey}
            imgSrc={widget.imgSrc}
            spriteWidth={widget.spriteWidth}
            spriteHeight={widget.spriteHeight}
            fps={widget.fps}
            direction={widget.direction || 'horizontal'}
            soundKey={widget.soundKey}
            soundSrc={widget.soundSrc} />
        ))}
      </div>

      <div id="unpicked">
        { unpickedWidgets.map((widget, index) => (
          <ShipComponent
            key={widget.imgKey}
            handleWidgetClick={handleWidgetClick}
            completed={false}
            imgKey={widget.imgKey}
            imgSrc={widget.imgSrc}
            spriteWidth={widget.spriteWidth}
            spriteHeight={widget.spriteHeight}
            fps={widget.fps}
            direction={widget.direction || 'horizontal'}
            soundKey={widget.soundKey}
            soundSrc={widget.soundSrc}
          />
        ))}
      </div>
    </div>
  )
}

Main.propTypes = {}

Main.defaultProps = {}

export default Main
