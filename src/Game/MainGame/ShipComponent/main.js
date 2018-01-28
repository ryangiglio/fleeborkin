// React
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import SpriteAnimator from 'react-sprite-animator'

const Main = (props) => {
  const { imgSrc, imgKey, spriteWidth, spriteHeight, direction, fps, shouldAnimate, completed, onMouseEnter, onMouseLeave, onClick } = props

  const widgetClasses = classNames({
    'widget': true,
    'widget--bubble': !completed,
  })

  return (
    <div
      className={widgetClasses}
      id={`component-${imgKey}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}>
      <SpriteAnimator
        className="sprite"
        sprite={imgSrc}
        width={spriteWidth}
        height={spriteHeight}
        direction={direction}
        fps={fps}
        shouldAnimate={shouldAnimate || completed}
      />
    </div>
  )
}

Main.propTypes = {}

Main.defaultProps = {}

export default Main
