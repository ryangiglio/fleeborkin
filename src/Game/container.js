// React
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autobind from 'react-autobind'
import { Howl } from 'howler'

// Redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Components
import Main from './main.js'

class Container extends Component {
  constructor (props) {
    super(props)

    autobind(this)
  }

  componentWillMount () {
    this.adjustScalingRatio()

    window.addEventListener('resize', () => {
      this.adjustScalingRatio()
    })

    const ambiance = new Howl({
      src: [`${process.env.PUBLIC_URL}/sounds/Ambiance.wav`],
      autoplay: true,
      loop: true,
    })
  }

  adjustScalingRatio () {
    const ratio = window.innerWidth / 1920

    document.body.style.setProperty(`--ratio`, ratio)
  }

  render () {
    return (
      <Main {...this.props} />
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
    dispatch: dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
