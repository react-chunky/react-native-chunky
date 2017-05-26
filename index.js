import React from 'react'
import { Core } from 'react-chunky'
import { AppRegistry, AsyncStorage, Text } from 'react-native'

import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

import * as Styles from './src/styles'
import * as Errors from './src/errors'
import Screen from './src/core/Screen'
import ListScreen from './src/core/ListScreen'
import App from './src/core/App'

global.localStorage = AsyncStorage

export function renderApp(props) {
  // Connect to Reactotron
  Reactotron.configure({ name: 'Chunky' }).use(reactotronRedux()).connect()
  Reactotron.log('Starting Chunky')
  const main = () => (<Core.AppContainer {...props}>
    <App {...props}/>
  </Core.AppContainer>)
  AppRegistry.registerComponent(props.id, () => main)
}

export { Styles, Errors, Screen, ListScreen, App }
