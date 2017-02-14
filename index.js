import React from 'react'
import { AppRegistry, AsyncStorage } from 'react-native'
import { AppContainer } from 'react-chunky'

import * as Styles from './src/styles'
import Screen from './src/core/Screen'
import App from './src/core/App'

localStorage = AsyncStorage

export function renderApp(props) {
  const main = () => (<AppContainer {...props}>
    <App {...props}/>
  </AppContainer>)
  AppRegistry.registerComponent(props.id, () => main)
}

export { Styles, Screen, App }
export * from 'react-chunky'
