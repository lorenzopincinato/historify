/* eslint-disable react/jsx-filename-extension */
import { Grommet, grommet } from 'grommet'
import React from 'react'
import ReactDOM from 'react-dom'

import { Routes } from './components'
import * as serviceWorker from './serviceWorker'

const App = () => (
  <Grommet theme={grommet} full>
    <Routes />
  </Grommet>
)

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()
