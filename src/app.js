import React, { Component } from 'react'
import { Provider } from 'react-redux'

import { store, persistor } from './store'

import Game from './Game'

class App extends Component {

  render () {
    return (
      <Provider store={store}>
        <Game />
      </Provider>
    )
  }
}

export default App
