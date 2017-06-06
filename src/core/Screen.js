import React from 'react'
import { Core } from 'react-chunky'
import * as DefaultStyles from '../styles'

export default class Screen extends Core.Screen {

  get styles() {
    return {
      containers: DefaultStyles.containers(this.props.theme)
    }
  }

  replace(transition, data) {
    this.props.navigation.navigate(transition, Object.assign({ replace: true}, data))
  }

  push(transition, data) {
    this.props.navigation.navigate(transition, data)
  }
}
