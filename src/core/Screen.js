import React from 'react'
import { View, Button } from 'react-native'
import { Core } from 'react-chunky'
import * as DefaultStyles from '../styles'
// import { NavigationActions } from 'react-navigation'

export default class Screen extends Core.Screen {

  get styles() {
    return {
      containers: DefaultStyles.containers(this.props.theme)
    }
  }

  get auth() {
    return this.props.navigation.state.params.auth
  }

  get data() {
    return this.props.navigation.state.params
  }

  replace(transition, data) {
    this.props.navigation.navigate(transition, Object.assign({ replace: true}, data))
  }

  push(transition, data) {
    this.props.navigation.navigate(transition, data)
  }
}
