// React
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autobind from 'react-autobind'
import { Howl } from 'howler'

// Redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import _ from 'lodash'

import * as Game from '../../Game'
import * as constants from '../constants'

import { widgetSprites, widgetNames, dispatcherDialogue } from '../../data'

// Components
import Main from './main.js'

class Container extends Component {
  constructor (props) {
    super(props)

    autobind(this)
  }

  componentWillMount () {
    this.resetGame()
      .then(() => {
        this.startGame()
      })
  }

  componentWillUpdate (newProps) {
    console.log('newProps', newProps)
  }

  componentWillUnmount () {
    clearInterval(this.state.targetSoundInterval)
  }

  resetGame () {
    return new Promise((resolve, reject) => {
      const orderedImageKeys = Object.keys(widgetSprites)
      const orderedSoundKeys = _.shuffle(Object.keys(widgetNames))

      const unpickedWidgets = orderedImageKeys.map((imgKey, index) => {
        return {
          imgKey,
          imgSrc: widgetSprites[imgKey].src,
          spriteWidth: widgetSprites[imgKey].spriteWidth,
          spriteHeight: widgetSprites[imgKey].spriteHeight,
          fps: widgetSprites[imgKey].fps,
          direction: widgetSprites[imgKey].direction,
          soundKey: orderedSoundKeys[index],
          soundSrc: widgetNames[orderedSoundKeys[index]].src,
        }
      })

      const currentTarget = _.sample(unpickedWidgets)

      const currentTargetSound = new Howl({
        src: [currentTarget.soundSrc],
        stereo: constants.DISPATCHER_CHANNEL,
      })

      const failSound = new Howl({
        src: [`${process.env.PUBLIC_URL}/sounds/FX_Failure.wav`],
        volume: 0.3,
        stereo: constants.MECHANIC_CHANNEL,
      })

      const successSound = new Howl({
        src: [`${process.env.PUBLIC_URL}/sounds/FX_Success.wav`],
        volume: 0.3,
        stereo: constants.MECHANIC_CHANNEL,
      })

      const dispatcherSounds = {
        intro: new Howl({
          src: [dispatcherDialogue.intro],
          stereo: constants.DISPATCHER_CHANNEL,
          onplay: () => {
            this.state.currentTargetSound.stop()
            this.setState({
              currentTargetLoopPaused: true,
            })
          },
          onend: () => {
            this.state.currentTargetSound.play()
            this.setState({
              currentTargetLoopPaused: false,
            })
          },
        }),
        wrongPart: new Howl({
          src: [dispatcherDialogue.wrongPart],
          stereo: constants.DISPATCHER_CHANNEL,
          onplay: () => {
            this.state.currentTargetSound.stop()
            this.setState({
              currentTargetLoopPaused: true,
            })
          },
          onend: () => {
            this.state.currentTargetSound.play()
            this.setState({
              currentTargetLoopPaused: false,
            })
          },
        }),
        win: new Howl({
          src: [dispatcherDialogue.win],
        }),
        loss: new Howl({
          src: [dispatcherDialogue.loss],
        }),
        countdown: dispatcherDialogue.countdown.map(src => {
          return new Howl({
            src: [src],
            stereo: constants.DISPATCHER_CHANNEL,
            onplay: () => {
              this.state.currentTargetSound.stop()
              this.setState({
                currentTargetLoopPaused: true,
              })
            },
            onend: () => {
              this.state.currentTargetSound.play()
              this.setState({
                currentTargetLoopPaused: false,
              })
            },
          })
        }),
      }

      this.setState({
        unpickedWidgets,
        completedWidgets: [],
        currentTarget,
        currentTargetSound,
        currentTargetLoopPaused: false,
        failSound,
        successSound,
        dispatcherSounds,
        timeLeft: 180, // SET THE TIMER HERE
        gameOver: false,
        playerWon: false,
      }, () => {
        resolve()
      })
    })
  }

  startGame () {
    const targetSoundInterval = setInterval(() => {
      if (!this.state.currentTargetLoopPaused) {
        this.state.currentTargetSound.play()
      }
    }, 3000)

    const timerInterval = setInterval(() => {
      this.tickTimer()
    }, 1000)

    this.setState({
      targetSoundInterval,
      timerInterval,
    })

    this.state.dispatcherSounds.intro.play()
  }

  stopGame () {
    clearInterval(this.state.targetSoundInterval)
    clearInterval(this.state.timerInterval)
  }

  tickTimer () {
    if (this.state.timeLeft <= 1) {
      this.gameOverLoss()
    } else {
      this.setState({
        timeLeft: this.state.timeLeft - 1,
      })
    }
  }

  handleWidgetClick (soundKey) {
    if (!this.state.gameOver) {
      if (this.state.currentTarget.soundKey === soundKey) {
        this.targetHit()
      } else {
        this.state.currentTargetSound.stop()
        this.state.failSound.play()
        this.state.dispatcherSounds.wrongPart.stop()
        this.state.dispatcherSounds.wrongPart.play()
        const timeLeft = _.clamp(this.state.timeLeft - 10, 0, 1000)

        if (timeLeft <= 0) {
          this.gameOverLoss()
        }

        this.setState({
          timeLeft,
        })
      }
    }
  }

  targetHit () {
    const targetIndex = _.findIndex(this.state.unpickedWidgets, (widget) => widget.soundKey === this.state.currentTarget.soundKey)

    const newUnpicked = [
      ...this.state.unpickedWidgets.slice(0, targetIndex),
      ...this.state.unpickedWidgets.slice(targetIndex + 1),
    ]

    const newCompleted = [
      ...this.state.completedWidgets,
      this.state.unpickedWidgets[targetIndex],
    ]

    this.state.successSound.play()
    this.state.currentTargetSound.stop()

    this.setState({
      unpickedWidgets: newUnpicked,
      completedWidgets: newCompleted,
    })

    // THIS IS WHERE YOU SET THE WIN CONDITION
    // If you haven't won yet
    if (newCompleted.length < 6) {
      this.state.dispatcherSounds.countdown[this.state.completedWidgets.length].play()

      const newTarget = _.sample(newUnpicked)

      const newTargetSound = new Howl({
        src: newTarget.soundSrc,
        stereo: constants.DISPATCHER_CHANNEL,
      })

      this.setState({
        currentTarget: newTarget,
        currentTargetSound: newTargetSound,
      })
    } else {
      this.gameOverWin()
    }
  }

  gameOverLoss () {
    this.state.dispatcherSounds.loss.play()

    this.stopGame()

    this.setState({
      gameOver: true,
      playerWon: false,
    })
  }

  gameOverWin () {
    this.state.dispatcherSounds.win.play()

    this.stopGame()

    this.setState({
      gameOver: true,
      playerWon: true,
    })
  }

  render () {
    return (
      <Main
        {...this.props}
        {...this.state}
        handleWidgetClick={this.handleWidgetClick}
        resetGame={this.resetGame}
        finishGame={this.finishGame}
      />
    )
  }
}

Container.propTypes = {}

Container.defaultProps = {}

function mapStateToProps (state, props) {
  return {
    ...state.Game,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(Game.actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
