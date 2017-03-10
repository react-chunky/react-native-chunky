import React from 'react'
import { Core } from 'react-chunky'
import { AppRegistry, AsyncStorage, Text } from 'react-native'

import * as Styles from './src/styles'
import * as Errors from './src/errors'
import Screen from './src/core/Screen'
import App from './src/core/App'

global.localStorage = AsyncStorage

export function renderApp(props) {
  const main = () => (<Core.AppContainer {...props}>
    <App {...props}/>
  </Core.AppContainer>)
  AppRegistry.registerComponent(props.id, () => main)
}

export { Styles, Errors, Screen, App }
