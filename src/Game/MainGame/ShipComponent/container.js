// React
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autobind from 'react-autobind'

// Redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Howl } from 'howler'

import * as Game from '../../../Game'
import * as constants from '../../constants'

// Components
import Main from './main.js'

class Container extends Component {
  constructor (props) {
    super(props)

    autobind(this)

    console.log(props.soundSrc)
    const sound = new Howl({
      src: [props.soundSrc],
      stereo: constants.MECHANIC_CHANNEL,
      volume: 2.0,
      preload: true,
    })

    this.state = {
      sound,
      shouldAnimate: false,
    }
  }

  componentWillMount () {
  }

  onMouseEnter () {
    this.state.sound.play()
    this.setState({
      shouldAnimate: true,
    })
  }

  onMouseLeave () {
    this.state.sound.stop()
    this.setState({
      shouldAnimate: false,
    })
  }

  onClick () {
    this.props.handleWidgetClick(this.props.soundKey)
  }

  render () {
    return (
      <Main
        {...this.props}
        {...this.state}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={this.onClick}
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
