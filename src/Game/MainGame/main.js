// React
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SpriteAnimator from 'react-sprite-animator'

import ShipComponent from './ShipComponent'

import { dancingAlien } from '../../data'

const Main = (props) => {
  const { completedWidgets, unpickedWidgets, resetGame, gameOver, playerWon, handleWidgetClick, timeLeft } = props
  console.log('completed', completedWidgets)
  console.log('unpicked', unpickedWidgets)

  return (
    <div id="main-game">
      { !gameOver &&
      <span id="timer">{`${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}`}</span>
      }

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

      { gameOver &&
        <div id="game-over">
          { playerWon
            ?
              <div className="content">
                <h1>You Won!</h1>
                <p>You repaired the ship in time and lived happily ever after.</p>
                <SpriteAnimator
                  className="dancing-alien"
                  sprite={dancingAlien.src}
                  width={dancingAlien.spriteWidth}
                  height={dancingAlien.spriteHeight}
                  fps={dancingAlien.fps}
                />
              </div>
            :
              <div className="content">
                <h1>GAME OVER</h1>
                <p>You didn't repair the engine fast enough and your ship exploded.</p>
              </div>
          }
          <p><button className="game-button" onClick={() => document.location.reload()}>Play Again?</button></p>

          <h3>Team Neila Scinahcem is:</h3>
          <p>Blake Balick-Schreiber<br />
          Kira Boettcher<br />
          Ryan Giglio<br />
          Corey Jeffers<br />
          Steven Xia</p>
        </div>
      }
    </div>
  )
}

Main.propTypes = {}

Main.defaultProps = {}

export default Main
