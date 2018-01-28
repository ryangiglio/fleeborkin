// React
import React, { Component } from 'react'
import PropTypes from 'prop-types'

const Main = (props) => {
  const { goToInstructions } = props.actions

  return (
    <div id="title">
      <div id="title-start" onClick={goToInstructions}></div>
    </div>
  )
}

Main.propTypes = {}

Main.defaultProps = {}

export default Main
