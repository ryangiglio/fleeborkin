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

import { images, sounds } from '../../data'

// Components
import Main from './main.js'

class Container extends Component {
  constructor (props) {
    super(props)

    autobind(this)
  }

  componentWillMount () {
    this.resetGame()
    this.startGame()
  }

  componentWillUpdate (newProps) {
    console.log('newProps', newProps)
  }

  componentWillUnmount () {
    clearInterval(this.state.instructionInterval)
  }

  resetGame () {
    const orderedImageKeys = Object.keys(images)
    const orderedSoundKeys = Object.keys(sounds)

    const unpickedWidgets = orderedImageKeys.map((imgKey, index) => {
      return {
        imgKey,
        imgSrc: images[imgKey].src,
        spriteWidth: images[imgKey].spriteWidth,
        spriteHeight: images[imgKey].spriteHeight,
        fps: images[imgKey].fps,
        direction: images[imgKey].direction,
        soundKey: orderedSoundKeys[index],
        soundSrc: sounds[orderedSoundKeys[index]].src,
      }
    })

    const currentTarget = _.sample(unpickedWidgets)

    const currentTargetSound = new Howl({
      src: [currentTarget.soundSrc],
      stereo: 1.0,
    })

    const failSound = new Howl({
      src: [`${process.env.PUBLIC_URL}/sounds/FX_Failure.wav`],
      volume: 0.5,
    })

    this.setState({
      unpickedWidgets,
      completedWidgets: [],
      currentTarget,
      currentTargetSound,
      failSound,
      timeLeft: 30, // SET THE TIMER HERE
    })
  }

  startGame () {
    const targetSoundInterval = setInterval(() => {
      console.log('play', this.state.currentTargetSound)
      // this.state.currentTargetSound.play()
    }, 2000)

    const timerInterval = setInterval(() => {
      this.tickTimer()
    }, 1000)
  }

  stopGame () {
    clearInterval(this.state.targetSoundInterval)
    clearInterval(this.state.timerInterval)
  }

  tickTimer () {
    if (this.state.timeLeft <= 1) {
      this.gameOver()
    } else {
      this.setState({
        timeLeft: this.state.timeLeft - 1,
      })
    }
  }

  handleWidgetClick (soundKey) {
    if (this.state.currentTarget.soundKey === soundKey) {
      this.targetHit()
    } else {
      this.state.failSound.play()
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

    this.setState({
      unpickedWidgets: newUnpicked,
      completedWidgets: newCompleted,
    })

    // THIS IS WHERE YOU SET THE WIN CONDITION
    // If you haven't won yet
    if (newCompleted.length < 6) {
      const newTarget = _.sample(newUnpicked)

      const newTargetSound = new Howl({
        src: newTarget.soundSrc,
        stereo: 1.0,
      })

      this.setState({
        currentTarget: newTarget,
        currentTargetSound: newTargetSound,
      })
    } else {
      this.props.actions.finishGame(true)
    }
  }

  gameOver () {
    this.props.actions.finishGame(false)
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
