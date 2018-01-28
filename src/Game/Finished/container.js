// React
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autobind from 'react-autobind'

// Redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as Game from '../index'

// Components
import Main from './main.js'

class Container extends Component {
  constructor (props) {
    super(props)

    autobind(this)
  }

  componentWillMount () {
  }

  render () {
    return (
      <Main
        {...this.props}
        resetGame={this.resetGame}
        startGame={this.startGame}
        finishGame={this.finishGame}
      />
    )
  }
}

Container.propTypes = {}

Container.defaultProps = {}

function mapStateToProps (state) {
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

